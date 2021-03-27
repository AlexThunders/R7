"use strict";
const leftSec = document.querySelector('.left');
const rightSec = document.querySelector('.right');
const midSec = document.querySelector('.middle');
const leftPar = document.querySelector('#leftPar');

//food API
const mealInput = document.getElementById('meal-input');
const searchMealBtn = document.getElementById('search-meal');
const foodPics = document.getElementById('food-holder');
let mealID;
let resRecit = document.createElement('p');
let recipeHeader;

const cyrillicPattern = /^[\u0400-\u04FF]+$/;
const numbers = /^(?!(?:15|21|532|0+)$)\d{1,4}$/;
const russianNames = document.createElement('div');
russianNames.innerHTML = '<h2>' + 'Вводите только английские буквы' + '</h2>';
russianNames.classList.add('russian');

function getFoodInfo() {
  let meal = mealInput.value;                
  if(cyrillicPattern.test(meal) || numbers.test(meal)) {
    midSec.appendChild(russianNames);
    russianNames.addEventListener('click',() => {
      russianNames.remove();
    })
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  .then(response => response.json())
  .then(data => {
  console.log(data);
  //add every picture to food-holder 
  data.meals.map(meal => {
    let image = document.createElement('img');
    image.setAttribute('src', `${meal.strMealThumb}`);
    let div = document.createElement('div');
    div.appendChild(image);
    //add strMeal to every meal
    let mealName = document.createElement('h5');
    mealName.textContent = `${meal.strMeal}`;
    div.appendChild(mealName);
    //add idMeal
    mealID = meal.idMeal;
    div.setAttribute('id', `${meal.idMeal}`)
    foodPics.appendChild(div);
  })
  chooseFoodToAddToCard()
})
.catch(err => {
	console.log(err)
});
}

function removePreviousPictures() {
  let allOpenedPics = document.querySelectorAll('#food-holder div');
  let allChoosenPics = document.querySelectorAll('#food-holder img');
  let allinstructions = document.querySelectorAll('#food-holder p');
  let instructionTitle = document.querySelectorAll('#food-holder h3');
  allOpenedPics.forEach(div => div.remove())
  allChoosenPics.forEach(img => img.remove())
  allinstructions.forEach(par => par.remove())
  instructionTitle.forEach(header => header.remove())
}

function getinstruction() {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(response => response.json())
  .then(data => {
    removePreviousPictures();
    //create single image, name for it and instruction
    let instruction = data.meals[0].strInstructions;
    let image = document.createElement('img');
    image.setAttribute('src', `${data.meals[0].strMealThumb}`);
    image.style.opacity = '1';
    image.style.transform = 'scale(.8)';
    //create name for instruction
    let title = document.createElement('h3');
    title.textContent = data.meals[0].strMeal; 
    //create instruction
    let par = document.createElement('p');
    par.textContent = instruction;
    //show instruction in food-holder
    foodPics.appendChild(image);
    foodPics.appendChild(title);
    foodPics.appendChild(par);

    let recipe 
    let allIngredients = [];
    let allMeasures = [];
    let filterOneArr = [];

    for(let strIng in data.meals[0]) {
      if(strIng.slice(0,13) === 'strIngredient') {
        allIngredients.push(strIng)
      }
      if(strIng.slice(0,10) === 'strMeasure') {
        allMeasures.push(strIng)
      }
    }
    recipeHeader = document.createElement('h2');
    recipeHeader.innerText = 'Recipe';
    recipeHeader.classList.add('recipeHeader');
    recipeHeader.setAttribute('data','recipeH2');
    leftSec.appendChild(recipeHeader);

    allIngredients.forEach(ingredient => {
      let ing = document.createElement('span');
      allMeasures.forEach(measure => {
        if(data.meals[0][ingredient] === "") return
        if(ingredient.slice(13) === measure.slice(10)) {
          ing.innerHTML =
           data.meals[0][ingredient] + '-' + data.meals[0][measure] + '.' + '<br>';
        }
      })
      resRecit.appendChild(ing);
    })
    leftSec.appendChild(resRecit);
  })
  .catch(err => {
    console.log(err)
  })
}

function chooseFoodToAddToCard() {
  let allOpenedPics = document.querySelectorAll('#food-holder div');
  allOpenedPics.forEach(div => {
    div.addEventListener('click', () => {
      //remove previous recipe when click new meal along with header
      resRecit.innerText = "";
      if(recipeHeader) {
        recipeHeader.remove();
      }
      if(leftSec.childNodes[5]) {
        leftSec.childNodes[5].remove()
      }
      mealID = div.getAttribute('id');
      getinstruction();
    });
  })
}

searchMealBtn.addEventListener('click', () => {
  if(mealInput.value !== '') {
    if(foodPics.childNodes.length > 0) {
      removePreviousPictures();
    }    
      getFoodInfo();
  } else {
    alert('fill the input')
  }
})
