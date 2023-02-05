import PlayingScene from "../scenes/PlayingScene.js";

export default class Monster extends Phaser.Physics.Arcade.Sprite {
    static arr = [];
    static index = 0;

    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        // scene.physics.add.existing(this);

        this.scene = scene;

        this.defaultHP = 10  ; //불변값
        this.hp = this.defaultHP; // 변하는값


        this.characterLimitBoundaryWidth = 800;
        this.characterLimitBoundaryHeight = 1120;
        this.startX = x; // 0부터 시작하면 너무 바짝붙어서 시작함 그래서 간격좀 준거
        this.startY = y;

        this.destinationX = (this.scene.game.config.width / 2 + this.characterLimitBoundaryWidth / 2) + 45;
        this.destinationY = (this.scene.game.config.height / 2 + this.characterLimitBoundaryHeight / 2) + 100;

        Monster.index++;
        this.eachNum = Monster.index;
        
        scene.add.existing(this, true);
        this.setDepth(-this.eachNum);
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('man', { frames: [12,13,14,15] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('man', { frames: [8,9,10,11] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('man', { frames: [4,5,6,7] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('man', { frames: [0,1,2,3] }),
            frameRate: 8,
            repeat: -1
        });
        // this.setTexture('balls');
        this.play('right');
        this.moveRight(this);

    }

    returnHpColor(monster) {
        let color;
        if (monster.hp >= Math.floor((this.defaultHP / 100) * 75)) {
            color = 0x3B47F9;
        }
        else if (monster.hp >= Math.floor((this.defaultHP / 100) * 50)) {
            color = 0x46C627;
        }
        else if (monster.hp >= Math.floor((this.defaultHP / 100) * 25)) {
            color = 0xEBF93B;
        }
        else {
            color = 0xD33131;           // console.log("red");
        }
        return color;

    }

    // 네모가 있으면 
    moveRight(monster) {
        if (monster.active) {

            // console.log("나는 몇번째 일까용?~"+this.eachNum);
            // console.log(this.destinationY);
            monster.scene.tweens.add({
                targets: this,
                x: this.destinationX,
                y: this.startY,
                // x: 1000,
                // y: 500,
                duration: 5000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveDown(monster);
                    // this.play('down');
                },
                onCompleteScope: this
            });
        }
    }

    moveDown(monster) {
        if (monster.active) {

            monster.scene.tweens.add({
                targets: this,
                x: this.destinationX,
                y: this.destinationY,
                duration: 10000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveLeft(monster);
                    // this.play('left');
                },
                onCompleteScope: this
            });
        }
    }
    moveLeft(monster) {
        if (monster.active) {
            monster.scene.tweens.add({
                targets: this,
                x: this.scene.game.config.width / 2 - this.startX + 50,
                y: this.destinationY,
                duration: 8000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveUp(monster);
                    // this.play('up');
                },
                onCompleteScope: this
            });
        }
    }
    moveUp(monster) {
        if (monster.active) {
            monster.scene.tweens.add({
                targets: this,
                x: this.scene.game.config.width / 2 - this.startX + 50,
                y: this.startY,
                duration: 10000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveRight(monster);
                    // this.play('right');
                },
                onCompleteScope: this
            });
        }
    }



}