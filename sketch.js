function setup() {
  createCanvas(600, 400);
  gameMusic.loop();
}
//Circle info
let xCircle=300;
let yCircle=200;
let dCircle=35;
let rCircle=dCircle/2;

//Circle speed
let xCircleSpeed=8;
let yCircleSpeed=8;

//Player base
let wPlayer=10;
let hPlayer=95;

//Left player info
let xLeftPlayer=8;
let yLeftPlayer=160;
let yLeftPlayerSpeed=10;

//Right player info
let xRightPlayer=582;
let yRightPlayer=160;
let yRightPlayerSpeed=10

//Game conditions
let collide2d = false
let easeAmount;

//Game score
let scoreLeft=0;
let scoreRight=0;

//Game Sounds
let gameMusic;
let ballSound;
let scoreSound;

function preload (){
  gameMusic = loadSound('trilha.mp3');
  ballSound = loadSound('raquetada.mp3');
  scoreSound = loadSound('ponto.mp3');
}

function draw() {
  background(0);
  createBall();
  movimentBall();
  screenLimits();
  createPlayer(xLeftPlayer,yLeftPlayer);
  createPlayer(xRightPlayer,yRightPlayer);
  controlLeftPlayer();
  computerInteligence();
  libraryColision(xLeftPlayer,yLeftPlayer);
  libraryColision(xRightPlayer,yRightPlayer);
  scoreGame();
  playersScore();
}

function createBall () {
   circle (xCircle,yCircle,dCircle);
}

function movimentBall () {
  xCircle += xCircleSpeed;
  yCircle += yCircleSpeed;
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

function createPlayer (x,y) {
  rect(x,y,wPlayer,hPlayer)  
}

function controlLeftPlayer () {
  if (keyIsDown(UP_ARROW)) {
    yLeftPlayer -= yLeftPlayerSpeed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yLeftPlayer += yLeftPlayerSpeed;
  }
}

function computerInteligence () {
  let targetY = yCircle - hPlayer / 2;
 let easeAmount = 0.1;
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

function resetBallPosition() {
  xCircle = width / 2;
  yCircle = height / 2;
  
  let angle = random(-PI / 6, PI / 3); // Adjust the angle range as desired
  let speed = 8; // Adjust the speed as desired
  xCircleSpeed = speed * Math.cos(angle) * (random() > 0.5 ? 1 : -1);
  yCircleSpeed = speed * Math.sin(angle) * (random() > 0.5 ? 1 : -1);
}
