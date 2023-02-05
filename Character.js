import PlayingScene from "./scenes/PlayingScene.js";

export default class Character extends Phaser.Physics.Arcade.Image {
    constructor(x, y, texture, scene, callback) {
        super(scene, x, y, texture);

        scene.add.existing(this,true);
        scene.physics.add.existing(this);
        
        // this.physics.add.existing(this);
        // this.body.setCollideWorldBounds(true);
        // this.body.setImmovable(true);

        // this.scene = scene;
        // this.setCollideWorldBounds(true);
        // this.setImmovable(true);
        // PlayingScene.group.add(this);
        // scene.physics.add.collider(this,PlayingScene.group);
        // scene.physics.add.overlap(this,PlayingScene.group,this.onOverlap,null,this);


        this.characterSelected = false;
        this.speed = 0.02;

        
        this.bullets = [];
        this.bulletTime = 0;
        this.power = 1;
        this
            .setOrigin(0.5)


            PlayingScene.group.add(this);
            scene.physics.add.collider(this,PlayingScene.group);
            scene.physics.add.overlap(this,PlayingScene.group,() => {
                console.log("겹침~~");
                console.log(x);    
            },null,this);
    
    
            // .setInteractive({ useHandCursor: true })
            // .on('pointerdown', () => callback())
            // .on('pointerover', () => this.setTint(0xff0000))
            // .on('pointerout', () => this.clearTint());

    }
    
}