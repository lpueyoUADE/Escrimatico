import BaseScene from './BaseScene.js';
import SaveManager from '../managers/SaveManager.js';

export default class HighScoreScene extends BaseScene {
  constructor() {
    super('HighScoreScene');
  }

  create() {
    super.create();

    this.addTeamFooter();

    this.setTitle('HIGH SCORES');
    
    // Musica
    this.playMusicWithFadeIn('bgMusic1');

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

    const startX = this.cameras.main.width / 2 - 50;
    let currentY = 135;

    Object.entries(
      SaveManager.saveData.regions
    ).forEach(([regionKey, regionData]) => {

      this.add.text(
        startX,
        currentY,
        regionKey.toUpperCase(),
        {
          fontSize: '24px',
          fontFamily: 'LuckiestGuy',
          color: '#ffff66',
          stroke: '#000000',
          strokeThickness: 7
        }
      );

      currentY += 30;

      Object.entries(
        regionData.levels
      ).forEach(([levelKey, levelData]) => {

        const score = levelData.score || 0;

        const rank =
          score >= SaveManager.scoreToNextLevel
            ? '⭐'
            : '';

        this.add.text(
          startX + 30,
          currentY,
          `${levelKey}: ${score} pts ${rank}`,
          {
            fontSize: '16px',
            fontFamily: 'LuckiestGuy',
            stroke: '#000000',
            strokeThickness: 4,
            color: score >= SaveManager.scoreToNextLevel ? '#0f0' : '#ffffff'
          }
        );

        currentY += 25;
      });

      currentY += 20;
    });
  }
}