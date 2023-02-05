export default class Monster extends Phaser.GameObjects.Image {
    constructor(x, y, texture, scene, callback) {
        super(scene, x, y, texture);

        this.characterLimitBoundaryWidth = 800;
        this.characterLimitBoundaryHeight = 1120;

        // this.startX = this.scene.game.config.width/2-this.characterLimitBoundaryWidth/2; // 0부터 시작하면 너무 바짝붙어서 시작함 그래서 간격좀 준거
        // this.startY = this.scene.game.config.height/5; 
        this.startX = x; // 0부터 시작하면 너무 바짝붙어서 시작함 그래서 간격좀 준거
        this.startY = y; 
        
        this.destinationX = (this.scene.game.config.width/2 + this.characterLimitBoundaryWidth/2)+45 ; 
        this.destinationY = (this.scene.game.config.height/2 + this.characterLimitBoundaryHeight/2)+100;

        this.index = 0;
        // this.scene = scene;
        // this.scene.physics.add.existing(this);
        this.defaultHP = 10; //불변값
        this.hp =this.defaultHP; // 변하는값
        
        // this
        //     .setOrigin(0.5)
        // .setInteractive({ useHandCursor: true })
        // .on('pointerdown', () => callback())
        // .on('pointerover', () => this.setTint("Red"))
        // .on('pointerout', () => this.clearTint());

        scene.add.existing(this);
        
    }

    returnHpColor(monster){
        let color;
        if(monster.hp >= Math.floor((this.defaultHP/100)*75)){
            color = 0x3B47F9;
        }
        else if(monster.hp >= Math.floor((this.defaultHP/100)*50)){
            color =  0x46C627;
        }
        else if(monster.hp >= Math.floor((this.defaultHP/100)*25)) {
            color =  0xEBF93B;
        }
        else{
            color = 0xD33131 ;           // console.log("red");
        }
        return color;

    }
    
    moveRight(monster) {
        if (monster.active) {
            monster.scene.tweens.add({
                targets: this,
                x: this.destinationX,
                y: this.startY,
                duration: 3000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveDown(monster);
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
                duration: 3000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveLeft(monster);
                },
                onCompleteScope: this
            });
        }
    }
    moveLeft(monster) {
        if (monster.active) {
            monster.scene.tweens.add({
                targets: this,
                x: this.startX,
                y: this.destinationY,
                duration: 3000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveUp(monster);
                },
                onCompleteScope: this
            });
        }
    }
    moveUp(monster) {
        if (monster.active) {
            monster.scene.tweens.add({
                targets: this,
                x: this.startX,
                y: this.startY,
                duration: 3000,
                ease: 'Linear',
                onComplete: function () {
                    // this.destroy();
                    this.moveRight(monster);
                },
                onCompleteScope: this
            });
        }
    }
}