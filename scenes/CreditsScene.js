import BaseScene from './BaseScene.js';

export default class CreditsScene extends BaseScene {
    constructor() {
        super('CreditsScene');
    }

    create() {
        super.create();
        this.cameras.main.fadeIn(500, 0, 0, 0);

        const centerX = this.cameras.main.centerX;
        const startY = this.cameras.main.centerY;
        const { width, height } = this.cameras.main;

        // Musica
        this.playMusicWithFadeIn('bgMusic1');

        // Fondo
        this.background = this.add.image(0, 0, 'backgroundNight')
            .setOrigin(0)
            .setDisplaySize(width, height)
            .setDepth(-10);

        this.setTitle("CRÉDITOS");

        this.add.text(centerX, 200, 'EduJuegos Es una cooperativa de trabajo\nconformada por:', {
            fontFamily: 'LuckiestGuy',
            fontSize: '32px',
            stroke: '#000000',
            strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(centerX, 500,
            'Barbieri, Fabrizio\n' +
            'Neer, Uriel Agustin\n' +
            'Perez Viña, Nicolás\n' +
            'Pueyo, Luciano\n',
            {
                fontFamily: 'LuckiestGuy',
                fontSize: '28px',
                stroke: '#000000',
                strokeThickness: 10,
                align: 'center'
            }).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown-ESC', () => {
            this.goToScene('MainMenuScene');
        });

        this.createBackButton('MainMenuScene');

        // Yae
        this.addYae(
            'yaeLogo',
            centerX,
            height - 50,
            0.18,
            [0.5, 1],
            '¡Y no se olviden de mi!\nJaja'
        );

        // Particulas
        this.fireflies = this.add.particles(0, 0, 'firefly', {
            x: { min: 0, max: width },
            y: { min: 0, max: height },

            lifespan: { min: 4000, max: 6000 },

            speedX: { min: -10, max: 10 },
            speedY: { min: -5, max: 5 },

            scale: { start: 0.3, end: 0.05 },

            alpha: {
                start: 0,
                end: 0.7,
                ease: 'Sine.easeInOut'
            },

            tint: 0x88ff88,

            frequency: 50,

            blendMode: 'ADD'
        })
            .setDepth(5);

        this.addTeamFooter();
    }
}