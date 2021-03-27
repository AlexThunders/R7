"use strict";
//WEATHER
const inputCity = document.getElementById('inputCity');
const citySpan = document.getElementById('city');
let submit = document.getElementById('submit');
const result4Weather = document.getElementById('result4weather');
const result = document.getElementById('tempPar');
const feelsPar = document.getElementById('feelslike');
const feelsLike = document.getElementById('feelTemp');
let fieldset = document.getElementById('fieldset');
let icon = document.createElement('img');
let fahrenheit;
let celcius;
let feelCelcius;
let fahrenheitFeels;

inputCity.addEventListener('focus', () => {
  inputCity.value = '';
  icon.remove();
  feelsPar.style.visibility = 'hidden';
  result.style.visibility = 'hidden';
});
//prohibit input numbers
inputCity.addEventListener('keydown', event => {
  let char = String.fromCharCode(event);
  if(/[0-9]/.test(char)) {
    event.preventDefault();
  }
});

let city;

const fetchResult = (city) => {
  fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "8e49c48bdbmsh698b9d200236a5dp19aae9jsn5b8cd8771f2f",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    }
  })
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      console.log('no response')
      alert('no such city is found')
    }
  })
  .then(data => {
    citySpan.innerText = ` ${city}`;
    celcius = ` ${Math.round(data.main.temp)} C`;
    result4Weather.innerText = celcius;
    result.style.visibility = 'visible';
    feelsPar.style.visibility = 'visible';
    feelCelcius = ` ${Math.round(data.main.feels_like)} C`;
    feelsLike.innerText = feelCelcius;
    console.log(data);
    //add an icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    fieldset.appendChild(icon);
    icon.classList.add('icon');
    //READ ALOUD THE RESULT:
    let text2read =`Temperature in ${citySpan.innerText} is ${Math.round(data.main.temp)} celcius`;
    readResAloud(text2read);
  })
  .catch(err => {
    console.error(err)
  });
}

submit.addEventListener('click', (e) => {
  fahrenheit = undefined;
  city = inputCity.value;
  if(city.value === '') {
    alert('please, enter city');
  }
  fetchResult(city)
})

result4Weather.addEventListener('click', () => {
  if(fahrenheit === undefined) {
    fahrenheit =  Math.round(parseFloat(result4Weather.innerText) * 9/5 + 32);
    fahrenheitFeels =  Math.round(parseFloat(feelsLike.innerText) * 9/5 + 32);
    result4Weather.innerText = `${fahrenheit} F`;
    feelsLike.innerText = `${fahrenheitFeels} F`;
  } else {
    fahrenheit = undefined;
    result4Weather.innerText = celcius;
    feelsLike.innerText = feelCelcius;
  }
})

$(document).ready(() => {
  $('header h1').click(() => {
    $('#fieldset').fadeToggle(1000);
    $('#intro').fadeToggle(1000);
  })
  $('#openWeather').click(() => {
    $('#fieldset').fadeToggle(1000);
    $('#intro').fadeToggle(1000);
  })
})

//VOICE RECOGNITION
const microphone = document.querySelector('.microphone');
//tempPar

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
}

recognition.onresult = function(event) {
  console.log(event)
  const current =  event.resultIndex;

  const transcript = event.results[current][0].transcript;
  inputCity.value = transcript;

  city = transcript;
  fetchResult(transcript);
}

microphone.addEventListener('click', () => {
  recognition.start();
})

function readResAloud(message) {
  const speech =  new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  
  window.speechSynthesis.speak(speech);
}