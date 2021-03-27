export {currentEndGameLang}

let tanksGameOverWindow = {
  en: {
    gameOverH2: 'GAME OVER',
    gameOverP: 'Your score: ',
    gameOverBestPlayerTxt1:  'Best player is ',
    gameOverBestPlayerTxt2:  ', who\'s destroyed ',
    gameOverBestPlayerTxt3:  ' enemy tanks',
    replayBtn: 'Play again',
    escHome: 'Home page',
    escContinue: 'Continue',
    startBtn: "Start"
  },
  ru: {
    gameOverH2: 'ИГРА ОКОНЧЕНА',
    gameOverP: 'Ваш счет: ',
    gameOverBestPlayerTxt1:  'Лучший игрок ',
    gameOverBestPlayerTxt2:  ', который подбил ',
    gameOverBestPlayerTxt3:  ' вражеских танка',
    replayBtn: 'Играть снова',
    escHome: 'Главная',
    escContinue: 'Продолжить',
    startBtn: "Старт"
  }
}

let currentEndGameLang = tanksGameOverWindow.en

document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  
  const allDataElements = Array.from(document.querySelectorAll('[data]'));
  const allLangOptions = document.querySelectorAll('option');
  const select = document.querySelector('.langSelect');
  let choosenLang;
  
  let languages = {
    en: {
      //about
      aboutTitle: 'About my work',
      aboutH1: 'My work',
      aboutInfo: 'INFO',
      aboutInfoPar: 'Here you can read information about my website, tools I used to build it',
      aboutLinkMain: 'Main',
      aboutLinkWeather: 'Weather',
      aboutLinkTasks: 'TaskTrack',
      aboutLinkMemory: 'Memory',
      aboutLinkCalculator: 'Calculator',
      aboutLinkTanks: 'Tanks',
      aboutLinkFood: 'Recipes',
      aboutMainIntro: ' This site contains all projects I\'ve made. The skills in JavaScript and CSS, I\'ve gained so far, are placed in this site docs with main goal to use them in my future projects',
      aboutDescriptionH4: 'What tools I used in my projects',
      aboutDescripIntroPar: 'Mainly my work includes different methods, rules of HTML, CSS and JavaScript. Next project I am going to write with React. I am still learning and going to add more features to my projects in the future, fix bugs and imperfections. Any suggestions related to my work or contributions on GitHub are welcomed. You can change language at the right top corner of a page. A list under every project indicates some main items from JavaScript I used. Leave screenshot of a projects at the center within your screen\'s borders, and it will demonstarte how it works',
      aboutH4Task: 'Application Task Tracker',
      aboutProjectTaskstracker: 'Task Tracker is an application which allows to track the process of a study or a workout during the month. It is still under development. ToDo list with lots of extra features such as user ability to add tasks in the list, clear everithing, add new month, store info of entire year etc.',
      aboutH4Tanks: 'Game War of Tanks',
      aboutProjectTanks: 'This game was created with HTML elements only. No canvas was used to build a content. Main goal was to learn how to manipulate DOM and develope CSS skills. Some features with absolute styling make it available only for big screens (like PC). It uses local storage to save your score, compare it with other players and show the best player at the end.',
      aboutH4Weather: 'Weather application',
      openW: 'OPEN',
      aboutProjectWeather: 'Weather application uses weather API.You can type city both in English and Russian. If you click temperature, you can switch from Celsius to Fahrenheit and to the contrary.Type a city in the input field and click Search button.',
      aboutH4Menory: 'Memory game',
      aboutProjectMemory: 'In this game I generally used CSS classes manipulation and ternary operator to check card.',
      aboutH4Calculator: 'Calculator',
      aboutProjectCalculator: 'Main part of the code here is Calculator class. Grid CSS layout is used to display calculator itself.',
      aboutH4Food: 'Food application',
      aboutProjectFood: 'API in this application gives different recipes, pictures of meals, and instruction how to cook.',
      
      //food
      foodTitle: 'Food',
      foodApp: 'Food recipes',
      homeFood: 'Back to Home page',
      midH4food: 'Find and choose meals',
      searchFood: 'search',
      copyrightFood: 'enjoy your meal',
      inpFood: function() {
          let inputFood = document.getElementById('meal-input');
          if(inputFood !== undefined && inputFood !== null) {
            inputFood.setAttribute('placeholder','input meal')
          }
      },
      foodPar: 'Our recipes are created to cater to all cooking levels and styles. From a one-minute weekday breakfast to a delicious two-course dinner made with your own hands, our recipes cater to everyone.',
      foodMidPar: 'Choose from a variety of healthy, delicious meals that accommodate your dietary preferences.',

      //weather
      wTitle: 'Weather',
      wH1: 'WEATHER',
      wIntro: 'Weather application uses weather API. You can type city both in English and Russian. If you click temperature, you can switch from Celsius to Fahrenheit and to the contrary. Type a city in the input field and click Search button.',
      wSpan1: 'Enter city:',
      wTempPar: 'Temperature in ',
      wCity: ' is ',
      wFeelsLike: 'Feels like ',
      weatherSubmit: 'Submit',
      inpCity: function() {
        let inputCity = document.getElementById('inputCity');
        if(inputCity !== undefined && inputCity !== null) {
          inputCity.setAttribute('placeholder','City')
        }
      },

      //tanks
      tanksTitle: "Tanks",
      tanksH1: "Tanks",
      tanksH2: "Instruction",
      tanksMainP: `The goal is to destroy enemy tanks as many as possible.
      They can hit you. If your tank is exploded, the game is over
      You can not destroy ground cannons but they can hit you.
      The hit is counted only when shells fall on you or enemies from above. 
      To pause the game or go to Home page press 'ESC'
      To rotate the cabin to the right press key 'C'
      To rotate the cabin to the left press key 'Z'
      To move left press key 'LEFT'
      To move right press key 'RIGHT'
      To move up press key 'UP'
      To move down press key 'DOWN'
      To shot fire press key 'SPACE'
      GOOD LUCK!
      tanksH3: "Enter players name`,
      tanksH3: "Enter players name:",
      tanksStartBtn: "LET'S START!",
      tanksHome: "Home",

      //memory
      memTitle: 'AT',
      memH1: 'Memory game',
      memP: 'Flip cards to find match',
      memStart: 'Start',
      mHomeLink: 'Main page'
    },

    ru: {
      //about
      aboutTitle: 'О моей работе',
      aboutH1: 'Моя работа',
      aboutInfo: 'ИНФО',
      aboutInfoPar: 'На этой странице вы можете прочитать информацию о моем сайте, об иструментах, которыми я пользовался',
      aboutLinkMain: 'Главная',
      aboutLinkWeather: 'Погода',
      aboutLinkTasks: 'Задачи',
      aboutLinkMemory: 'Память',
      aboutLinkCalculator: 'Калькулятор',
      aboutLinkTanks: 'Танки',
      aboutLinkFood: 'Рецепты',
      aboutMainIntro: ' Этот сайт включает все мои проекты, знания в JavaScript, CSS, React, которые я приобрел на данный момент. Главная цель создания сайта - собрать все работы в одном месте, чтобы пользоваться ими в будущих проектах.',
      aboutDescriptionH4: 'Какие методы, библиотеки, фреймворки я использовал ',
      aboutDescripIntroPar: 'В основном в них используются различные методы, правила HTML, CSS и JavaScript. Следующий проект планирую с использованием React. Я продолжаю учиться и собираюсь расширять проекты, а также сокращать количество ошибок, корректировать код. Любые предложения касательно моих работ, а также вклад на GitHub, приветствуются',
      aboutH4Task: 'Приложение "ТаскТрэкер"',
      aboutProjectTaskstracker: 'ТаскТрэекер - это приложение, которое позволяе отслеживать процесс учебы или занятий спортом в течение месяца. Проект в процессе доработки. Планирую добавить ToDo list, функцию очистки хранилища, добавление нового месяца, хранение данных за весь год и т.д.',
      aboutH4Tanks: 'Игра Война танков',
      aboutProjectTanks: 'В данной игре использовались только div-элементы, без canvas.Основной целью создания было научиться управлять DOM на примере реальной игры. Так как в игре не использовались media queries и много absolute styling, то игра работает только на больших экранах. В хранилище браузера сохраняется счет, сравнивается с другими игроками и показывает лучший резльтат в конце. ',
      aboutH4Weather: 'Приложение Погода',
      aboutProjectWeather: 'Приложение Погода использует API.Город можно вводить и на русском, и английском. Если нажать мышкой на знак температуры, то она поменятся с целься на фаренгейт и наоборот.',
      aboutH4Menory: 'Игра на запоминание',
      aboutProjectMemory: 'В этой игре я в основном использовал CSS классы для управления и тернарный оператор, чтобы проверять карточки',
      aboutH4Calculator: 'Калькулятор',
      aboutProjectCalculator: 'Центральной частью кода здесь служит класс калькулятор. Для создания самого калькулятора используется CSS Grid',
      aboutH4Food: 'Приложение Рецепты',
      aboutProjectFood: 'API в этом приложении позволяет получить различные рецепты, картинки еды и инструкции, как готовить.',

      //food
      mpFoodrH3: 'Кулинарные рецепты',
      mpDesignsH3: 'Дизайны страниц',
      foodTitle: 'Рецепты',
      foodApp: 'Кулинарные рецепты',
      homeFood: 'Главная страница',
      midH4food: 'Найдите и выбирите рецепты',
      searchFood: 'поиск',
      copyrightFood: 'Приятного аппетита!',
      inpFood: function() {
          let inputFood = document.getElementById('meal-input');
          if(inputFood !== undefined && inputFood !== null) {
            inputFood.setAttribute('placeholder','введите название блюда');
          }
      },
      foodPar: 'Наши рецепты созданы для всех уровней и стилей приготовления. От минутного завтрака в будний день до восхитительного ужина из двух блюд, приготовленных своими руками, - наши рецепты подходят каждому. ',
      foodMidPar: 'Выбирайте из множества здоровых и вкусных блюд, которые соответствуют вашим диетическим предпочтениям. Все рецепты предоставлются только на английском языке. ',

      //weather
      wTitle: 'Погода',
      wH1: 'ПОГОДА',
      wIntro: 'Приложение Погода использует Weather API. Вы можете напечатать город и на русском, и на английском. Если кликните на температуру, то можете переключать результат с цельсий на фаренгейт и наоборот. Введите город и нажмите поиск.',
      openW: 'ОТКРЫТЬ',
      wSpan1: 'Введите город:',
      wTempPar: 'Температура в городе ',
      wCity: '',
      wFeelsLike: 'Ощущается как ',
      weatherSubmit: 'Поиск',
      inpCity: function() {
        let inputCity = document.getElementById('inputCity');
        if(inputCity !== undefined && inputCity !== null) {
          inputCity.setAttribute('placeholder','Город')
        }
      },

      //tanks
      tanksTitle: "Танки",
      tanksH1: "Танки",
      tanksH2: "инструкция",
      tanksMainP: `Цель - подбить как можно больше танков противника.
      Они могут попасть в вас. Если ваш танк взорвался, игра окончена.
      Вы не можете подбить наземные пушки, но они могут попасть в вас.
      Попадание засчитывается, только когда снаряд ударяет в танк сверху.
      Чтобы остановить игру или выйти на главную страницу, нажмите ESC.
      Чтобы повернуть пушку вправо, нажмите 'C'.
      Чтобы повернуть пушку влево, нажмите 'Z'.
      Чтобы ехать влево, нажмите стрелку 'Влево'.
      Чтобы ехать вправо, нажмите стрелку 'Вправо'.
      Чтобы ехать вниз, нажмите стрелку 'Вниз'.
      Чтобы ехать вверх, нажмите стрелку 'Вверх'.
      Чтобы стрелять нажимайте пробел.
      Удачи!`,
      tanksH3: "Введите имя игрока",
      tanksStartBtn: "СТАРТ!",
      tanksHome: "Главная",

      //memory
      memTitle: 'АГ',
      memH1: 'Игра на запоминание',
      memP: 'Нажимайте на карточки, чтобы открыть все пары',
      memStart: 'Начать',
      mHomeLink: 'Главная'
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
              languages[choosenLang].inpCity()
              currentEndGameLang = tanksGameOverWindow[choosenLang]
            }
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