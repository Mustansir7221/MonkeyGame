var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400)
  monkey = createSprite(80, 297, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(150, 330, 1250, 10);

  score = 0;
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightblue");
  text("score:" + score, 500, 50)
  textSize(20);

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y > 290) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.5;

    if (foodGroup.isTouching(monkey)) {
      score = score + 2
      foodGroup.destroyEach();
    }
  
  spawnFruit();
  spawnObs();
      ground.velocityX = -3

    
 }

  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    gameState=END;
}
  
  if(gameState===END){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.y=297;
  }


  
  monkey.collide(ground);
  console.log(monkey.y)

  reset();


  drawSprites();
}

function reset() {
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
}

function spawnFruit() {
  if (frameCount % 150 === 0) {
    banana = createSprite(610, 300, 20, 20);
    banana.velocityX = -4;
    banana.y = Math.round(random(120, 200))
    banana.addAnimation("ban", bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }

}

function spawnObs() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(610, 290, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.2;


  }



}