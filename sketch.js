var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var runner, runnerImage;
var ground,groundImage, invisibleGround;
var monsterImage, monsterGroup;
var cloudsGroup, cloudImage;
var coinImage,coinGroup;
var  restart,resetImage,gameOver, gameoverImage;

function preload() {

  runnerImage = loadAnimation("sprite_0.png", "sprite_1.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("road.png");
  coinImage = loadImage("coin.png");
  monsterImage = loadImage("monster.png");
  resetImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(600, 200);

  invisibleGround = createSprite(300, 195, 600, 3);
  invisibleGround.visible = false

  ground = createSprite(300, 200, 1000, 40);
  ground.addImage(groundImage);
  ground.scale = 2;
 
   restart = createSprite(300,140);
  restart.addImage(resetImage);
  restart.scale = 0.7
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.5
  
  runner = createSprite(50, 165, 20, 50);
  runner.addAnimation("running", runnerImage);
  //assigning scale to the runner
  runner.scale = 0.3;

  cloudsGroup = new Group();
  coinGroup = new Group();
  monsterGroup = new Group();

  score = 0;
}

function draw() {
  background(255);

  
  if (gameState === PLAY) {
     ground.velocityX = -3;
    
      runner.visible = true;
      gameOver.visible = false;
    
  //reseting the ground
  if (ground.x < 100) {
    ground.x = 300;
  }
    restart.visible = false;
  
  if(coinGroup.isTouching(runner)){
     score += 1;
     coinGroup.destroyEach();
     }
    
    text("Score: "+ score, 500,50);
    
     //calling cloud function
  spawnClouds();
  //calling coins function
  spawnCoins();
  //calling monster function
  spawnMonster();
    
    if(monsterGroup.isTouching(runner)){
    monsterGroup.destroyEach();
    gameState = END;
  }
 
    
  } else if (gameState === END) {
     //set velcity of each game object to 0
    ground.velocityX = 0;
    runner.velocityY = 0;
    monsterGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
  restart.visible = true;
  gameOver.visible = true;
    
    fill("black");
    textSize(20);
   text("Score: "+ score, 260,90);
    
    monsterGroup.destroyEach();
    cloudsGroup.destroyEach();
    coinGroup.destroyEach();
    
    runner.visible = false;
    
     if(mousePressedOver(restart)) {
      reset();
        
    }
  }
  
  

  //fixing the runner go out of the screen 
  runner.collide(invisibleGround);

 
     //make the runner jump
  if (keyDown("space") && runner.y > 100) {
    runner.velocityY = -9;
  }
  
 //  runner.debug = true;
  

  // gravity
  runner.velocityY = runner.velocityY + 0.8;

 
  

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = runner.depth;
    runner.depth = runner.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}
function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var coin = createSprite(600, 120, 40, 10);
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;

    //assign lifetime to the variable
    coin.lifetime = 200;

    //adjust the depth
    coin.depth = runner.depth;
    runner.depth = runner.depth + 1;

    //add each coin to the group
    coinGroup.add(coin);
    
   // coin.debug = true;
    coin.setCollider("rectangle",0,0,10,10);
  }

}

function spawnMonster() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var monster= createSprite(600, 160, 40, 10);
    monster.addImage(monsterImage);
    monster.scale = 0.1;
    monster.velocityX = -3;

    //assign lifetime to the variable
    monster.lifetime = 200;

    //adjust the depth
    monster.depth = runner.depth;
    runner.depth = runner.depth + 1;

    //add each monster to the group
    monsterGroup.add(monster);
    
   // monster.debug = true;
    monster.setCollider("rectangle",0,0,5,5);
  }
}

function reset(){
  gameState = PLAY;
 // gameOver.visible = false;
 // restart.visible = false;
  
  monsterGroup.destroyEach();
  cloudsGroup.destroyEach();
   
  score = 0;
  
 
}