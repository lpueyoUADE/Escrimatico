class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.plugin(
      'rexbbcodetextplugin',
      'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins/dist/rexbbcodetextplugin.min.js',
      true
    );

    this.load.image('agua', 'assets/images/stuff/texture2.png');
    this.load.image('bosque', 'assets/images/stuff/texture2.png');
    this.load.image('rio', 'assets/images/stuff/texture2.png');

    this.load.image('background', 'assets/images/background/BG.png');

    this.load.image('yae1', 'assets/images/Yae/YaeFullBody.png');
  }

  create() {
    this.scene.start('MainMenuScene');
  }
}