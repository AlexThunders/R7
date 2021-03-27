"use strict";
//create table
const container = document.getElementById('container') 
const listOfTasks = ['coding','study','sport','English'];
const taskTable = document.createElement('div');
container.appendChild(taskTable);

let tr;
let table = '<table>';
let row = `<tr><td>№</td><td>task</td><td>time</td><td>done</td></tr>`;
table += row;
for(let i = 0; i < listOfTasks.length; i++) {
  table += `<tr><td>${i+1}</td><td>${listOfTasks[i]}</td><td></td><td></td></tr>`;
}
table += '</table>';
taskTable.innerHTML = table;
//add inputs to rows
let allRows = Array.from(document.getElementsByTagName('tr'));
allRows.forEach(row => {
  //exclude first row
  if(allRows.indexOf(row) === 0) return
  let inp = document.createElement('input');
  inp.setAttribute('type','checkbox');
  row.lastChild.appendChild(inp);
  let inpHours = document.createElement('input');
  inpHours.setAttribute('type','text');
  row.childNodes[2].appendChild(inpHours);
  inpHours.style.setProperty('width','100%');
  inpHours.style.setProperty('height','100%');
  inpHours.style.setProperty('border','none');
})
let tbl = document.querySelector('table');
tbl.classList.add('table1');

//create save button
let button = document.createElement('button');
button.innerText = 'Save';
container.appendChild(button);
//create button to choose specific date
let button2 = document.createElement('button');
button2.innerText = 'Set date';
button2.innerText = 'Change date';
container.appendChild(button2);

//create calendar
const calendar = document.createElement('div');
container.appendChild(calendar);
calendar.classList.add('calendar');
let arr = [];
for(let i = 1; i < 36; i++) {
  let date = document.createElement('div');
  date.textContent = i;
  if(i > 31) {
    date.textContent = '';
  }
  calendar.appendChild(date);
}

const allDates = Array.from(document.querySelectorAll('.calendar div'));
const allCheckBoxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
const allHoursInputs = Array.from(document.querySelectorAll('input[type=text]'));
const allDivs = document.querySelectorAll('.calendar div');

let today;
let reset = false;
if(reset === false) {
  today = new Date().getDate();
  today = today.toString();
}

//choose specific date
button2.addEventListener('click', () => {
  if(reset === false) {
    allDivs.forEach(div => {
      div.addEventListener('click', () => {
        today = div.childNodes[0].textContent;
        div.style.color = 'red';
        reset = true;
      })
    })
  }
})

function addInfo() {
  allDates.forEach(date => {
    let localItems = JSON.parse(localStorage.getItem('myArr'));
    if(localItems !== undefined && localItems !== null) {
      localItems.forEach(item => {
        if(item.day == date.textContent) {
          date.style.setProperty('--red', item.red);
          date.style.setProperty('--blue', item.blue);
          date.style.setProperty('--green', item.green);
        }
      })
    }
  })
}

//add objects to local storage
button.addEventListener('click', () => {
  allDates.forEach(date => {
    if(date.textContent.includes(today)) {
      let dayInfo = {
        day: today,
        red: 255,
        blue: 255,
        green: 255
      } 
      allCheckBoxes.forEach(box => {
        if(box.checked) {
          dayInfo.red -= 85;
          dayInfo.blue -= 85;
          //asign hours to new properties which are equal to task names
          let property = box.parentNode.parentNode.childNodes[1].innerText;
          dayInfo[`${property}`] = box.parentNode.previousSibling.childNodes[0].value;
          if(box.parentNode.previousSibling.childNodes[0].value === '') {
            dayInfo[`${property}`] = '1';
            }
          }
      })
      if(allCheckBoxes.every(box => box.checked)) {
          dayInfo.red = 180;
          dayInfo.blue = 235;
          dayInfo.green = 159;
        }
      let mainArray = JSON.parse(localStorage.getItem('myArr'));
      if(mainArray === undefined || mainArray === null) {
        mainArray = [];
        mainArray.push(dayInfo);
        localStorage.setItem('myArr', JSON.stringify(mainArray));
      } else {
        //make overwrite the same day in array to prevent copy of same dates
        mainArray.map(item => {
          if(item.day === today) {
            let itm = mainArray.splice(mainArray.indexOf(item),1);
            itm = dayInfo;
          } 
        })
        mainArray.push(dayInfo);
        localStorage.setItem('myArr', JSON.stringify(mainArray));
      }
    }
  })
  location.reload()
  addInfo();
});

addInfo();

//add cards when hover over dates
allDivs.forEach(div => {
    let card = document.createElement('div');
    card.classList.add('card');
    div.appendChild(card);
    let name = document.createElement('h4');
    name.textContent = div.innerText;
    card.appendChild(name);
    let localArr = JSON.parse(localStorage.getItem('myArr'));
    if(localArr !== null && localArr !== undefined) {
      localArr.forEach(item => {
        if(item.day === div.childNodes[0].textContent) {
          let keys = Object.keys(item);
          keys.some(key => {
            if(key === 'study') {
              let studyPar = document.createElement('p')
              studyPar.innerText = `Study: ${item.study}`;
              card.appendChild(studyPar) 
            } 
            if(key === 'coding') {
              let codePar = document.createElement('p')
              codePar.innerText = `Coding: ${item.coding}`;
              card.appendChild(codePar) 
            }
            if(key === 'sport') {
              let sportPar = document.createElement('p')
              sportPar.innerText = `Work out: ${item.sport}`;
              card.appendChild(sportPar) 
            }
            if(key === 'English') {
              let englishPar = document.createElement('p')
              englishPar.innerText = `English: ${item.English}`;
              card.appendChild(englishPar) 
            }
          })  
        }
      })
    }
})

//don't show empty cards
const allInfoCards = document.querySelectorAll('.card');
allInfoCards.forEach(card => {
  if(!card.childNodes[1]) {
    card.style.display = 'none';
  }
})

//CLOCK
const secondsHand = document.querySelector('.seconds');
const minutesHand = document.querySelector('.minutes');
const hoursHand = document.querySelector('.hours');

setInterval(setClock, 1000);

function setClock() {
  let currentTime = new Date();
  let secondsCoefficient = currentTime.getSeconds() / 60;
  let minutesCoefficient = (secondsCoefficient + currentTime.getMinutes()) / 60;
  let hoursCoefficient = (minutesCoefficient + currentTime.getHours()) / 12;
  setRotation(secondsHand, secondsCoefficient);
  setRotation(minutesHand, minutesCoefficient);
  setRotation(hoursHand, hoursCoefficient);
}

function setRotation(hand, coefficient) {
  hand.style.setProperty('--rotation', coefficient * 360);
}

setClock();