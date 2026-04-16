class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelectScene');
  }

  create() {
    this.add.text(250, 200, 'SELECCIÓN DE NIVEL', { fontSize: '32px' });

    this.add.text(250, 260, 'Presioná 1: Nivel 1');
    this.add.text(250, 300, 'ESC: Volver');

    this.input.keyboard.on('keydown', (event) => {
      if (event.key === '1') {
        this.scene.start('GameScene');
      }

      if (event.key === 'Escape') {
        this.scene.start('MainMenuScene');
      }
    });
  }
}