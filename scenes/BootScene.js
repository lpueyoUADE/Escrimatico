export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.plugin(
      'rexbbcodetextplugin',
      'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins/dist/rexbbcodetextplugin.min.js',
      true
    );

    const font = new FontFace(
      'Fredoka',
      'url(assets/fonts/Fredoka/Fredoka-VariableFont_wdth,wght.ttf)'
    );


    // Palabras
    this.load.image('agua', 'assets/images/stuff/texture2.png');
    this.load.image('bosque', 'assets/images/stuff/texture2.png');
    this.load.image('rio', 'assets/images/stuff/texture2.png');

    // Background
    this.load.image('background', 'assets/images/background/BG.png');
    this.load.image('backgroundNight', 'assets/images/background/BGNight.png');

    // Main Menu
    this.load.image('title', 'assets/images/mainmenu/title.png');
    this.load.image('water', 'https://labs.phaser.io/assets/particles/blue.png');
    this.load.image('firefly', 'https://labs.phaser.io/assets/particles/yellow.png');
    this.load.image('explosion', 'https://labs.phaser.io/assets/particles/red.png');

    // Yae
    this.load.image('yae1', 'assets/images/Yae/YaeFullBody.png');
    this.load.image('yaeLogo', 'assets/images/Yae/YaeLogo.png');
  }

  create() {
    this.input.setDefaultCursor('url(assets/images/cursor/cursor2.png) 16 16, pointer');
    this.scene.start('MainMenuScene');
  }
}