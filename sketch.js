var fighter,fighterImg;
var missile,missileImg;
var coins,coinsImg;
var hearts,heartsImg;
var backgroundImg;
var score = 0;

var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;

var coinsGroup;
var missileGroup;
var bonus;
var bonusImg;
var bonusGroup;
var bonusScore = 0;
var button1;
var button2;


function preload(){
  fighterImg = loadImage("Images/Fighter.png");
  missileImg = loadImage("Images/Missile.png");
  coinsImg = loadImage("Images/Coin.png");
  heartsImg = loadImage("Images/Life.png");
  backgroundImg = loadImage("Images/Background.jpg")
  bonusImg = loadImage("Images/Life.png");
}



function setup() {
  createCanvas(displayWidth-30,displayHeight-50);
 
  fighter = createSprite(displayWidth/2,displayHeight-150, 50, 50);
  
  //fighter.debug = true;
  fighter.setCollider("rectangle",0,0,150,220);
  fighter.addImage(fighterImg);
  fighter.scale = 0.5;
  //missile = createSprite()
  coinsGroup = new Group();
  missileGroup = new Group();
  bonusGroup = new Group();
  button1 = createButton("START");
  button2 = createButton("BACK");
}

function draw() {
  background(backgroundImg); 
  
  

    if(bonusScore === 400){
      fighter.velocityY = 0;
      coins.setVelocityY = 0;
      missile.setVelocityY = 0;
      textSize(30);
      fill("green");
      text("HURRAY YOU WON THE GAME",displayWidth/2-500,displayHeight/2-50);
      gameState=END;
    }
    
  if(gameState===START){
    button1.show();
    button2.hide();
    missileGroup.visible=false;
    coinsGroup.visible=false;
    bonusGroup.visible=false;
    button1.position(width/2,height/2);
    button1.mousePressed(changeState);
    textSize(30);
    fill("green");
    text("WELCOME TO THE GAME",displayWidth/2-100,displayHeight/2-100);
    console.log(fighter.x);
    console.log(fighter.y);
  }  

  if(gameState===PLAY){
    button1.hide();
    fighter.velocityY=0;
    spawnMissiles();
    spawnCoins();
    spawnBonus();
   
    textSize(50);
    fill("red");
     text("Coins : " + score,displayWidth/-500,displayHeight-550);
     text("Bonus : " + bonusScore,displayWidth/-570,displayHeight-500);
     textSize(15);
     fill("black");
     text("Collect the hearts for bonus",displayWidth/2-640,displayHeight-460);
     
    if(coinsGroup.isTouching(fighter)){
      coins.remove();
      score = score + 50;
    }

    if(missileGroup.isTouching(fighter)){
      missile.remove();
      gameState = END;
    }

    if(keyDown(RIGHT_ARROW)){
      fighter.x = fighter.x + 10;
    }

    if(keyDown(LEFT_ARROW)){
      fighter.x = fighter.x - 10;
    }

    if(keyDown(UP_ARROW)){
      fighter.y = fighter.y - 10;
    }

    if(keyDown(DOWN_ARROW)){
      fighter.y = fighter.y + 10;
    }

    if(bonusGroup.isTouching(fighter)){
      console.log("HELLO");
      bonusGroup.destroyEach();
      bonusScore = bonusScore + 200;
  }  
  
}

  if(gameState===END){
    button2.show();
    button2.position(displayWidth/2,displayHeight/2+50);
    button2.mousePressed(changeState2);
    fighter.visible = false;
    score = 0;
    bonusScore = 0;
    missileGroup.setVelocityYEach(0);
    coinsGroup.setVelocityYEach(0);
    fill("blue");
    textSize(30);
    text(" GAME OVER ",displayWidth/2-30,displayHeight/2);
    text("PRESS R TO RESTART",displayWidth/2-80,displayHeight/2-50);
    if(keyDown("r")){
      gameState = START;
      fighter.x = displayWidth/2;
      fighter.y = displayHeight-150;
      fighter.visible = true;
      coinsGroup.destroyEach();
      missileGroup.destroyEach();
      button1.hide();
    }
    
  }
  
   drawSprites();
}

function spawnMissiles(){
  if(frameCount%50===0){
    missile = createSprite(displayWidth/2-50,0,10,70);
    missile.addImage(missileImg);
    missile.scale = 0.5
    missile.velocityY = 8;
    missile.x = Math.round(random(50,displayWidth));
    missileGroup.add(missile);
  }
}

function spawnCoins(){
  if(frameCount%70===0){
    coins = createSprite(displayWidth/2-50,0,10,10);
    coins.addImage(coinsImg);
    coins.scale = 0.3;
    coins.velocityY = 8;
    coins.x = Math.round(random(50,displayWidth));
    coinsGroup.add(coins);
  }
}

function spawnBonus(){
  if(frameCount%500===0){
    bonus = createSprite(displayWidth/2-50,0,10,10);
    bonus.addImage(bonusImg);
    bonus.velocityY = 8;
    bonus.scale = 0.3;
    bonusGroup.add(bonus);
  }
}


function changeState() {
  gameState = PLAY;
  console.log(gameState);
  missileGroup.destroyEach();
  coinsGroup.destroyEach();
  fighter.velocityY=-5;
}

function changeState2(){
      gameState = START;
      fighter.x = displayWidth/2;
      fighter.y = displayHeight-150;
      fighter.visible = true;
      coinsGroup.destroyEach();
      missileGroup.destroyEach();
      button1.hide();
  
  //console.log(gameState);
}

