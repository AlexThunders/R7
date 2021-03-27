document.addEventListener('DOMContentLoaded', () => {

let cards = Array.from(document.querySelectorAll('.card'));
let firstCard, secondCard;
cards.forEach(card => card.addEventListener('click', flip));
let flipped = false; 

let timer;
let time = 0;

function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 10);
    card.style.order = rand;
  })
  setTimeout(() => {
    timer = setInterval(() => {
      console.log(time++);
      time++;
    },1000)
  },4000)
}

function flip() {
  //stop flipping after two cards are turned
  if(flipped) return;
  //add class to cards you click
  this.classList.add('flip');
  let allFlipped = document.querySelectorAll('.flip');
  if(this === firstCard) return
  //length shows that only one or two cards are flipped
  if(allFlipped.length === 1) {
    firstCard = this;
  }
  if(allFlipped.length === 2) {
    secondCard = this;
    flipped = true;
    checkMatch();
  } 
}

function checkMatch() {
  //compare html data values of two open cards
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? setTimeout(fixFlipped, 1000) : setTimeout(unflip, 1500);
}

let checkAll;

function checkResult() {
  if(checkAll) {
    game.appendChild(congrats);
    clearInterval(timer);
    time = time / 2;
    timeresult.textContent = `Your time is ${time}`;
  }
}

function fixFlipped() {
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  firstCard.classList.add('turned');
  secondCard.classList.add('turned');
  firstCard.style.transform = "rotateY(180deg)";
  secondCard.style.transform = "rotateY(180deg)";
  flipped = false;
  checkAll = cards.every(card => card.classList.contains('turned'));
  checkResult();
}

function unflip() {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  //allow continue clicking
  flipped = false;
}

//ADD MICHAEL
let start = document.querySelector('#start');
let michael;
let instruction = document.getElementById('instruction');

function startGame() {
  shuffle();
  michael = document.createElement('img');
  michael.setAttribute('src','./tenor.gif');
  michael.classList.add('michael');
  instruction.appendChild(michael);
  setTimeout(() => {
    instruction.style.display = 'none';
    michael.remove();
  },3500)
}

start.addEventListener('click', () => {
  startGame();
})

document.addEventListener('keydown', event => {
  if(event.keyCode === 27) {
    let m = document.querySelector('.michael')
    if(m === null || m !== undefined) {
      setTimeout(() => {
        instruction.style.display = 'flex';
        clearInterval(timer);time = 0;
        cards.forEach(card => card.classList.remove('flip'));
      },100)
    }
  }
})

//ADD CONGRATS IF ALL CARDS ARE FLIPPED
let game = document.querySelector('.memory-game');
let congrats = document.createElement('div');
congrats.classList.add('congrats');

let congratsPar = document.createElement('h2');
congratsPar.textContent = "Congrats";
congrats.appendChild(congratsPar);

let timeresult = document.createElement('p');
congrats.appendChild(timeresult);

let playAgain = document.createElement('button');
playAgain.textContent = "play again";
congrats.appendChild(playAgain);
playAgain.addEventListener('click', () => {
  location.reload();
  // congrats.remove();
  // time = 0;
  // let turnedCards = Array.from(document.querySelectorAll('.turned'));
  // turnedCards.forEach(card => {
  //   card.classList.remove('turned');
  //   card.style.transform = "rotateY(0deg)";
  //   card.addEventListener('click', flip);
  // })
  // startGame();
})

let goHome = document.createElement('button');
goHome.textContent = "home page";
congrats.appendChild(goHome);
goHome.addEventListener('click', () => {
  location.href = "https://alexthunders.ru";
})


})