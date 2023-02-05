export default class CreateCharacterButton extends Phaser.GameObjects.Text {
    constructor(x, y, label, scene, callback) {
        super(scene, x, y, label, { backgroundColor: '#8aacc8' });
  
        this
            .setScale(2.3)
            .setOrigin(0.5,0)
            .setPadding(10)
            .setStyle({ backgroundColor: '#8aacc8' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.setStyle({ fill: '#000' }))
            .on('pointerout', () => this.setStyle({ fill: '#fff' }));
  
        scene.add.existing(this);
    }
  }
  