import { goToScene } from '../utils/sceneTransitions.js';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    addImageWithShadow(image, x, y, scale, depth, shadowXOffset, shadowYOffset, alpha) {
        this.add.image(x, y, image)
            .setOrigin(1, 1)
            .setScale(scale)
            .setDepth(depth);

        this.add.image(x + shadowXOffset, y + shadowYOffset, image)
            .setOrigin(1, 1)
            .setScale(scale + 0.01)
            .setDepth(depth - 1)
            .setTint(0x000000)
            .setAlpha(alpha);
    }

    createButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            // fontFamily: 'Fredoka',
            fontSize: '36px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        })
            .setOrigin(0.5)
            .setInteractive();

        // Hover
        button.on('pointerover', () => {
            button.setScale(1.1);
            button.setColor('#ffff00');
        });

        button.on('pointerout', () => {
            button.setScale(1);
            button.setColor('#ffffff');
        });

        // Click
        button.on('pointerdown', () => {
            this.tweens.add({
                targets: button,
                scale: 0.95,
                duration: 100,
                yoyo: true
            });

            callback();
        });

        return button;
    }

    createButtons() {
        const centerX = this.cameras.main.centerX;
        const startY = this.cameras.main.centerY;

        const spacing = 70;

        this.createButton(centerX, startY, 'Jugar', () => {
            this.scene.start('LevelSelectScene');
        })
            .setDepth(20);

        this.createButton(centerX, startY + spacing, 'High Scores', () => {
            this.scene.start('HighScoreScene');
        })
            .setDepth(20);

        this.createButton(centerX, startY + spacing * 2, 'Créditos', () => {
            goToScene(this, 'CreditsScene');
        })
            .setDepth(20);
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Fondo
        const { width, height } = this.cameras.main;
        this.background = this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setDisplaySize(width, height)
            .setDepth(-10);

        // Yae
        this.addImageWithShadow('yae1', width - 25, height - 10, 0.3, 10, 10, 13, 0.7);

        this.title = this.add.image(width / 2, 150, 'title')
            .setOrigin(0.5)
            .setScale(0.4)
            .setDepth(10);

        // Opciones
        this.options = ['JUGAR', 'HIGH SCORES'];
        this.selectedIndex = 0;
        this.menuTexts = [];

        this.startY = centerY;

        // Botones
        this.createButtons();

        // Particulas
        /*this.waterfall = this.add.particles(0, 0, 'water', {
            x: { min: width * 0.45, max: width * 0.55 }, // zona central
            y: height / 2,

            lifespan: 500,

            speedY: { min: 200, max: 400 },
            speedX: { min: -20, max: 20 },

            scale: { start: 0.4, end: 0.1 },

            alpha: { start: 0.6, end: 0 },

            gravityY: 300,

            frequency: 20, // flujo constante

            blendMode: 'ADD'
        });*/

        const areaWidth = 300;
        const areaHeight = 150;

        this.fireflies = this.add.particles(0, 0, 'firefly', {
            x: { min: this.title.x - areaWidth / 2, max: this.title.x + areaWidth / 2 },
            y: { min: this.title.y - areaHeight / 2, max: this.title.y + areaHeight / 2 },

            lifespan: { min: 2000, max: 4000 },

            speedX: { min: -20, max: 20 },
            speedY: { min: -10, max: 10 },

            scale: { start: 0.2, end: 0.1 },

            alpha: { start: 0, end: 0.9 }, // fade in

            frequency: 100, // pocas, espaciadas

            blendMode: 'ADD'
        });

        this.fireflies.setDepth(20);

        this.team = this.add.text(10, height - 10, 'Cooperativa de trabajo EduJuegos Ltda\n' +
            'v0.1.0 © 2026', {
            // fontFamily: 'Fredoka',
            fontSize: '16px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        })
            .setOrigin(0, 1)
            .setDepth(20);
    }
}