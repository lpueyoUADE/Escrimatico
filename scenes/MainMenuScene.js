import BaseScene from './BaseScene.js';

export default class MainMenuScene extends BaseScene {
    constructor() {
        super('MainMenuScene');
    }

    createButtons() {
        const spacing = 70;

        const centerX = this.cameras.main.centerX;
        const startY = this.cameras.main.centerY;

        this.createButton(centerX, startY, 'Jugar', () => {
            this.goToScene('LevelSelectScene');
        }).setDepth(20);

        this.createButton(centerX, startY + spacing, 'High Scores', () => {
             this.goToScene('HighScoreScene');
        }).setDepth(20);

        this.createButton(centerX, startY + spacing * 2, 'Créditos', () => {
             this.goToScene('CreditsScene');
        }).setDepth(20);
    }

    create() {
        super.create();

        // Fade in
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Fondo
        const { width, height } = this.cameras.main;
        this.background = this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setDisplaySize(width, height)
            .setDepth(-10);

        // Yae
        this.addYae(
            'yae1',
            width - 50,
            height - 25,
            0.3,
            [1,1],
            '¡Hola! Soy Yae la Yaguareté\n' +
            'y juntos vamos a conocer la Argentina una letra a la vez.'
        );

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

        this.addTeamFooter();
    }
}