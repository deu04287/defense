import LoadingScene from "./scenes/LoadingScene.js";
import MainScene from "./scenes/MainScene.js";
import PlayingScene from "./scenes/PlayingScene.js";

const Config = {
  type: Phaser.WEBGL,
  scene: [LoadingScene, MainScene, PlayingScene],
  width: 980,
  height: 1612,
  // width: window.innerWidth,
  // height: window.innerHeight,
  // width: 9*35,
  // height: 20*30,
  backgroundColor: '#999999',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
};


export default Config;
