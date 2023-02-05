
export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    // this.load.image("background", "bg.png");

}

create() {
    this.add.text(20, 20, "Loading game...");
    // this.scene.start("MainScene");
    this.scene.start("PlayingScene");

  }
}