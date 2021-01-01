var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostjumping;
var invisibleline, invisiblelineGroup;
var endingline;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var hororSound;
var scoringline, scorelineGroup;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostjumping = loadAnimation("ghost-jumping.png","ghost-standing.png");
  hororSound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  ghost = createSprite(200,300,20,20);
  ghost.addAnimation("jumping",ghostjumping);
  ghost.scale = 0.3;
  //ghost.debug = true;
  endingline = createSprite(300,590,600,10);
  endingline.visible = false;
  score = 0;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisiblelineGroup = createGroup();
  scorelineGroup = createGroup();
  
}

function draw(){
  if(gameState===PLAY){
    hororSound.play();
    //ghost.debug = true;
    
    tower.velocityY = 1;
    spawnDoor();
    
    if(keyDown("space")){
    ghost.velocityY = -6;       
  }
  ghost.velocityY = ghost.velocityY+0.5;
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5;
  }
  
  if(ghost.isTouching(climberGroup)){
    
    
    ghost.velocityY = 0;
    
  }
    
    if(ghost.isTouching(scorelineGroup)){
    scorelineGroup.setLifetimeEach(0);
    score = score+1;
    
    
  }
    
   if(ghost.isTouching(invisiblelineGroup)){
       gameState = END;
  }
    
  if(ghost.isTouching(endingline)){
       gameState = END;
    
  }
    
  }else if(gameState===END){
     
     tower.velocityY = 0;
     ghost.velocityY = 0;
     doorGroup.setVelocityXEach(0);
     doorGroup.setVelocityYEach(0);
     doorGroup.setLifetimeEach(-1);
     climberGroup.setVelocityXEach(0);
     climberGroup.setVelocityYEach(0);
     climberGroup.setLifetimeEach(-1);
     invisiblelineGroup.setVelocityXEach(0);
     invisiblelineGroup.setVelocityYEach(0);
     invisiblelineGroup.setLifetimeEach(-1);
     scorelineGroup.setVelocityYEach(0);
     scorelineGroup.setLifetimeEach(-1);
    
  }
  
  
  if(tower.y>600){
    tower.y = 300;
  }
      

  
  drawSprites();
  fill("white");
  textSize(20);
  text("Score: "+score,500,50);
  if(gameState===END){
    fill("yellow");
    textSize(50);
    text("Game Over",200,300);
  }
}

function spawnDoor(){
  if(frameCount % 200 === 0){
  var door = createSprite(100,-50,20,20);
  var climber = createSprite(100,15,100,20);
  var invisibleline = createSprite(100,25,100,5);
  var scoringline = createSprite(100,5,50,5);
  scoringline.visible = false;
  invisibleline.visible = false;
  door.addImage(doorImg);
  climber.addImage(climberImg);
  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleline.velocityY = 1;
  scoringline.velocityY = 1;
  door.x = Math.round(random(150,400));
  climber.x = door.x;
  invisibleline.x = climber.x;
  scoringline.x = climber.x;
  ghost.depth = climber.depth+1;
  door.lifetime = 700;
  climber.lifetime = 700;
  invisibleline.lifetime = 700;
  scoringline.lifetime = 700;
  doorGroup.add(door);
  climberGroup.add(climber);
  invisiblelineGroup.add(invisibleline);
  scorelineGroup.add(scoringline);
    
    
  }
}