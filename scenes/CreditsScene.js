import { goToScene } from '../utils/sceneTransitions.js';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('CreditsScene');
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    
    const centerX = this.cameras.main.centerX;
    const startY = this.cameras.main.centerY;
    
    // Fondo
    const { width, height } = this.cameras.main;
    this.background = this.add.image(0, 0, 'backgroundNight')
      .setOrigin(0)
      .setDisplaySize(width, height)
      .setDepth(-10);

    this.add.text(50, 50, 'ESC: Volver');

    this.add.text(centerX, 100, 'CRÉDITOS', { 
      fontSize: '48px',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5, 0.5);

    this.add.text(centerX, 200, 'EduJuegos Es una cooperativa de trabajo\nconformada por', {
      fontSize: '32px',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center'
    }).setOrigin(0.5, 0.5);

    this.add.text(centerX, 500, 
      'Barbieri, Fabrizio\n' + 
      'Neer, Uriel Agustin\n'+
      'Perez Viña, Nicolás\n' +
      'Pueyo, Luciano\n',
      {
      fontSize: '28px',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center'
    }).setOrigin(0.5, 0.5);

    this.input.keyboard.on('keydown-ESC', () => {
      goToScene(this, 'MainMenuScene');
    });

    // Logo

    this.add.image(centerX, height - 50, 'yaeLogo')
            .setOrigin(0.5, 1)
            .setScale(0.18)
            .setDepth(10);

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