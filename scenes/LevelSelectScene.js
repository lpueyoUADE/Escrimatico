import BaseScene from './BaseScene.js';
import MapRegion from '../components/MapRegion.js';
import TextButton from '../components/TextButton.js';
import SaveManager from '../managers/SaveManager.js';
import GameDatabase from '../data/GameDatabase.js';

export default class LevelSelectScene extends BaseScene {
    constructor() {
        super('LevelSelectScene');
    }

    createMapSelector(x, y) {
        const container = this.add.container(x, y);

        // Fondo base (mapa completo)
        const base = this.add.image(0, 0, 'argentina')
            .setOrigin(0.5);

        container.add(base);

        container.setScale(0.65);

        container.setDepth(11);

        container.setInteractive(
            new Phaser.Geom.Rectangle(
                -base.width / 2,
                -base.height / 2,
                base.width,
                base.height
            ),
            Phaser.Geom.Rectangle.Contains
        );

        container.originalX = x;

        const regions = [
            { key: 'noroeste', name: 'Noroeste' },
            { key: 'cuyo', name: 'Cuyo' },
            { key: 'pampa', name: 'Pampa' },
            { key: 'litoral', name: 'Litoral' },
            { key: 'patagonia', name: 'Patagonia' },
            { key: 'malvinas', name: 'Islas Malvinas' }
        ];

        regions.forEach(region => {
            const layer = new MapRegion(
                this,
                0,
                0,
                region.key,
                region.name,
                (name) => this.onRegionSelected(name)
            );
            layer.regionKey = region.key;
            this.regions.push(layer);
            container.add(layer);
        });

        this.regions.forEach(r => {
            const unlocked =
                SaveManager.isRegionUnlocked(r.regionKey);

            r.setUnlocked(unlocked);
        });

        return container;
    }

    createDebugPanel() {
        const panel = this.add.container(30, 200).setDepth(200);

        this.regions.forEach((region, index) => {
            const btn = this.add.text(0, index * 35, region.name, {
                fontSize: '16px',
                backgroundColor: '#000',
                padding: { x: 15, y: 10 }
            })
                .setInteractive()
                .on('pointerdown', () => {
                    const newValue = !region.unlocked;

                    region.setUnlocked(newValue);

                    SaveManager.saveData
                        .regions[region.name]
                        .unlocked = newValue;

                    SaveManager.save();

                    btn.setText(
                        `${region.name} ${region.unlocked ? '✅' : '❌'}`
                    );
                });
            btn.setText(`${region.name} ${region.unlocked ? '✅' : '❌'}`);
            panel.add(btn);
        });
    }

    create() {
        super.create();

        const { width, height } = this.cameras.main;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.selectedRegion = null;
        this.regionUI = null;
        this.regions = [];

        this.setTitle("SELECCIÓN DE NIVEL");

        this.createBackButton('MainMenuScene');

        // Musica
    this.playMusicWithFadeIn('bgMusic3');

        // Fade in
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Fondo
        this.background = this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setDisplaySize(width, height)
            .setDepth(-10);

        // Yae
        this.addYae(
            'yaePointing',
            width - 50,
            height - 25,
            0.25,
            [1, 1],
            '¡Elegí una Región disponible de\nla Argentina\ny a jugar!\n\nSumá ' +
            SaveManager.scoreToNextLevel + ' puntos o más para desbloquear el siguiente nivel.'
        );

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Escape') {
                if (this.selectedRegion) {
                    this.clearSelection();
                } else {
                    this.goToScene('MainMenuScene');
                }
            }
        });

        this.mapContainer = this.createMapSelector(
            centerX,// - 300,
            centerY + 50
        );

        // this.createDebugPanel();
    }

    onRegionSelected(name) {
        console.log("Seleccionaste:", name);
    }

    selectRegion(region) {
        if (this.selectedRegion) {
            this.selectedRegion.setSelected(false);
        }

        this.selectedRegion = region;
        region.setSelected(true);

        region.parentContainer.bringToTop(region);

        this.showRegionUI(region);

        this.tweens.add({
            targets: this.mapContainer,
            x: this.mapContainer.originalX - 320,
            duration: 700,
            ease: 'Sine.easeInOut'
        });
    }


    clearSelection() {
        if (this.selectedRegion) {
            this.selectedRegion.setSelected(false);
            this.selectedRegion = null;
        }

        if (this.regionUI) {
            this.regionUI.destroy();
            this.regionUI = null;
        }

        this.tweens.add({
            targets: this.mapContainer,
            x: this.mapContainer.originalX,
            duration: 700,
            ease: 'Sine.easeInOut'
        });
    }

    showRegionUI(region) {

        if (this.regionUI) {
            this.regionUI.destroy();
        }

        const { centerX, centerY } = this.cameras.main;

        const container = this.add.container(centerX + 260, centerY + 50)
            .setDepth(100);

        // =========================
        // ESTADO
        // =========================

        let selectedCategory = null;
        const categories = [];

        // =========================
        // FONDO
        // =========================

        const bg = this.add.image(0, 0, 'mapa2')
            .setDisplaySize(800, 600)
            .setOrigin(0.5);

        // =========================
        // TITULO
        // =========================

        const title = this.add.text(0, 0, region.name, {
            fontFamily: 'LuckiestGuy',
            fontSize: '36px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        // =========================
        // LOCK TEXT
        // =========================

        const lockText = this.add.text(
            0,
            -150,
            '',
            {
                fontFamily: 'Fredoka',
                fontSize: '20px',
                color: '#ffcc66',
                stroke: '#000000',
                wordWrap: { width: 500 },
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5);

        // =========================
        // CATEGORY FACTORY
        // =========================

        const createCategory = (
            x,
            y,
            imageKey,
            label,
            levelKey
        ) => {

            const unlocked =
                SaveManager.isLevelUnlocked(
                    region.regionKey,
                    levelKey
                );

            const category = this.add.container(x, y);

            category.selected = false;
            category.unlocked = unlocked;

            const imageSize = 180;
            // Imagen
            const border = this.add.rectangle(
                0,
                0,
                imageSize + 5,
                imageSize + 5,
                0x000000
            );

            const image = this.add.image(0, 0, imageKey)
                .setDisplaySize(imageSize, imageSize)
                .setOrigin(0.5)
                .setInteractive();

            // Locked visuals
            if (!unlocked) {
                image.setTint(0x666666);
                image.setAlpha(0.7);
            }

            // Glow
            const glow = border.postFX.addGlow(
                0xffffaa,
                0,
                0
            );

            // Texto
            const text = this.add.text(0, 120, label, {
                fontFamily: 'LuckiestGuy',
                fontSize: '24px',
                color: unlocked ? '#ffffff' : '#999999',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            category.add([border, image, text]);

            // =========================
            // HOVER
            // =========================

            image.on('pointerover', () => {

                // LOCKED
                if (!unlocked) {
                    this.tweens.killTweensOf(category);

                    return;
                }

                // NORMAL
                if (!category.selected) {
                    glow.outerStrength = 4;
                }

                this.tweens.killTweensOf(category);

                this.tweens.add({
                    targets: category,
                    scale: 1.08,
                    duration: 120,
                    ease: 'Sine.easeOut'
                });
            });

            image.on('pointerout', () => {
                this.tweens.killTweensOf(category);

                if (!category.selected) {
                    this.tweens.add({
                        targets: glow,
                        outerStrength: 0,
                        duration: 120,
                        ease: 'Sine.easeOut'
                    });

                    this.tweens.add({
                        targets: category,
                        scale: 1,
                        duration: 120,
                        ease: 'Sine.easeOut'
                    });
                }
            });

            // =========================
            // CLICK
            // =========================

            image.on('pointerdown', () => {
                // BLOQUEADO
                if (!unlocked) {
                    return;
                }

                // Deseleccionar todas
                categories.forEach(c => {

                    c.selected = false;

                    c.glow.outerStrength = 0;

                    this.tweens.killTweensOf(c);

                    this.tweens.add({
                        targets: c,
                        scale: 1,
                        duration: 120,
                        ease: 'Sine.easeOut'
                    });
                });

                lockText.setText(
                    GameDatabase
                        .regions[region.regionKey]
                        .levels[levelKey].description
                );

                // Seleccionar actual
                category.selected = true;

                playBtn.setEnabled(true);

                glow.outerStrength = 6;

                this.tweens.killTweensOf(category);

                this.tweens.add({
                    targets: category,
                    scale: 1.08,
                    duration: 120,
                    ease: 'Sine.easeOut'
                });

                selectedCategory = levelKey;
            });

            category.glow = glow;

            categories.push(category);

            return category;
        };

        // =========================
        // COLUMNAS
        // =========================

        const flora = createCategory(
            -220,
            20,
            GameDatabase.regions[region.regionKey].levels.flora.coverImage,
            'flora',
            'flora'
        );

        const fauna = createCategory(
            0,
            20,
            GameDatabase.regions[region.regionKey].levels.fauna.coverImage,
            'fauna',
            'fauna'
        );

        const folclore = createCategory(
            220,
            20,
            GameDatabase.regions[region.regionKey].levels.folclore.coverImage,
            'folclore',
            'folclore'
        );

        // =========================
        // BOTONES
        // =========================

        const playBtn = new TextButton(
            this,
            100,
            0,
            'Jugar',
            () => {

                if (!selectedCategory) {
                    console.log("Seleccioná una categoría");
                    return;
                }

                this.startLevel(region, selectedCategory);

            },
            '#00ff00'
        );

        playBtn.setEnabled(false);

        const cancelBtn = new TextButton(
            this,
            -100,
            0,
            'Cancelar',
            () => { this.clearSelection(); },
            '#ff0000'
        );

        // =========================
        // ADD
        // =========================

        container.add([
            bg,
            title,
            lockText,
            flora,
            fauna,
            folclore,
            playBtn,
            cancelBtn
        ]);

        // =========================
        // LAYOUT
        // =========================

        const padding = 70;

        const topY = -bg.displayHeight / 2 + padding;
        const buttonY = bg.displayHeight / 2 - padding;

        title.setY(topY);

        playBtn.setY(buttonY);
        cancelBtn.setY(buttonY);

        this.regionUI = container;
    }

    startLevel(region, levelKey) {
        this.goToScene(
            "GameScene",
            {
                region: region.regionKey,
                level: levelKey
            }
        );
    }
}