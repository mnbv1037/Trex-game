var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacleImage, obstacle2Image, obstacle3Image, obstacle4Image, obstacle5Image, obstacle6Image;
var jumpsound
var diesound
var restart;
var gameover
var checkpoint
var gamestate = "play";

var cloudgroup, obstaclegroup;


var score = 0;
var g="hello"


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacleImage = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");

  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");

  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  background(220)
  createCanvas(600, 200)
console.log(g)
  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  restart = createSprite(300, 150, 5, 5);
  restart.scale = 0.35;
  restart.addImage("restart", restartImage);
  gameover = createSprite(300, 130)
  gameover.scale = 0.5
  gameover.addImage("gameover", gameoverImage);


  cloudgroup = new Group();
  obstaclegroup = new Group();

  //generate random numbers
  var rand = Math.round(random(1, 100))
  console.log(rand)

}

function draw() {
  //set background color
  background("white");
  console.log(g)
  trex.setCollider("circle", 0, 0, 40);
  text(score, 500, 15)
  if (gamestate == "play") {
    restart.visible = false
    gameover.visible = false
    ground.velocityX = -4;

    // jump when the space key is pressed
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -13;
      jumpsound.play()
    }

    trex.velocityY = trex.velocityY + 0.8

    score = score + 1
  if(score % 100 == 0){
    checkpoint.play()
  }
    spawnClouds()
    spawnObstacles()
    //ground reset
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (trex.isTouching(obstaclegroup)) {
    trex.velocityY = -13
      diesound.play()

      restart.visible = false
      gameover.visible = false
    }


  } else {
    trex.changeAnimation("collided", trex_collided)
    ground.velocityX = 0;
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
      gamestate = "play"
      cloudgroup.destroyEach();
      obstaclegroup.destroyEach();
      trex.changeAnimation("running", trex_running);
      score = 0;
    }

  }






  //stop trex from falling down
  trex.collide(invisibleGround);


  drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here
  if (frameCount % 60 == 0) {
    var cloudY = random(30, 100);
    cloud = createSprite(550, cloudY);
    cloud.addImage("cloud", cloudImage);
    cloud.velocityX = -4
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = 150
    cloudgroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 100 == 0) {
    obstacle = createSprite(500, 160)
    var r = Math.round(random(1, 6))
    switch (r) {
      case 1:
        obstacle.addImage("obstacle", obstacleImage);
        break;

      case 2:
        obstacle.addImage("obstacle", obstacle2Image);
        break;

      case 3:
        obstacle.addImage("obstacle", obstacle3Image);
        break;

      case 4:
        obstacle.addImage("obstacle", obstacle4Image);
        break;

      case 5:
        obstacle.addImage("obstacle", obstacle5Image);
        break;

      case 6:
        obstacle.addImage("obstacle", obstacle6Image);
        break;
    }

    obstacle.velocityX = -4
    obstacle.scale = 0.5;
    obstacle.lifetime = 150
    obstaclegroup.add(obstacle);
  }
}