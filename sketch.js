var man , manImg
var ground
var goldsGroup , goldImg
var stonesGroup , stoneImg
var background , bgImg
var score = 0;
var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ; 
var gameOver , restart ; 
var gameOverImg , restartImg ; 

function preload(){
  manImg = loadImage("man.gif")
  goldImg = loadImage("gold.png");
  stoneImg = loadImage("Stone.png")
  bgImg = loadImage("soil1.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");


}

function setup() {
  createCanvas(800,400);
  man = createSprite(100,200,70,70);
  man.addImage("manImage" , manImg);
  man.scale = 0.25 ; 

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  goldsGroup = new Group();
  stonesGroup = new Group();
}


function draw() {
  background(bgImg);  
  if(gameState === PLAY){
    man.y = World.mouseY;
    spawnGold();
    spawnStones();
    gameOver.visible = false;
    restart.visible = false;
    if(goldsGroup.isTouching(man)){
      goldsGroup.destroyEach();
      score = score+500 ;
      
    }else if(stonesGroup.isTouching(man)){
      gameState = END ; 
      gameOver.visible = true;
      restart.visible = true;
      stonesGroup.destroyEach();
      goldsGroup.setVelocityXEach(0);
      stonesGroup.setVelocityXEach(0);
      goldsGroup.setLifetimeEach(-1);
      stonesGroup.setLifetimeEach(-1);

      if(mousePressedOver(restart)) {
        reset();
      }
    
    }
    text("score :"+ score , 700 , 50);
  }
drawSprites();
}

function spawnGold() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var gold = createSprite(600,200,40,10);
    gold.addImage("goldImage" , goldImg);
    gold.y = Math.round(random(80,240));
    //gold.addImage(cloudImage);
    gold.scale = 0.1;
    gold.velocityX = -3;
    
     //assign lifetime to the variable
     gold.lifetime = 200;
    
  
    
    //add each gold to the group
    goldsGroup.add(gold);
  }
}
function spawnStones() {
  //write code here to spawn the clouds
  if (frameCount % 250 === 0) {
    var stone = createSprite(600,200,50,20)
    stone.addImage("stoneImage" , stoneImg);
    stone.y = Math.round(random(80,120));
    //gold.addImage(cloudImage);
    stone.scale = 0.2;
    stone.velocityX = -3;
    
     //assign lifetime to the variable
     stone.lifetime = 200;
    
  
    
    //add each gold to the group
    stonesGroup.add(stone);
  }
}
function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}