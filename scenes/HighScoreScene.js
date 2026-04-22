export default class HighScoreScene extends Phaser.Scene {
  constructor() {
    super('HighScoreScene');
  }

  create() {
    this.add.text(280, 200, 'HIGH SCORES', { fontSize: '32px' });
    this.add.text(250, 260, 'ESC: Volver');

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainMenuScene');
    });
  }
}