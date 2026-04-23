import { goToScene } from '../utils/sceneTransitions.js';

export default class HighScoreScene extends Phaser.Scene {
  constructor() {
    super('HighScoreScene');
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY;

    // Fondo
    const { width, height } = this.cameras.main;
    this.background = this.add.image(0, 0, 'backgroundSunset')
      .setOrigin(0)
      .setDisplaySize(width, height)
      .setDepth(-10);

    this.add.text(280, 200, 'HIGH SCORES', { fontSize: '32px' });
    this.add.text(250, 260, 'ESC: Volver');

    this.input.keyboard.on('keydown-ESC', () => {
      goToScene(this, 'MainMenuScene');
    });

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