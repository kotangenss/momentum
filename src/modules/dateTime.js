import { setLocalStorage, getLocalStorage } from "./helper.js";

const name = document.querySelector('.name');
const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

window.addEventListener('load', () => {
   let nameValue = getLocalStorage('name');

   if (nameValue != undefined) {
      name.value = nameValue;
   }

   name.onkeydown();
})

name.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) {
      e.target.blur()
   }
})

window.addEventListener('beforeunload', () => {
   setLocalStorage('name', name.value);
});

function calculateDate(lng = 'en') {
   const date = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };

   if (lng == 'en') {
      data.textContent = date.toLocaleDateString('en-US', options);
   } else {
      data.textContent = date.toLocaleDateString('ru-RU', options);
   }
}

function calculateTime(lng = getLocalStorage('lng')) {
   const date = new Date();
   time.textContent = date.toLocaleTimeString();
   calculateDate(lng);
   calculateGreeting(lng);
   setTimeout(calculateTime, 1000);
}

function calculateGreeting(lng = 'en') {
   const timeOfDay = getTimeOfDay();
   const greetingText = `Good ${timeOfDay},`;

   if (lng == 'ru') {
      if (greetingText == 'Good morning,') {
         return greeting.textContent = 'Доброе утро,';
      } else if (greetingText == 'Good afternoon,') {
         return greeting.textContent = 'Добрый день,';
      } else if (greetingText == 'Good evening,') {
         return greeting.textContent = 'Добрый вечер,';
      } else {
         return greeting.textContent = 'Доброй ночи,';
      }
   } else {
      return greeting.textContent = greetingText;
   }
}

function getTimeOfDay() {
   const date = new Date();
   const hours = date.getHours();
   let times;

   if (hours >= 6 && hours < 12) {
      times = 'morning';
   } else if (hours >= 12 && hours < 18) {
      times = 'afternoon';
   } else if (hours >= 18 && hours < 24) {
      times = 'evening';
   } else {
      times = 'night';
   }

   return times;
}

function translateGreetingPlaceholder(lng) {
   name.placeholder = lng == 'en' ? 'Enter name' : 'Введите имя';
}

export { time, data, greeting, calculateDate, calculateTime, calculateGreeting, getTimeOfDay, translateGreetingPlaceholder };
