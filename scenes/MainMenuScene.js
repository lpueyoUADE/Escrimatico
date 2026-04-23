import { goToScene } from '../utils/sceneTransitions.js';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
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
            goToScene(this, 'HighScoreScene');
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
        this.yae = this.add.image(width - 50, height - 25, 'yae1')
            .setOrigin(1, 1)
            .setScale(0.3)
            .setDepth(10)
            .setInteractive();

        this.yaeGlow = this.yae.postFX.addGlow(0xffffff, 2, 0);
        this.yaeGlow.outerStrength = 0;
        
        // Dialogo
        const bubbleContainer = this.add.container(0, 0).setDepth(20).setAlpha(0);

        const bubble = this.add.image(this.yae.x, this.yae.y, 'dialogoIzq')
            // .setAlpha(0)
            .setOrigin(1, 1)
            .setScale(0.25)
            .setDepth(10);

        const yaeBounds = this.yae.getBounds();
        const bubbleBounds = bubble.getBounds();

        bubble.setPosition(
            yaeBounds.right - 150,
            yaeBounds.top
        );

        const bubbleText = this.add.text(0, 0,
            '¡Hola! Soy Yae la Yaguareté\ny juntos vamos a conocer la Argentina una letra a la vez.',
            {
                fontSize: '20px',
                color: '#000000',
                wordWrap: { width: 220 }
            })
            .setOrigin(0.5)
            // .setAlpha(0)
            .setDepth(11);
        
        bubbleText.setPosition(
            bubbleBounds.left + 20,
            bubbleBounds.top - 280
        )

        bubbleContainer.add([bubble, bubbleText]);

        let bubbleTween = null;

        this.yae.on('pointerover', () => {
            if (bubbleTween) bubbleTween.stop();

            bubbleTween = this.tweens.add({
                targets: bubbleContainer,
                alpha: 1,
                duration: 300
            });

            this.tweens.add({
                targets: this.yaeGlow,
                outerStrength: 4,
                duration: 200,
                ease: 'Sine.easeOut'
            });
        });

        this.yae.on('pointerout', () => {
            if (bubbleTween) bubbleTween.stop();

            bubbleTween = this.tweens.add({
                targets: bubbleContainer,
                alpha: 0,
                duration: 300
            });

            this.tweens.add({
                targets: this.yaeGlow,
                outerStrength: 0,
                duration: 200,
                ease: 'Sine.easeIn'
            });
        });

        this.tweens.add({
            targets: bubbleContainer,
            y: bubbleContainer.y - 5,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.title = this.add.image(width / 2, 150, 'title')
            .setOrigin(0.5)
            .setScale(0.4)
            .setDepth(10);

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