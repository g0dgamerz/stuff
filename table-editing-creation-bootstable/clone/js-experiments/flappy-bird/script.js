const KEY_CODES = {
  SPACE: 32
};
const GAME_MAIN_HEIGHT = 500;
const GAME_HEIGHT = 405;
const GAME_WIDTH = 700;
const PIPE_DIFF = 150;
const PIPE_WIDTH = 70;
const PIPE_HEAD_HEIGHT = 40;
const PIPE_BODY_BOT_SPACE = 62;
const FLAP_UP = 50;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 35;
const OBSTACLE_SPAWN_TIME = 300;

class Game {
constructor() {
  this.score;
  this.world = new World();
  this.world.addWorld();
  this.birdObj = new FlappyBird();
  this.obstacleList = [];
}

//Start Menu of game------------------------------------------------------------------------------
start() {
  this.world.startMenu();
  this.world.startBtn.onclick = () => {
    this.world.startMenuScreen.style.display = 'none';
    this.init();
  }
}

//Initiating the world----------------------------------------------------------------------------
init() {
  this.score = 0;
  this.obstacleList = [];
  let counter = 0;
  this.birdObj.create();
  this.world.mainWrapper.appendChild(this.birdObj.bird);
  let flag = setInterval(() => {
    counter++;
    this.world.moveBackground();
    this.birdObj.defaultMotion();
    if (this.checkGame() == "gameover") {
      document.onkeydown = null;
      clearInterval(flag);
    }
    //spawning obstacles--------------------------------------------------------------------
    if (counter == OBSTACLE_SPAWN_TIME) {
      counter = 0;
      let obstacle = new Obstacle(this.world.mainWrapper);
      obstacle.createPipe1();
      obstacle.createPipe2();
      this.obstacleList.push(obstacle);
    }
    //moving obstacles----------------------------------------------------------------------
    this.moveObstacles();

    //removing out of screen obstacle-------------------------------------------------------
    this.checkObstacle();

    if (this.checkCollision() == "collision") {
      clearInterval(flag);
      this.callGameOver();
      document.onkeydown = null;
    }
  }, 10);

  document.onkeydown = (event) => {
    if (event.keyCode == KEY_CODES.SPACE) {
      this.birdObj.moveUp();
    }
  }
}

callGameOver() {
  if (this.world.gameOver(this.score)) {
    this.world.playAgainBtn.onclick = () => {
      this.removeChildrenMainWrapper();
      this.init();
    }
  }
}

checkGame() {
  if (this.birdObj.y >= GAME_HEIGHT || this.birdObj.y <= 0) {
    this.callGameOver();
    return "gameover";
  }
  return "continue";
}

removeChildrenMainWrapper() {
  while (this.world.mainWrapper.hasChildNodes()) {
    this.world.mainWrapper.removeChild(this.world.mainWrapper.lastChild);
  }
}

moveObstacles() {
  for (let i = 0; i < this.obstacleList.length; i++) {
    this.obstacleList[i].defaultMotion();
  }
}

checkObstacle() {
  if (this.obstacleList.length > 0) {
    if (this.obstacleList[0].x < -PIPE_WIDTH) {
      this.score++;
      this.obstacleList[0].removeObstacle();
      this.obstacleList.splice(this.obstacleList.indexOf(this.obstacleList[0]), 1);
    }
  }
}

checkCollision() {
  if (this.obstacleList.length > 0) {
    let rightA = this.birdObj.x + BIRD_WIDTH;
    let leftB = this.obstacleList[0].x; //left of pipes
    let bottomA = this.birdObj.y + BIRD_HEIGHT;
    let topB = this.obstacleList[0].pipe2Length; //top of bottom pipe
    let topA = this.birdObj.y;
    let bottomB = this.obstacleList[0].pipe1Length + PIPE_HEAD_HEIGHT; //bottom of top pipe
    if ((rightA >= leftB) && (this.birdObj.x <= (leftB + PIPE_WIDTH))) {
      if (((rightA > leftB) && (topA < bottomB)) || ((rightA > leftB) && (bottomA > topB))) {
        return "collision";
      } else {
        return "noCollision";
      }
    } else {
      return "noCollision";
    }
  }
}
}


class World {
constructor() {
  this.mainWrapper;
  this.dx;
  this.bgImagePosition;
  this.gameOverScreen;
  this.playAgainBtn;
  this.startMenuScreen;
  this.startBtn;
}

addWorld() {
  this.dx = 1;
  this.bgImagePosition = 0;
  this.mainWrapper = document.createElement('div');
  this.mainWrapper.style.width = GAME_WIDTH + 'px';
  this.mainWrapper.style.height = GAME_MAIN_HEIGHT + 'px';
  this.mainWrapper.style.overflow = 'hidden';
  this.mainWrapper.style.position = 'relative';
  this.mainWrapper.style.backgroundSize = 'contain';
  this.mainWrapper.style.backgroundRepeat = 'repeat-x';
  this.mainWrapper.style.backgroundImage = 'url("background.png")';
  document.body.appendChild(this.mainWrapper);
}

moveBackground() {
  this.bgImagePosition -= this.dx;
  this.mainWrapper.style.backgroundPosition = this.bgImagePosition + 'px ' + '0px';
}

//style and adding start menu screen ----------------------------------------------------------
startMenu() {
  this.startMenuScreen = document.createElement('div');
  this.startMenuScreen.style.width = '700px';
  this.startMenuScreen.style.height = '500px';
  this.startMenuScreen.style.overflow = 'hidden';
  this.startMenuScreen.style.margin = '20px auto';
  this.startMenuScreen.style.display = 'block';
  this.startMenuScreen.style.fontSize = '100px';
  this.startMenuScreen.style.color = 'blue';
  this.startMenuScreen.style.position = 'absolute';
  this.startMenuScreen.style.backgroundColor = '#darkblue';
  this.startMenuScreen.style.top = '0px';
  this.startMenuScreen.style.left = '0px';
  this.startMenuScreen.style.textAlign = 'center';
  this.startMenuScreen.style.zIndex = '2';
  this.startMenuScreen.innerHTML = '<strong>Flappy Bird</strong><br><br>';
  this.mainWrapper.appendChild(this.startMenuScreen);
  this.startBtn = document.createElement('button');
  this.startBtn.style.padding = '10px 20px';
  this.startBtn.innerHTML = '<strong><h2>Start</h2></strong>';
  this.startMenuScreen.appendChild(this.startBtn);
}

//style and adding gameover screen ----------------------------------------------------------
gameOver(score) {
  this.gameOverScreen = document.createElement('div');
  this.gameOverScreen.style.width = '700px';
  this.gameOverScreen.style.height = '500px';
  this.gameOverScreen.style.overflow = 'hidden';
  this.gameOverScreen.style.margin = '20px auto';
  this.gameOverScreen.style.display = 'block';
  this.gameOverScreen.style.fontSize = '100px';
  this.gameOverScreen.style.color = 'red';
  this.gameOverScreen.style.position = 'absolute';
  this.gameOverScreen.style.top = '0px';
  this.gameOverScreen.style.left = '0px';
  this.gameOverScreen.style.textAlign = 'center';
  this.gameOverScreen.style.zIndex = '2';
  this.gameOverScreen.innerHTML = '<strong>GAME OVER</strong><br>Score:' + score + '<br>';
  this.mainWrapper.appendChild(this.gameOverScreen);
  this.playAgainBtn = document.createElement('button');
  this.playAgainBtn.style.padding = '10px';
  this.playAgainBtn.innerHTML = '<strong><h2>Play Again</h2></strong>';
  this.gameOverScreen.appendChild(this.playAgainBtn);
  return true;
}
}


class FlappyBird {
constructor() {
  this.bird;
  this.y = 20;
  this.x = 150;
  this.dy;
}

//add Flappy Bird------------------------------------------------------------------------------
create() {
  this.bird = document.createElement("img");
  this.bird.style.width = '40px';
  this.bird.style.height = '35px';
  this.bird.style.position = 'absolute';
  this.bird.style.backgroundSize = 'contain';
  this.bird.src = 'flappyBird.png';
  this.bird.style.top = this.y + 'px';
  this.bird.style.left = '150px';
  this.y = 20;
  this.dy = 1;
}

defaultMotion() {
  this.y += this.dy;
  this.bird.style.top = this.y + 'px';
}

//Button pressed function-------------------------------------------------------------------------
moveUp() {
  this.y -= FLAP_UP;
  this.bird.style.top = this.y + 'px';
}
}

class Obstacle {
constructor(mainWrapper) {
  this.dx = 1;
  this.x = GAME_WIDTH;
  this.pipeHeadTop;
  this.pipeBodyTop;
  this.pipeHeadBot;
  this.pipeBodyBot;
  this.mainWrapper = mainWrapper;
  this.pipe1Length = getRandomNumber(200, 50);
  this.pipe2Length = PIPE_DIFF + this.pipe1Length;
}

//add Obstacle------------------------------------------------------------------------------
createPipe1() {
  this.pipeHeadTop = document.createElement("img");
  this.pipeHeadTop.style.width = '100px';
  this.pipeHeadTop.style.height = '40px';
  this.pipeHeadTop.style.position = 'absolute';
  this.pipeHeadTop.style.backgroundSize = 'contain';
  this.pipeHeadTop.src = 'pipe-top.png';
  this.pipeHeadTop.style.top = this.pipe1Length + 'px';
  this.pipeHeadTop.style.left = this.x + 'px';
  this.mainWrapper.appendChild(this.pipeHeadTop);
  //pipeTopBody
  this.pipeBodyTop = document.createElement("img");
  this.pipeBodyTop.style.width = '100px';
  this.pipeBodyTop.style.height = this.pipe1Length + 'px';
  this.pipeBodyTop.style.position = 'absolute';
  this.pipeBodyTop.style.backgroundSize = 'contain';
  this.pipeBodyTop.src = 'pipe-body.png';
  this.pipeBodyTop.style.backgroundRepeat = 'repeat-y';
  this.pipeBodyTop.style.top = '0px';
  this.pipeBodyTop.style.left = this.x + 'px';
  this.mainWrapper.appendChild(this.pipeBodyTop);
}

createPipe2() {
  this.pipeHeadBot = document.createElement("img");
  this.pipeHeadBot.style.width = '100px';
  this.pipeHeadBot.style.height = '40px';
  this.pipeHeadBot.style.position = 'absolute';
  this.pipeHeadBot.style.backgroundSize = 'contain';
  this.pipeHeadBot.src = 'pipe-top.png';
  this.pipeHeadBot.style.top = this.pipe2Length + 'px';
  this.pipeHeadTop.style.left = this.x + 'px';
  this.mainWrapper.appendChild(this.pipeHeadBot);
  //pipeBodyBot
  this.pipeBodyBot = document.createElement("img");
  this.pipeBodyBot.style.width = '100px';
  this.pipeBodyBot.style.height = (GAME_MAIN_HEIGHT - PIPE_BODY_BOT_SPACE - this.pipe2Length - PIPE_HEAD_HEIGHT) + 'px';
  this.pipeBodyBot.style.position = 'absolute';
  this.pipeBodyBot.style.backgroundSize = 'contain';
  this.pipeBodyBot.src = 'pipe-body.png';
  this.pipeBodyBot.style.backgroundRepeat = 'repeat-y';
  this.pipeBodyBot.style.bottom = '62px';
  this.pipeBodyBot.style.left = this.x + 'px';
  this.mainWrapper.appendChild(this.pipeBodyBot);
}

defaultMotion() {
  this.x -= this.dx;
  this.pipeHeadTop.style.left = this.x + 'px';
  this.pipeHeadBot.style.left = this.x + 'px';
  this.pipeBodyTop.style.left = this.x + 'px';
  this.pipeBodyBot.style.left = this.x + 'px';
}

removeObstacle() {
  this.mainWrapper.removeChild(this.pipeHeadTop);
  this.mainWrapper.removeChild(this.pipeHeadBot);
  this.mainWrapper.removeChild(this.pipeBodyTop);
  this.mainWrapper.removeChild(this.pipeBodyBot);
}
}

//Random number generator------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Main Program---------------------------------------------------------------------------------------
let game = new Game();
game.start();