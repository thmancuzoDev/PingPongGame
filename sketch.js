function setup() {
  createCanvas(600, 400);
  gameMusic.loop();
}
//Ball info
let xCircle=300;
let yCircle=200;
let dCircle=35;
let rCircle=dCircle/2;
let fireBallImage;
 let imageX = xCircle - dCircle / 2;
 let imageY = yCircle - dCircle / 2;
 let dImage = dCircle;

//Ball speed
let xCircleSpeed=8;
let yCircleSpeed=8;

//Player base

let wPlayer=10;
let hPlayer=95;

//Left player info
let playerImage;
let xLeftPlayer=8;
let yLeftPlayer=160;
let yLeftPlayerSpeed=10;

//Right player info

let xRightPlayer=582;
let yRightPlayer=160;
let yRightPlayerSpeed=10

//Game conditions
let backgroundImage;
let collide2d = false
let easeAmount;

//Game score
let scoreLeft=0;
let scoreRight=0;

//Game Sounds
let gameMusic;
let ballSound;
let scoreSound;

function preload () {
  backgroundImage = loadImage('backgroundImage.jpg');
  fireBallImage = loadImage('fireBall.png');
  gameMusic = loadSound('trilha.mp3');
  ballSound = loadSound('raquetada.mp3');
  scoreSound = loadSound('ponto.mp3');
  leftPlayer = loadImage('web_leftPlayer.png')
  rightPlayer = loadImage('web_rightPlayer.png')
}

function draw() {
  drawBackground()
  createBall();
  movimentBall();
  screenLimits();
  createPlayer(xLeftPlayer,yLeftPlayer, leftPlayer);
  createPlayer(xRightPlayer,yRightPlayer, rightPlayer);
  controlLeftPlayer();
  computerInteligence();
  libraryColision(xLeftPlayer,yLeftPlayer);
  libraryColision(xRightPlayer,yRightPlayer);
  scoreGame();
  playersScore();
}

function drawBackground() {
  background(0);
  // Calculate the scaling factor to fit the image proportionally
  let scale = max(width / backgroundImage.width, height / backgroundImage.height);
  // Calculate the dimensions of the scaled image
  let imageWidth = backgroundImage.width * scale;
  let imageHeight = backgroundImage.height * scale;
  // Calculate the x and y coordinates to center the image on the canvas
  let x = (width - imageWidth) / 5;
  let y = (height - imageHeight) / 5;
  // Draw the background image
  image(backgroundImage, x, y, imageWidth, imageHeight);
}

function createBall() {
  push();
  translate(xCircle, yCircle);
  rotate(random(TWO_PI)); // Random rotation angle between 0 and 2*PI
  imageMode(CENTER);
  image(fireBallImage, 0, 0, dImage, dImage);
  pop();
}

function movimentBall () {
  xCircle += xCircleSpeed;
  yCircle += yCircleSpeed;
}

function resetBallPosition() {
  xCircle = width / 2;
  yCircle = height / 2;
  
  let angle = random(-PI / 6, PI / 4); // Adjust the angle range as desired
  let speed = 5; // Adjust the speed as desired
  xCircleSpeed = speed * Math.cos(angle) * (random() > 0.5 ? 1 : -1);
  yCircleSpeed = speed * Math.sin(angle) * (random() > 0.5 ? 1 : -1);
}

function screenLimits () {
  if (xCircle + rCircle > width || xCircle-rCircle<0){
    xCircleSpeed *= -1;
  }  
  if (yCircle+rCircle>height || yCircle-rCircle<0){
    yCircleSpeed *= -1;
  }
}

//PLAYERS

function createPlayer(x, y, playerImage) {
  image(playerImage, x, y, wPlayer, hPlayer);
}

function controlLeftPlayer () {
  if (keyIsDown(UP_ARROW) && yLeftPlayer > 0) {
    yLeftPlayer -= yLeftPlayerSpeed;
  }

  if (keyIsDown(DOWN_ARROW) && yLeftPlayer + hPlayer < height) {
    yLeftPlayer += yLeftPlayerSpeed;
  }
}

function computerInteligence () {
  let targetY = yCircle - hPlayer / 2;
  let easeAmount = 0.1;
  targetY = constrain(targetY, 0, height - hPlayer);
  yRightPlayer += (targetY - yRightPlayer) * easeAmount;
}

//GAME
function libraryColision (x,y) {
  collide2d = collideRectCircle (x, y, wPlayer, hPlayer, xCircle, yCircle, dCircle);
  if (collide2d){
    xCircleSpeed *= -1;
    // Increase the ball's speed
    xCircleSpeed *= 1.1; // Adjust the speed increment as desired
    yCircleSpeed *= 1.1; // Adjust the speed increment as desired
    // Increase an ball effect 
    let playerOffset = yLeftPlayer - yRightPlayer;
    let speedOffset = Math.abs(xCircleSpeed) + Math.abs(yCircleSpeed);
    yCircleSpeed += playerOffset * 0.002 * speedOffset;

    ballSound.play();
  }
}

function scoreGame() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,128,0));
  rect(175,20,50,30,5,5,0,5);
  fill(255);
  text(scoreLeft, 200, 40);
  fill(color(255,128,0));
  rect(375,20,50,30,5,5,5,0);
  fill(255);
  text(scoreRight, 400, 40);
}

function playersScore() {
    if (xCircle+rCircle>599) {
      scoreLeft += 1;scoreSound.play(); resetBallPosition()
    }
    if (xCircle-rCircle<1) {
      scoreRight += 1; scoreSound.play(); resetBallPosition();
    }
}