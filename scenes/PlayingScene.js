import Unit from "../character/Unit.js";
import Monster from "../character/Monster.js";
import Bullet from "../character/Bullet.js";
import CreateCharacterButton from "../CreateCharacterButton.js";

var rudrPtjs; //경계선
let timeArea;
let money = 10;

let timer = 1;
        
export default class PlayingScene extends Phaser.Scene {
    static group;
    
    constructor(){
        super({
            key:'PlayingScene',
        });
    }

    preload() {
        // this.load.pack('pack','../pack.json');

        this.load.spritesheet('balls', '../img/balls.png', {frameWidth:17, frameHeight:17});
        this.load.spritesheet('explosion', '../sprite/explosion.png', {frameWidth:130.5, frameHeight:141});
        this.load.spritesheet('fireball', '../sprite/fireball.png', {frameWidth:64, frameHeight:64});
        this.load.spritesheet('man', '../sprite/sprite2.png', {frameWidth:102, frameHeight:152.75});
        
        this.load.image('ball', 'assets/sprites/shinyball.png');
    }
    create() {
        PlayingScene.group = this.physics.add.group();
        /////////////////////////캐릭터 못나가게 하는 장벽//////////////////////////////
        rudrPtjs = this.physics.add.group({
            key: 'ball',
            frameQuantity: 100,
        });
        Phaser.Actions.PlaceOnRectangle(rudrPtjs.getChildren(), new Phaser.Geom.Rectangle(this.game.scale.width/2-400+30,this.game.scale.height/5+30 ,800-60,1120-60));
        rudrPtjs.getChildren().forEach(child => {
            // console.log(child);
            child.body.pushable = false;
            PlayingScene.group.add(child);
        });
        ///////////////////////////////////////////////////////
        timeArea = this.add.text(this.game.scale.width-250, 10, '', { font: '50px Arial', fill: 'green' }).setOrigin(0,0);
        timeArea.setDepth(1);
        //////////////////////////////////////////////
        this.characters = [];

        this.monsters = [];

        // this.createMonster();

        new CreateCharacterButton(this.game.scale.width/2, this.game.scale.height-100, '소환', this, () => {
            if (money > 0) {
                this.createCharacter();
                
                money--;
            }
        });

        // this.switch = true;
        this.time.addEvent({ delay: 3000, callback: this.createMonster, callbackScope: this, loop: true });

        
    }
    update(time) {
        timer = Math.round(time*0.001);
        // console.log(this.game.loop.actualFps);
        // console.log(this.time.now);

        // console.log(this.monsters);
        // timeArea.setText("time:"+Math.round(time));
        timeArea.setText("money:"+money);

        this.characters.forEach(character => {
            this.monsters.forEach(monster => {
                    // console.log(monster.eachNum);
                    // console.log("yes!");
                    if (character.bulletTime < this.time.now) {
                        if (Phaser.Math.Distance.Between(character.x, character.y, monster.x, monster.y) < 1000) {
                            character.bullets.push(new Bullet(this,character.x, character.y, monster.x, monster.y));
                            character.bullets[character.bullets.length - 1].speed = 0.022;
                            character.bullets[character.bullets.length - 1].targetIndex = monster.eachNum;
                            // console.log("yes!!");
                            character.bulletTime = this.time.now + 500;
                        }
                    }
                
                for (let bullet of character.bullets) {
                    if (monster.eachNum === bullet.targetIndex) {
                        if(monster.x == undefined){
                            bullet.anims.stop();
                            bullet.destroy();
                            character.bullets.splice(character.bullets.indexOf(bullet), 1);
                           
                        }
                        bullet.x += (monster.x - bullet.x) * bullet.speed;
                        bullet.y += (monster.y - bullet.y) * bullet.speed;

                        
                            if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), monster.getBounds())) {
                                monster.hp -= 1;
                                monster.setTint(monster.returnHpColor(monster));
                                bullet.anims.stop();
                                bullet.destroy();
                                character.bullets.splice(character.bullets.indexOf(bullet), 1);
                                
                                // console.log();
                                if(monster.hp === 0 ){
                                    // console.log(monster.hp);
                                    monster.anims.stop();
                                    this.monsters.splice(this.monsters.indexOf(monster), 1);
                                    monster.destroy();
                                    // currentMonsterCountNumber--;
                                    money++;
                                }
                            }
                        
                        
                    }

                }
            });

        });
        
    }

    createMonster(){
        this.monsters.push(new Monster(this,(this.game.scale.width/2), (this.game.scale.height/5)-45));
    }
    createCharacter(){
        this.characters.push(new Unit(this, Phaser.Math.Between(this.game.scale.width/2-100, this.game.scale.width/2+100),Phaser.Math.Between(this.game.scale.height/2-100, this.game.scale.height/2+100) ));
        
    }
  

}
