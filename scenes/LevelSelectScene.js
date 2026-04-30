import BaseScene from './BaseScene.js';
import MapRegion from '../components/MapRegion.js';

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

            container.add(layer);
        });

        return container;
    }

    create() {
        super.create();

        const { width, height } = this.cameras.main;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.selectedRegion = null;
        this.regionUI = null;

        this.setTitle("SELECCIÓN DE NIVEL");

        this.createBackButton('MainMenuScene');

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
            '¡Elegí una Región de\nla Argentina!'
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

        this.createMapSelector(
            centerX - 250,
            centerY + 50
        );
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
    }

    showRegionUI(region) {
        // Si ya existe, destruir
        if (this.regionUI) {
            this.regionUI.destroy();
        }

        const { centerX, centerY, height } = this.cameras.main;

        const container = this.add.container(centerX + 250, centerY + 50)
            .setDepth(100);

        // Fondo
        const bg = this.add.image(0, 0, 'mapa2')
            .setDisplaySize(700, 500)
            .setOrigin(0.5);

        // Texto
        const title = this.add.text(0, -30, region.name, {
            fontFamily: 'LuckiestGuy',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        const desc = this.add.text(0, 0, `Descripción de ${region.name}`, {
            fontFamily: 'Fredoka',
            fontSize: '18px',
            color: '#dddddd'
        }).setOrigin(0.5);

        const playBtn = this.createButton(100, 0, 'Jugar', () => { this.startLevel(region); }, '#00ff00');
        const cancelBtn = this.createButton(-100, 0, 'Cancelar', () => { this.clearSelection(); }, '#ff0000');

        container.add([bg, title, desc, playBtn, cancelBtn]);

        const padding = 75;
        const topY = -bg.displayHeight / 2 + padding;;
        const bottomY = bg.displayHeight / 2 - padding;

        title.setY(topY);
        playBtn.setY(bottomY);
        cancelBtn.setY(bottomY);

        this.regionUI = container;
    }

    startLevel(region) {
        this.goToScene('GameScene');
    }
}