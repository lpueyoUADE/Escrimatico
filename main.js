const config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 800,
  backgroundColor: '#1d1d1d',
  // transparent: true,

  scene: [
    BootScene,
    MainMenuScene,
    LevelSelectScene,
    GameScene,
    HighScoreScene
  ],

  scale: {
    // mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  render: {
    pixelArt: false,
    roundPixels: true
  },

  resolution: window.devicePixelRatio
};

new Phaser.Game(config);