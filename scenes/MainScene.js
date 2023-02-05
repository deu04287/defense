
import Config from "../Config.js";
import Button from "../Button.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
      super("MainScene");
  }

  preload() {
    // this.load.image("background", "bg.png");

}
  create() {
    const bg = this.add.graphics();
    bg.fillStyle(0xbbdefb);
    bg.fillRect(0, 0, Config.width, Config.height);
    bg.setScrollFactor(0);

    // this.add.bitmapText(500 / 2, 150, 'pixelFont', 'Meow Meow Fuzzyface', 40).setOrigin(0.5);

    this.add.image(Config.width / 2, Config.height / 2, 'cat');
    this.scene.start("PlayingScene");

    // const startButton = new Button(500 / 2, 500 / 2 + 150, 'Start Game', this, () => this.scene.start("PlayingScene"),);
  }
}