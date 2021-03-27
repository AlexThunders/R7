import {currentEndGameLang} from '../multiLang.js'

"use strict";
const body = document.getElementsByTagName("BODY")[0]
const instruction = document.getElementById('instruction');
const hideInstructionbtn = document.getElementById('startGame');

const field = document.querySelector('.field');
let tank = document.querySelector('.myOwn');
let gun =  document.querySelector('.mygun');
let enemy = document.querySelector('.enemy');
const allCanons = document.querySelectorAll('.cannon');
let endOfGame = true;
let explosionPosition;
let cannonGuns = document.querySelectorAll('.cannon-gun');
const allTowers = document.querySelectorAll('.cannon-tower');
let randomTowerRotation;
const wind = document.getElementById('clouds');
const backHomeDiv = document.createElement('div');
const continuePar = document.createElement('div');
const bachHomeLink = document.createElement('a');
let input = document.getElementById('inp');
let score = 0;
let bestGamer;
let bestResult;
let player; 
let scoreRep = JSON.parse(localStorage.getItem('scores'));
let startButton = document.createElement('button');

//make sure, screen is big enough
let width = screen.width
let height = screen.height

function checkScreen() {
  if(width < 700 || height < 450) {
    let info = document.createElement('p');
    info.className += 'info';
    info.innerHTML = 'Please use bigger screen to play this game' +  '<br>' +
    '<br>' + 'PC or big tablet are best suited'
    body.appendChild(info)
    let homeLink = document.createElement('a');
    homeLink.className += 'homeLink';
    homeLink.href = `..\\..\\index.html`;
    homeLink.textContent = "Home";
    body.appendChild(homeLink)
    field.style.setProperty('display','none');
    startButton.style.setProperty('display','none');
  }
}
checkScreen();

//pause the game//go to home page
document.addEventListener('keyup', event => {
  if(event.keyCode === 27 && endOfGame === false) {
    endOfGame = true;
    backHomeDiv.classList.add('backHomeDiv');
    bachHomeLink.href = `..\\..\\index.html`;
    bachHomeLink.textContent = currentEndGameLang.escHome ;
    backHomeDiv.appendChild(bachHomeLink);
    field.appendChild(backHomeDiv);
    //continue button
    continuePar.textContent = currentEndGameLang.escContinue;
    continuePar.classList.add('continuePar');
    backHomeDiv.appendChild(continuePar);
  }
  else if(event.keyCode === 27 && endOfGame === true) {
    endOfGame = false;
  backHomeDiv.remove();
  continuePar.remove();
  bachHomeLink.remove();
  let allClones = document.querySelectorAll('.cln1');
  allClones.forEach(cln => {
    cln.style.animationPlayState = 'running';
  })
  }
})
//continue game after pause
continuePar.addEventListener('click', () => {
  endOfGame = false;
  backHomeDiv.remove();
  continuePar.remove();
  bachHomeLink.remove();
  let allClones = document.querySelectorAll('.cln1');
  allClones.forEach(cln => {
    cln.style.animationPlayState = 'running';
  })
})

//start button
function createStartBtn() {
  startButton.textContent = currentEndGameLang.startBtn;
  document.body.appendChild(startButton);
  startButton.classList.add('start');
  startButton.addEventListener('click', () => {
    endOfGame = false;
    tank.classList.remove('hidden');
    startButton.style.opacity = 0;
    allCanons.forEach(cannon => {
      cannon.classList.remove('hidden')
    });
  });
}

//LET'S GO BUTTON
hideInstructionbtn.addEventListener('click', () => {
  createStartBtn();
  instruction.style.display = "none"
//////////////////add scores array to local storage
  if(scoreRep === null) {
    scoreRep = [];
    localStorage.setItem('scores',JSON.stringify(scoreRep));
  }
  player = {
    playerName: input.value,
    date: new Date().toLocaleDateString(),
    score: 0
  }
  let allScores = JSON.parse(localStorage.getItem('scores'));
  if(allScores !== null) {
    allScores.push(player);
    localStorage.setItem('scores',JSON.stringify(allScores))
  }
})

//make gradually appear elements which are already created by html 
if(endOfGame === true) {
  tank.classList.add('hidden');
  allCanons.forEach(cannon => {
    cannon.classList.add('hidden')
  });
} 

//add sounds via constructor
function Sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = () => this.sound.play();
  this.stop = () => this.sound.pause();
}

let blast = new Sound('BlastdB.mp3');
let explosion = new Sound('explosion.mp3');

//create a class for all Tank's functions
class Tank {
  constructor(tank, gun){
    this.tank = tank;
    this.gun = gun;
    this.shell;
    this.rotatePseudo = 0;
  }
  get fire() {
    this.shell = document.createElement('div');
    this.gun.appendChild(this.shell);
    //get coordinates of the specific place where this shell is created, e.g. on the tank's gun    
    let shotPointX = Math.round(this.shell.getBoundingClientRect().x);
    let shotPointY = Math.round(this.shell.getBoundingClientRect().y);
    //create a pseudoGun to place it on the spot of real gun, to make possible tie shell to specific place on the field and not bide it with real gun. In this case you can move tank but shell will move from the spot where you made the shoot.    
    let pseudoGun = document.createElement('div');
    pseudoGun.classList.add('pseudogun')
    //set coordinates of the pseudoGun the same as coordinates of place where shell is created
    pseudoGun.style.top = shotPointY;
    pseudoGun.style.left = shotPointX;
    //rotate pseudoGun in accordane with tank rotation. pseudoGun is appended to body!not to the tank!    
      let currentRotation =
      parseFloat(getComputedStyle(this.gun, null).getPropertyValue('--rotation'));
      if(this.rotatePseudo === 180) {
        currentRotation += 180; 
      }
      else if(this.rotatePseudo === 90) {
        currentRotation += 90;
      }
      pseudoGun.style.setProperty('--rotation', currentRotation + 'deg')
      document.body.appendChild(pseudoGun);
      pseudoGun.appendChild(this.shell);
      this.shell.classList.add('shell');
      //play sound
      if(this.gun.classList.contains('mygun')) {
            blast.play()
        }
      setTimeout(() => {
        this.shell.classList.add('fire');
        setTimeout(() => pseudoGun.remove(),2500)
      },100)
    }

  get removePreviousShell() {
    let allShells = document.querySelectorAll('.shell');
    setTimeout(() => {
  allShells.forEach(shell => {
    shell.classList.remove('fire');
    shell.classList.remove('shell');
    //run next code after shell has finished it's "fly":
    if(!shell.classList.contains('fire')) {
      if(this.gun.classList.contains('mygun')) {
        explosion.play();
      }
      shell.classList.add('explosion');
      //get coordinates of an explosion to compare them with enemy's coordinates
      let explosionX = Math.round(shell.getBoundingClientRect().x);
      let explosionWidth = Math.round(shell.getBoundingClientRect().width);
      let explosionY = Math.round(shell.getBoundingClientRect().y);
      let explosionHeight = Math.round(shell.getBoundingClientRect().height);
      //explosionPosition has global scope to be available for FindTarget class
      explosionPosition = {
        x: explosionX,
        width: explosionWidth,
        y: explosionY,
        height: explosionHeight
      }
      //when the shell has finished it's 'fly' check if hit the enemy
      findTank.checkIfHitTarget;
      findMyTank.checkIfHitTarget;
      //when the shell has finished it's 'fly' check if hit every clone
      let allClones = document.querySelectorAll('.cln1');
      allClones.forEach(clone => {
        let findClone = new FindTarget(clone)
        findClone.checkIfHitTarget;
      })
      //remove every shel after fire/explosion ended          
      shell.addEventListener('animationend', () => {
          shell.remove()
        })
      }
    })
  },1250)//check when "transition of fire" ends
  }

  get makeShoot() {
    this.fire;
    this.removePreviousShell;
  }
  rotateLeft() {
    let currentRotation = 
      getComputedStyle(this.gun, null).getPropertyValue('--rotation');
      currentRotation = parseFloat(currentRotation);
      currentRotation -= 3;
      this.gun.style.setProperty('--rotation', currentRotation + 'deg');     
    }
  rotateRight() {
    let currentRotation =
    getComputedStyle(this.gun, null).getPropertyValue('--rotation');
    currentRotation = parseFloat(currentRotation);
    currentRotation += 3;
    this.gun.style.setProperty('--rotation', currentRotation + 'deg')
  }

  getTanksPosition() {
    //get positions to stop tank move beyond the field
    this.fieldBorder = field.getBoundingClientRect()
    this.leftBorder = Math.round(this.fieldBorder.left)
    this.rightBorder = Math.round(this.fieldBorder.right) 
    this.topBorder = Math.round(this.fieldBorder.top)
    this.bottomBorder = Math.round(this.fieldBorder.bottom)

    this.tanksBoundaries = this.tank.getBoundingClientRect()
    this.leftTank = Math.round(this.tanksBoundaries.left)
    this.rightTank = Math.round(this.tanksBoundaries.right) 
    this.topTank = Math.round(this.tanksBoundaries.top)
    this.bottomTank = Math.round(this.tanksBoundaries.bottom)
    this.tanksWidth = Math.round(this.tanksBoundaries.width)
  }

  moveRight() {
    this.getTanksPosition()
    if(this.rightTank > this.rightBorder) {
      this.moveLeft();
      return
    }
    this.tank.style.transform = 'rotate(90deg) scale(2)';
    let leftPosition = 
    parseFloat(getComputedStyle(this.tank,null).getPropertyValue('--left'));
    leftPosition += 25;
    this.tank.style.setProperty('--left', leftPosition);
    this.rotatePseudo = 90;
  }
  moveLeft() {
    this.getTanksPosition()
    if(this.leftTank < this.leftBorder) {
      this.moveRight();
      return
    }
    this.tank.style.transform = 'rotate(90deg) scale(2)';
    let leftPosition = 
    parseFloat(getComputedStyle(this.tank,null).getPropertyValue('--left'));
    leftPosition -= 25;
    this.tank.style.setProperty('--left', leftPosition);
    this.rotatePseudo = 90;
  }
  moveUp() {
    this.getTanksPosition()
    if(this.topTank < this.topBorder) {
      this.moveDown();
      return
    }
    this.tank.style.transform = 'rotate(180deg) scale(2)';
    let leftPosition = 
    parseFloat(getComputedStyle(this.tank,null).getPropertyValue('--top'));
    leftPosition -= 25;
    this.tank.style.setProperty('--top', leftPosition);
    this.rotatePseudo = 180;
  }
  moveDown() {
    this.getTanksPosition()
    if(this.bottomTank > this.bottomBorder) {
      this.moveUp();
      return
    }
    this.tank.style.transform = 'rotate(180deg) scale(2)';
    let leftPosition = 
    parseFloat(getComputedStyle(this.tank,null).getPropertyValue('--top'));
    leftPosition += 25;
    this.tank.style.setProperty('--top', leftPosition);
    this.rotatePseudo = 180;
  }
}

let mainTank = new Tank(tank,gun);
  
//fire button and all moves
  document.addEventListener('keyup', fire)
  function fire(event) {
    if(event.keyCode === 32 && endOfGame === false) {
      mainTank.makeShoot;
    }
    if(event.keyCode === 39 && endOfGame === false) {
      mainTank.moveRight();
    }
    if(event.keyCode === 37 && endOfGame === false) {
      mainTank.moveLeft();
    }
    if(event.keyCode === 38 && endOfGame === false) {
      mainTank.moveUp();
    }
    if(event.keyCode === 40 && endOfGame === false) {
      mainTank.moveDown();
    }
  }
  document.addEventListener('keydown', rotate)
  function rotate(event) {
    if(event.keyCode === 90 && endOfGame === false) {
      mainTank.rotateLeft();
    }
    if(event.keyCode === 67 && endOfGame === false) {
      mainTank.rotateRight();
    }
  }

let scoresArr = [];
//GAME OVER
function gameOver() {
  tank = document.querySelector('.myOwn');
  if(!tank) {
    //when there is no main tank, e.g. main one is hit, stop all movements of enemies
    endOfGame = true;
    let allClns = document.querySelectorAll('.cln1');
    allClns.forEach(cln => cln.style.animationPlayState = 'paused');
    enemy.style.animationPlayState = 'paused';
    //add game over sign
    let signGameOver = document.createElement('div');
    signGameOver.classList.add('gameOver');
    field.appendChild(signGameOver);
    signGameOver.addEventListener('animationend', () => {
      let gameOverTxt = document.createElement('h2');
      gameOverTxt.textContent = currentEndGameLang.gameOverH2;
      signGameOver.appendChild(gameOverTxt);
      //add score to the sign 
      let parScore = document.createElement('p');
      parScore.textContent = currentEndGameLang.gameOverP + score; 
      signGameOver.appendChild(parScore); 
      //////////////////add scores to local storage
      let allScores = JSON.parse(localStorage.getItem('scores'));
      let bestScore = document.createElement('p');
      signGameOver.appendChild(bestScore); 
      
      player = {
        playerName: input.value,
        date: new Date().toLocaleDateString(),
        score: score
      }
      allScores.forEach(player => {
        if(player.playerName === input.value) {
          //overwrite obeject in storage with the same player names
          let gamer = allScores.splice(allScores.indexOf(player),1);
          gamer = player;
        } 
      })
      allScores.push(player);
      localStorage.setItem('scores',JSON.stringify(allScores))

      allScores = JSON.parse(localStorage.getItem('scores'));
      allScores.forEach(player => {
        scoresArr.push(player.score)
        let maxScore = Math.max.apply(null, scoresArr);
          if(player.score === maxScore) {
            bestGamer = player.playerName
            bestResult = player.score
            bestScore.innerText =
            currentEndGameLang.gameOverBestPlayerTxt1 +  bestGamer +
            currentEndGameLang.gameOverBestPlayerTxt2 + bestResult + 
            currentEndGameLang.gameOverBestPlayerTxt3;
          }
      })

      //add button 'play again'
      let replayBtn = document.createElement('button');
      replayBtn.textContent = currentEndGameLang.replayBtn;
      replayBtn.classList.add('replayBtn');
      signGameOver.appendChild(replayBtn);
      replayBtn.addEventListener('click', () => {
        signGameOver.remove();
        allClns.forEach(cln => cln.remove());
        endOfGame = false;
        startGame();
      })
    })
  }
}

function startGame() {
  if(!tank && endOfGame === false) {
    //if there is no main tank, reset the score and create new mainTank
    score = 0;
    tank = document.createElement('div');
    tank.classList.add('tank');
    tank.classList.add('myOwn');
    let cabin = document.createElement('div');
    cabin.classList.add('cabin');
    tank.appendChild(cabin);
    gun = document.createElement('div');
    gun.classList.add('gun');
    gun.classList.add('mygun');
    tank.appendChild(gun);
    field.appendChild(tank);
    //set up objects again:
    mainTank = new Tank(tank,gun);
    findMyTank = new FindTarget(tank);
  }
}

class FindTarget {
  constructor(target) {
    explosionPosition;
    this.hit = target;
    this.x;
    this.y;
    this.width;
    this.height;
  }
  get checkIfHitTarget() {
    this.x = Math.round(this.hit.getBoundingClientRect().x);
    this.width = Math.round(this.hit.getBoundingClientRect().width);
    this.y = Math.round(this.hit.getBoundingClientRect().y);
    this.height = Math.round(this.hit.getBoundingClientRect().height);
    if(explosionPosition.x + explosionPosition.width / 2 > this.x && explosionPosition.x + explosionPosition.width / 2 < this.x + this.width && explosionPosition.y + explosionPosition.height / 2 > this.y && explosionPosition.y + explosionPosition.height / 2 < this.y + this.height){
      //add score:
      let allClones = document.querySelectorAll('.cln1');
      allClones.forEach(cln => {
        if(this.hit === cln || this.hit === enemy) {
          score++;
        }
      })
      this.hit.remove();
      //make fire-animation and small destroyed version of enemy when you hit enemy at that specific spot
      let explodedTank = document.createElement('div');
      let destroyedTank = document.createElement('div');
      document.body.appendChild(explodedTank)
      document.body.appendChild(destroyedTank)
      explodedTank.classList.add('onFire');
      destroyedTank.classList.add('burningTank');
      //place animation and destroyed tank at the center where an enemy was hit
      explodedTank.style.left = this.x + this.width / 2;
      explodedTank.style.top = this.y + this.height / 2;
      destroyedTank.style.left = this.x + this.width / 2;
      destroyedTank.style.top = this.y + this.height / 2;
      explodedTank.addEventListener('animationend', () => {
        explodedTank.remove();
        destroyedTank.remove();
        gameOver();
        //invoke gameOver to check if the main tank got hit 
      })
    }
  }
}

let findTank = new FindTarget(enemy);
let findMyTank = new FindTarget(tank);

class EnemyTank extends Tank {
  constructor(tank, gun) {
    super(tank, gun)
    this.rotatePseudo = 120;
    this.currentRotation;
    this.resetRotation = false;
  } 
  //make rotation of clone-tanks in both directions via resetRotation
  rotateLeft() {
    if(this.resetRotation === true && endOfGame === false) {
      this.currentRotation = 
      getComputedStyle(this.gun, null).getPropertyValue('--rotation');
      this.currentRotation = parseFloat(this.currentRotation);
      this.currentRotation -= 5;
      this.gun.style.setProperty('--rotation', this.currentRotation + 'deg');  
      if(this.currentRotation <= 160) {
        this.resetRotation = false;
      }
    }
  }
  rotateRight() {
    if(this.resetRotation === false && endOfGame === false) {
      this.currentRotation =
      getComputedStyle(this.gun, null).getPropertyValue('--rotation');
      this.currentRotation = parseFloat(this.currentRotation);
      this.currentRotation += 5;
      this.gun.style.setProperty('--rotation', this.currentRotation + 'deg');
      if(this.currentRotation >= 210) {
        this.resetRotation = true;
        setInterval(() => this.rotateLeft(), 1000);
      }
    }
  }
} 
//create clones of enemy tank
setInterval(() => {
  if(endOfGame === false) {
    let cln = enemy.cloneNode(true);
    cln.classList.add('cln1');
    //set max amount of clones to 10
    let allClones = document.querySelectorAll('.cln1');
    if(allClones.length > 10) return
    field.appendChild(cln);
    cln.style.animationPlayState = 'running';
  } else  {
    let allClones = document.querySelectorAll('.cln1');
    allClones.forEach(cln => {
      cln.style.animationPlayState = 'paused';
    })
  }
},8000)

setInterval(() => {
  if(endOfGame === false) {
    const allClns = document.querySelectorAll('.cln1');
    allClns.forEach(cln => {
      gun = cln.childNodes[3];
      //make sure myGun will not shoot automaticly like clones
      if(!gun.classList.contains('mygun')) {
        let cloneEnemy = new EnemyTank(cln,gun);
        cloneEnemy.makeShoot;
        cloneEnemy.rotateRight();
      }
    })
  }
},500)
/////////////////////////////////CANNONS
class Cannon {
  constructor() {
    this.gun;
    this.shell;
    this.blast;
  }
  cannonShoot() {
    return new Promise((resolve, reject) => {
      cannonGuns.forEach(gun => {
        this.shell = document.createElement('div');
        gun.appendChild(this.shell);
        //prevent shells multiply themselves when relocate temporary to another page/ browser tab:
        if(gun.childNodes.length > 1) {
          this.shell.remove()
        }
        let randDistance = Math.floor(Math.random() * (600 - 50)) + 50;
        this.shell.style.setProperty('--transY', '-' + randDistance + 'px');
        this.shell.classList.add('cannonShell');
        this.shell.addEventListener('animationend', () => {
          resolve();
        });
      })
    });
  }

  checkIfHit() {
    cannonGuns.forEach(gun => {
      this.shell = gun.childNodes[0];
      //get coordinates of the spot this.shell has ended fly
      let explosionX = Math.round(this.shell.getBoundingClientRect().x);
      let explosionWidth = Math.round(this.shell.getBoundingClientRect().width);
      let explosionY = Math.round(this.shell.getBoundingClientRect().y);
      let explosionHeight = Math.round(this.shell.getBoundingClientRect().height);
      //explosionPosition has global scope to be available for FindTarget class
      explosionPosition = {
        x: explosionX,
        width: explosionWidth,
        y: explosionY,
        height: explosionHeight
      }
      //when the shell has finished it's 'fly' check if it's hit my tank
      findMyTank.checkIfHitTarget;
    });
  }

  rotateTower() {
    allTowers.forEach(tower => {
      if(tower.classList.contains('tower1')) {
        randomTowerRotation = Math.floor(Math.random() * (160 - 90)) + 90;
        tower.style.setProperty('--rotationC', randomTowerRotation + 'deg');
      }
      if(tower.classList.contains('tower2')) {
        randomTowerRotation = Math.floor(Math.random() * (280 - 250)) + 250;
        tower.style.setProperty('--rotationC', randomTowerRotation + 'deg');
      }
      if(tower.classList.contains('tower3')) {
        randomTowerRotation = Math.floor(Math.random() * (270 - 170)) + 170;
        tower.style.setProperty('--rotationC', randomTowerRotation + 'deg');
      }
    });
  }

  explodeCannonShell() {
    return new Promise((resolve, reject) => {
      cannonGuns.forEach(gun => {
        this.blast = document.createElement('div');
        gun.childNodes[0].appendChild(this.blast);
        gun.childNodes[0].style.opacity = 0;
        this.blast.classList.add('cannonShellExplosion');
        this.blast.addEventListener('animationend', () => {
          resolve(gun.childNodes[0].remove());
        });
      })
    })
  }
}

let cannon = new Cannon();

setInterval(initFire, 2500)

async function initFire() {
  if(endOfGame === false) {
    await cannon.cannonShoot();
    cannon.checkIfHit();
    await cannon.explodeCannonShell();
    cannon.rotateTower();
  }
}