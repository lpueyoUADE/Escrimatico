import BootScene from './scenes/BootScene.js';
import CreditsScene from './scenes/CreditsScene.js';
import GameScene from './scenes/GameScene.js';
import HighScoreScene from './scenes/HighScoreScene.js';
import LevelSelectScene from './scenes/LevelSelectScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';

const config = {
  type: Phaser.AUTO,
  // width: 1500,
  // height: 800,
  backgroundColor: '#1d1d1d',
  // transparent: true,

  scene: [
    BootScene,
    MainMenuScene,
    LevelSelectScene,
    GameScene,
    HighScoreScene,
    CreditsScene
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