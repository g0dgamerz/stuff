//World Object--------------------------------------------------------------------------------------------------
function World() {
  var that = this;
  this.flag = null;  //for setInterval

  this.mainWrapper = document.createElement('div');
  this.mainWrapper.style.width = '414px';
  this.mainWrapper.style.height = '600px';
  this.mainWrapper.style.overflow = 'hidden';
  this.mainWrapper.style.margin = '20px auto';
  this.mainWrapper.style.backgroundRepeat = 'repeat-y';
  this.mainWrapper.style.backgroundImage = 'url("road.png")';

  document.body.appendChild(this.mainWrapper);

//dummy wrapper-----------------------------------------------------------
  this.dummyWrapper = document.createElement('div');
  this.dummyWrapper.style.width = '414px';
  this.dummyWrapper.style.height = '600px';
  this.dummyWrapper.style.overflow = 'hidden';
  this.dummyWrapper.style.position = 'relative';
  this.dummyWrapper.style.display = 'none';

  this.mainWrapper.appendChild(this.dummyWrapper);

//Start Menu--------------------------------------------------------------
  this.createStartMenu = function() {
    this.startMenu = document.createElement('div');
    this.startMenu.style.width = '414px';
    this.startMenu.style.height = '600px';
    this.startMenu.style.overflow = 'hidden';
    this.startMenu.style.margin = '20px auto';
    this.startMenu.style.fontSize = '100px';
    this.startMenu.style.fontWeight = 'bold';
    this.startMenu.style.color = 'blue';
    this.startMenu.style.textAlign = 'center';
    this.startMenu.innerHTML = "ROAD RAGE!!";
    this.mainWrapper.appendChild(this.startMenu);

//StartButton--------------------------------------------------------------
    this.startBtn = document.createElement('button');
    this.startBtn.style.width = '20%';
    this.startBtn.style.display = 'block';
    this.startBtn.innerHTML = '<strong>START GAME</strong>';
    this.startBtn.style.margin = '30px auto';
    this.startMenu.appendChild(this.startBtn);

//Start button function------------------------------------------------------
    this.startBtn.onclick = function () {
      that.startMenu.style.display = 'none';
      that.dummyWrapper.style.display = 'block';
      that.init();
    }
  }

//Game Over--------------------------------------------------------------
  this.createGameOverScreen = function() {
    this.gameOverScreen = document.createElement('div');
    this.gameOverScreen.style.width = '414px';
    this.gameOverScreen.style.height = '600px';
    this.gameOverScreen.style.overflow = 'hidden';
    this.gameOverScreen.style.margin = '20px auto';
    this.gameOverScreen.style.fontSize = '100px';
    this.gameOverScreen.style.fontWeight = 'bold';
    this.gameOverScreen.style.color = 'red';
    this.gameOverScreen.style.display = 'none';
    this.gameOverScreen.style.textAlign = 'center';
    this.gameOverScreen.style.position = 'absolute';
    this.gameOverScreen.innerHTML = 'GAME OVER';
    this.gameOverScreen.style.zIndex = '3';
    this.dummyWrapper.appendChild(this.gameOverScreen);
//Play Again Button--------------------------------------------------------------
    this.playAgainBtn = document.createElement('button');
    this.playAgainBtn.style.width = '20%';
    this.playAgainBtn.style.display = 'block';
    this.playAgainBtn.innerHTML = '<strong>Play Again</strong>';
    this.playAgainBtn.style.margin = '20px auto';
    this.playAgainBtn.style.zIndex = '3';
    this.gameOverScreen.appendChild(this.playAgainBtn);
//Play Again button function------------------------------------------------------
    this.playAgainBtn.onclick = function() {
      that.gameOverScreen.style.display = "none";
      while (that.dummyWrapper.hasChildNodes()) {
        that.dummyWrapper.removeChild(that.dummyWrapper.lastChild);
      }
      that.init();
    }
  }

  //Reset Button----------------------------------------------------------------
  this.resetBtn = document.createElement('button');
  this.resetBtn.style.width = '20%';
  this.resetBtn.style.display = 'block';
  this.resetBtn.innerHTML = '<strong>RESET GAME</strong>';
  this.resetBtn.style.margin = '40px auto';
  document.body.appendChild(this.resetBtn);

//Start button function------------------------------------------------------
  this.resetBtn.onclick = function() {
    if(that.flag != null){
      clearInterval(that.flag);
    }
    that.startMenu.style.display = "block";
    that.dummyWrapper.style.display = "none";
    while (that.dummyWrapper.hasChildNodes()) {
      that.dummyWrapper.removeChild(that.dummyWrapper.lastChild);
    }
  }

  this.obstacleArray = [];
  this.bulletArray = [];
  this.bulletLimit = 3;
  this.bulletCounter = 0;

//Initiating the world----------------------------------------------------
  this.init = function() {
    this.obstacleArray = [];
    this.bulletArray = [];
    this.bulletLimit = 3;
    this.bulletCounter = 0;
    var bgLimit = 0;
    var mainCar = new Car();
    this.createGameOverScreen();
    this.dummyWrapper.appendChild(mainCar.carImage);
    this.begin(bgLimit, mainCar);
//defining movement
    document.onkeydown = function(event) {
      if (event.keyCode == 37) {
        mainCar.move('left');
      } else if (event.keyCode == 39) {
        mainCar.move('right');
      } else if (event.keyCode == 32) {
        if (that.bulletCounter < that.bulletLimit) {
          var bullet = new Bullet(mainCar);
          that.bulletCounter++;
          bullet.addBullet(that.dummyWrapper);
          that.bulletArray.push(bullet);
        }
      }

// }else if(event.keyCode==40){
//  mainCar.move('top',);
// }else if(event.keyCode==38){
//  mainCar.move('bottom');
// }
    };
  }

//set Interval for moving background---------------------------------------
  this.begin = function(bgLimit, mainCar) {
    var counter = 0;
    this.flag = setInterval(function() {
      that.mainWrapper.style.backgroundPosition = '0px ' + bgLimit + 'px';
      bgLimit += 2;
      if (bgLimit > 828) {
        bgLimit = 0;
      }
//adding obstacle at 1.5 secs interval
      counter += 10;
      if (counter == 1000) {
        counter = 0;
        that.addObstacle();
      }

      that.moveCar(); //moving the obstacle cars
      that.obstacleCollision(mainCar); //removal of obstacle also in same function

      that.moveBullet();
      that.bulletCollision();
    }, 10);
  }

  this.addObstacle = function() {
    var obstacle = new Obstacle();
    this.dummyWrapper.appendChild(obstacle.objImage);
    this.obstacleArray.push(obstacle);
  }

//moving car
  this.moveCar = function() {
    var speed = 3;
    for (var i = 0; i < that.obstacleArray.length; i++) {
      that.obstacleArray[i].y += speed;
      that.obstacleArray[i].objImage.style.top = that.obstacleArray[i].y + 'px';
    }
  }

//moving bullet
  this.moveBullet = function() {
    for (var i = 0; i < that.bulletArray.length; i++) {
      that.bulletArray[i].moveBullet();
    }
  }

//game-over keydown function off--------------------------------------------------------
  this.gameOver = function() {
    document.onkeydown = null;
    that.gameOverScreen.style.display = 'block';
  }

//obstacle removal and collision detection-------------------------------------------------
  this.obstacleCollision = function(mainCar) {
    if (that.obstacleArray.length > 0) {
      if (that.obstacleArray[0].y > 600) {
        that.obstacleArray[0].removeObstacle(that.dummyWrapper);
        that.obstacleArray.splice(that.obstacleArray.indexOf(that.obstacleArray[0]), 1);
      } else {
        if (checkCollision(mainCar, that.obstacleArray[0], that.dummyWrapper)) {
          that.gameOver();
          clearInterval(that.flag);
        }
      }
    }
  }

//bullet removal and collision detection-------------------------------------------------
  this.bulletCollision = function() {
    if (that.bulletArray.length > 0) {
      if (that.bulletArray[0].y > 600) {
        that.bulletArray[0].removeBullet(that.dummyWrapper);
        that.bulletCounter--;
        that.bulletArray.splice(that.bulletArray.indexOf(that.bulletArray[0]), 1);
      } else {
        var bulletObstacleIndex = checkBulletCollision(that.bulletArray, that.obstacleArray);
        that.blastObstacle(bulletObstacleIndex[0], bulletObstacleIndex[1]);
      }
    }
  }

  this.blastObstacle = function(bulletIndex, obstacleIndex) {
    if ((bulletIndex != "no") && (obstacleIndex != "no")) {
      that.dummyWrapper.removeChild(that.bulletArray[bulletIndex].objImage);
      that.dummyWrapper.removeChild(that.obstacleArray[obstacleIndex].objImage);
      that.bulletCounter--;
      that.obstacleArray.splice(that.obstacleArray.indexOf(that.obstacleArray[obstacleIndex]), 1);
      that.displayBoom(bulletIndex);
    }
  }

  this.displayBoom = function(bulletIndex) {
    var left = parseInt(that.bulletArray[bulletIndex].left) - 40;
    var y = that.bulletArray[bulletIndex].y;
    var boom = new Explosion();
    boom.objImage.style.left = left + 'px';
    boom.objImage.style.bottom = (y + 30) + 'px';
    that.dummyWrapper.appendChild(boom.objImage);
    setTimeout(function() {
      that.dummyWrapper.removeChild(boom.objImage);
    }, 250);
    that.bulletArray.splice(that.bulletArray.indexOf(that.bulletArray[bulletIndex]), 1);
  }
}

var boom = new Explosion();

//Car Object---------------------------------------------------------------------------------------------------
function Car() {
  var that = this;
  this.position = ['54px', '161px', '265px']; //total position
  this.indexPosition = getRandomNumber(2, 0);
  this.left = this.position[this.indexPosition];
//Car IMAGE--------------------------------------------------
  this.carImage = document.createElement('img');
  this.carImage.src = 'car-yellow.png';
  this.carImage.style.width = '84px';
  this.carImage.style.height = '130px';
  this.carImage.style.position = 'absolute';
  this.carImage.style.zIndex = '2';
  this.carImage.style.bottom = '0px';
  this.carImage.style.left = this.left;

//movement for function---------------------------------------
  this.move = function(direction) {
    var prevPosition = this.indexPosition;
    if (direction == 'left') {
      this.indexPosition--;
      this.checkIndexPos();
    } else if (direction == 'right') {
      this.indexPosition++;
      this.checkIndexPos();
    }
    this.left = this.position[this.indexPosition];
    this.carImage.style.left = that.left;
  }

//checking boundary of road before moving-----------------------
  this.checkIndexPos = function() {
    if (this.indexPosition < 0) {
      this.indexPosition = 0;
    } else if (this.indexPosition > 2) {
      this.indexPosition = 2;
    }
  };
}


//Random number generator------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Objects------------------------------------------------------------------------------------------------------
function Obstacle() {
  var that = this;
  this.images = ['car-white.png', 'car-red.png', 'car-penguin.png'];
  this.carType = this.images[getRandomNumber(2, 0)];
  this.position = ['54px', '161px', '265px']; //total position
  this.indexPosition = getRandomNumber(2, 0);
  this.left = this.position[this.indexPosition];
  this.y = -130;
//Car IMAGE--------------------------------------------------
  this.objImage = document.createElement('img');
  this.objImage.src = this.carType;
  this.objImage.style.width = '84px';
  this.objImage.style.height = '130px';
  this.objImage.style.position = 'absolute';
  this.objImage.style.top = this.y + 'px';
  this.objImage.style.left = this.left;

  this.removeObstacle = function(dummyWrapper) {
    dummyWrapper.removeChild(this.objImage);
  }
}

function Explosion() {
  var that = this;
//BOOM IMAGE--------------------------------------------------
  this.objImage = document.createElement('img');
  this.objImage.src = 'boom.png';
  this.objImage.style.width = '130px';
  this.objImage.style.height = '150px';
  this.objImage.style.position = 'absolute';
  this.objImage.style.bottom = '0px';
  this.objImage.style.zIndex = '2';
}

function Bullet(mainCar) {
  var that = this;
  this.position = ['75px', '184px', '285px']; //total position
  this.indexPosition = mainCar.indexPosition;
  this.left = this.position[this.indexPosition];
  this.y = 90;
  this.dy = 3;
//Bullet IMAGE--------------------------------------------------
  this.objImage = document.createElement('img');
  this.objImage.src = 'bullet.png';
  this.objImage.style.width = '40px';
  this.objImage.style.height = '60px';
  this.objImage.style.position = 'absolute';
  this.objImage.style.bottom = this.y + 'px';
  this.objImage.style.left = this.left;
  this.objImage.style.zIndex = '2';

  this.removeBullet = function(dummyWrapper) {
    dummyWrapper.removeChild(this.objImage);
  }

  this.addBullet = function(dummyWrapper) {
    dummyWrapper.appendChild(this.objImage);
  }

  this.moveBullet = function() {
    this.y += this.dy
    this.objImage.style.bottom = this.y + 'px';
  }
}



//Check Collision
var checkCollision = function(mainCar, obstacle, dummyWrapper) {
  var topMainCar = 600 - 130;
  var botObstacle = parseInt(obstacle.objImage.style.getPropertyValue("top")) + 130;
  if ((topMainCar < botObstacle)) {
    if (mainCar.indexPosition == obstacle.indexPosition) {
      boom.objImage.style.left = mainCar.left;
      dummyWrapper.appendChild(boom.objImage);
      return true;
    }
  }
  return false;
}

//Check Bullet Collision
var checkBulletCollision = function(bullet, obstacle) {
  for (var i = 0; i < bullet.length; i++) {
    var topBullet = 600 - bullet[i].y;
    for (var j = 0; j < obstacle.length; j++) {
      var botObstacle = parseInt(obstacle[j].objImage.style.getPropertyValue("top")) + 130;
      if ((topBullet < botObstacle)) {
        if (bullet[i].indexPosition == obstacle[j].indexPosition) {
          return [i, j];
        }
      }
    }
  }
  return ["no", "no"];
}

//Game creeting world-----------------------------------------------------------------------------------------------
var createWorld = new World();
createWorld.createStartMenu();
/*var resetBtn=document.createElement('button');
 resetBtn.innerHTML='RESET';
 document.body.appendChild(resetBtn);*/

/*collision-->(rightA>leftB)&&(leftA<rightB)&&(bottomA>topB)&&(topA<bottomB)*/