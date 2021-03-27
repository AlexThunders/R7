export {newLang}

//change button's value when you click it
let homeBtn = {
  en: ['2020','Home','2021'],
  ru: ['2020', 'Главная']
}
let newLang = homeBtn.en 

document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  
  let engType = [
    'Never give up on a dream just because of time it will take to accomplish it. ',
    'Time will pass anyway. '
  ]
  
  let rusType = [
    'Никогда не сдавайся на пути к своей мечте, только потому что это требует времени. ',
    'Время в любом случае пройдет. '
  ]
  

let typePar = document.querySelector('.type')
let character 
let txt
let count = 0
let ind = 0
let reset = false

let activeInterval = null;

function typeCharacters(phrases) {
  clearInterval(activeInterval);
  if(reset) return
  if(phrases[count] !== undefined && phrases[count] !== null && phrases[count] !== "") {
    let allLength  = phrases[count].length
    
    activeInterval = setInterval(() => {
      if(phrases[count] !== undefined && typePar !== null) {
        character = phrases[count].slice(ind,ind+1)
        txt = document.createTextNode(character)
        typePar.appendChild(txt)
        ind++
        let typeLength = typePar.textContent.length
        if(typeLength === allLength) {
          count++
          ind = 0
          if(phrases[count] !== undefined) {
            allLength += phrases[count].length
          }
        } 
      }
    },100)
  }
}

setTimeout(() => {
    typeCharacters(engType)
},1000)




const allDataElements = Array.from(document.querySelectorAll('[data]'));
const allLangOptions = document.querySelectorAll('option');
const select = document.querySelector('.langSelect');
let choosenLang;

let languages = {
  en: {
    //main page
      mPheadLIabout: 'About',
      mPheadLIprojects: homeBtn.en[0],
      mPheadLIcontacts: 'Contacts',
      mPcopyright: 'Copyright reserved 2021',
      mPrightLIabout: 'About',
      mPrightLIprojects: 'JS',
      mPrightLIprojects21: 'React',
      mPrightLIcontacts: 'Contacts',
      mpWeatherH3: 'Weather',
      mpTanksH3: 'Tanks Game',
      mpToDoH3: 'Tasks Tracker',
      mpCalculatorH3: 'Calculator',
      mpMemoryH3: 'Memory Game',
      mpFoodrH3: 'Food App',
      changePhrases: function() {
        if(typePar !== null) {
          typePar.textContent = "";
          count = 0
          ind = 0
          typeCharacters(engType)
        }
      }
      // htmltag: 'en'
    },
  ru: {
      mPheadLIabout: 'О сайте',
      mPheadLIprojects: homeBtn.ru[0],
      mPheadLIcontacts: 'Контакты',
      mPcopyright: 'Все права защищены 2021',
      mPrightLIabout: 'О сайте',
      mPrightLIprojects: 'JS',
      mPrightLIprojects21: 'React',
      mPrightLIcontacts: 'Контакты',
      mpWeatherH3: 'Погода',
      mpTanksH3: 'Игра Танки',
      mpToDoH3: 'Лист задач',
      mpCalculatorH3: 'Калькулятор',
      mpMemoryH3: 'Игра на запоминание',
      mpFoodrH3: 'Рецепты',
      // change language of typed span
      changePhrases: function() {
        if(typePar !== null) {
          typePar.textContent = "";
          count = 0
          ind = 0
          typeCharacters(rusType)
        }
      }
    }
}

function searchLang(choosenLang) {
  //if choosen language coincides with one of the languages in Object languages:
  if(languages[choosenLang]) {
    allDataElements.forEach(element => {
      //every property of choosen object/language
      for(let x in languages[choosenLang]) {
        //compare with element's data attribute
        if(element.getAttribute('data') === x) {
          //the same attribute changes iinerText in accordance with object
          element.innerText = languages[choosenLang][x]
          //change placeholder
          if(languages[choosenLang].inpFood !== undefined) {
            languages[choosenLang].inpFood()
          }
          if(languages[choosenLang].changePhrases !== undefined) {
            languages[choosenLang].changePhrases()
          }
          newLang = homeBtn[choosenLang]
        }
      }
    })
  }
}

select.addEventListener('change', () => {
  allLangOptions.forEach(option => {
    if(option.selected === true) {
      let lang = option.value
      searchLang(lang)
    }
  })
})

})