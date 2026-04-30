import BaseScene from './BaseScene.js';

export default class HighScoreScene extends BaseScene {
  constructor() {
    super('HighScoreScene');
  }

  create() {
    super.create();

    this.addTeamFooter();

    this.setTitle('HIGH SCORES');

    this.cameras.main.fadeIn(500, 0, 0, 0);
    const { width, height } = this.cameras.main;

    // Fondo
    this.background = this.add.image(0, 0, 'backgroundSunset')
      .setOrigin(0)
      .setDisplaySize(width, height)
      .setDepth(-10);

    this.input.keyboard.on('keydown-ESC', () => {
      this.goToScene('MainMenuScene');
    });

    this.createBackButton('MainMenuScene');

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

      tint: 0xff8888,

      frequency: 25,

      blendMode: 'ADD'
    })
      .setDepth(5);
  }
}