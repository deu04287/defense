import PlayingScene from "../scenes/PlayingScene.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, x2, y2, key) {
        super(scene, x, y, x2, y2, key);

        scene.add.existing(this, true);
        // this.degree = 0;

        var angle = Phaser.Math.Angle.Between(x, y, x2, y2);
        var reverseAngle = Phaser.Math.Angle.Reverse(angle + Math.PI / 2);
        // this.degree = Math.round(Phaser.Math.RadToDeg(reverseAngle));
        // console.log(reverseAngle);
        // this.degree = this.degree % 180;
        // if(this.degree>180){
        //     this.setFlipX(true);
        //     this.degree = 180-(this.degree-180);
        // }
        // else this.setFlipX(false);
        // console.log(this.degree);

        if(reverseAngle >= 3.14){
            this.rotation = reverseAngle % 3.14;
        }
        else{
            this.rotation = 3.14 +reverseAngle;
        }
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('fireball', { frames: [16, 17, 18] }),
            frameRate: 8,
            repeat: -1
        });
        // this.setTexture('balls');
        this.play('walk');
    }
}