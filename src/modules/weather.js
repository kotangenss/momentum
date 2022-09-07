import { setLocalStorage, getLocalStorage } from "./helper.js";

const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');

window.addEventListener('load', () => {
   let cityValue = getLocalStorage('city');

   if (cityValue != undefined) {
      city.value = cityValue;
   } else {
      city.value = 'Minsk';
   }
})

city.addEventListener('keypress', setCity);

window.addEventListener('beforeunload', () => {
   setLocalStorage('city', city.value);
});

async function getWeather(lng = 'en', city = 'Minsk') {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lng}&appid=7f67897508764ffdd544d2c7c5d7ef49&units=metric`;
   const res = await fetch(url);
   const data = await res.json();
   const weatherTranslate = {
      'en': {
         'wind': 'Wind speed',
         'humidity': 'Humidity',
         'error': 'Error! City not found for ',
         'speed': 'm/s'
      },
      'ru': {
         'wind': 'Скорость ветра',
         'humidity': 'Влажность',
         'error': 'Ошибка! Город не найден для ',
         'speed': 'м/с'
      }
   }

   if (data.cod === 200) {
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `${weatherTranslate[lng].wind}: ${Math.floor(data.wind.speed)} ${weatherTranslate[lng].speed}`;
      humidity.textContent = `${weatherTranslate[lng].humidity}: ${Math.floor(data.main.humidity)}%`;
      weatherError.textContent = '';
   } else {
      weatherError.textContent = `${weatherTranslate[lng].error}'${city}'!`;
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      weatherIcon.className = 'weather-icon';
   }
}

function setCity(event) {
   if (event.code === 'Enter') {
      let lng = getLocalStorage('lng');
      getWeather(lng, city.value);
      translateCity(lng);
      city.blur();
   }
}

function translateCity(lng) {
   if (city.value == 'Minsk' || city.value == 'Минск') {
      city.value = lng == 'en' ? 'Minsk' : 'Минск';
   }


   if (city.placeholder) {
      city.placeholder = lng == 'en' ? 'Enter city' : 'Введите город';
   }

}

export {
   city, wind, humidity, weatherIcon, temperature, weatherDescription, weatherError, getWeather, setCity, translateCity
};