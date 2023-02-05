import PlayingScene from "../scenes/PlayingScene.js";

export default class Unit extends Phaser.Physics.Arcade.Sprite {
    static arr = [];
    static index = 0;

    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // this.setTexture('balls');
        // this.characterSelected = false;
        // this.speed = 0.02;

        
        this.bullets = [];
        this.bulletTime = 0;
        // this.power = 1;

        scene.add.existing(this, true);
        scene.physics.add.existing(this);

        this.speed = 200;
        this.scene = scene;
        this.setScale(2);
        this.setImmovable(true);

        this.body.pushable = false;
        PlayingScene.group.add(this);

        scene.physics.add.collider(this, PlayingScene.group, (a, b) => {
            b.body.stop();
            a.body.stop();
        });

        this.checkOverlap = false;
        scene.physics.add.overlap(this, PlayingScene.group, (a, b) => {
            // Unit.cndehfwlwja = {x:b.x, y:b.y };
            // console.log(`a:${a.x}`);
            this.checkOverlap = true;

            let angle = Phaser.Math.Angle.Between(a.x, a.y, b.x, b.y);
            // this.scene.physics.moveToObject(b, {x:b.x+ Math.cos(angle) * 100,y:b.y+Math.sin(angle) * 100}, this.speed);

            // b.x = b.x+1;

            // console.log(Math.cos(angle) * 100);
            b.x += Math.cos(angle) * 1;
            b.y += Math.sin(angle) * 1;

            this.checkOverlap = false;

            // console.log(a);
        });

        this.frameCount = 0;

        this.target = new Phaser.Math.Vector2();

        this.selected = false;
        Unit.index++;
        this.eachNum = Unit.index;
        Unit.arr.push(this);

        this.scene.input.on('pointerdown', (pointer) => {
            if (this.getBounds().contains(pointer.x, pointer.y)) {
                if (this.selected) {
                    this.selected = false;
                    this.body.stop();
                    this.setScale(2);
                } else {
                    Unit.arr.forEach(e => {
                        e.selected = false;
                        e.body.stop();
                        e.setScale(2);
                    });
                    this.selected = true;

                    this.setScale(2.5);
                }
                // this.eachNum++;
            }
            if (this.selected) {
                this.moveTo(pointer.x, pointer.y);
            }
        });


        

    }

    preUpdate() {
        if (this.frameCount++ % 10 === 0) {
            if (this.checkOverlap === false) {
                // this.body.stop();
            }

            if (this.selected) {
                const tolerance = 10; // 거리 계산해서 10안에 들어가면 그냥 바로 이동시킴

                const distance = Phaser.Math.Distance.BetweenPoints(this, this.target);

                if (this.body.speed > 0) {

                    if (distance < tolerance) {
                        this.body.reset(this.target.x, this.target.y);
                    }

                }

            }
        }
    }

    moveTo(x, y) {
        this.target.x = x;
        this.target.y = y;
        this.scene.physics.moveToObject(this, this.target, this.speed);
    }

}