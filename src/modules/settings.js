import { setLocalStorage, getLocalStorage } from "./helper.js";
import { backgroundChangeInput } from './backgroundImages.js';
import { city, getWeather, translateCity } from './weather.js';
import { time, data, translateGreetingPlaceholder, calculateDate, calculateGreeting } from './dateTime.js';
import { getQuotes, quoteNum } from './quotes.js';
import { translateTodo } from './todo.js';


const settings = document.querySelector('.settings__info');
const settingsButton = document.querySelector('.settings__button');
const engButton = document.querySelector('.language-en');
const ruButton = document.querySelector('.language-ru');

const greetingContainer = document.querySelector('.greeting-container');
const quotesContainer = document.querySelector('.quotes');
const weatherContainer = document.querySelector('.weather');
const playerContainer = document.querySelector('.player');
const todoContainer = document.querySelector('.todo');

const checkboxTime = document.querySelector('#time');
const checkboxDate = document.querySelector('#date');
const checkboxPlayer = document.querySelector('#player');
const checkboxGreeting = document.querySelector('#greeting');
const checkboxQuote = document.querySelector('#quote');
const checkboxWeather = document.querySelector('#weather');
const checkboxTodo = document.querySelector('#todo');

let isShowTime = true;
let isShowDate = true;
let isShowPlayer = true;
let isShowGreeting = true;
let isShowQuote = true;
let isShowWeather = true;
let isShowTodo = true;
let langValue;

const settingTime = document.querySelector('#checkbox-time');
const settingDate = document.querySelector('#checkbox-date');
const settingPlayer = document.querySelector('#checkbox-player');
const settingGreeting = document.querySelector('#checkbox-greeting');
const settingQuote = document.querySelector('#checkbox-quote');
const settingWeather = document.querySelector('#checkbox-weather');
const settingTodo = document.querySelector('#checkbox-todo');
const settingTitleImage = document.querySelector('#image-source');
const settingTitleBlocks = document.querySelector('#hide-show-blocks');
const settingTitleLanguage = document.querySelector('#change-language');

window.addEventListener('load', () => {
   isShowTime = getLocalStorage('isShowTime');
   if (isShowTime == undefined) {
      setLocalStorage('isShowTime', true);
      isShowTime = true;
   } else {
      isShowTime = isShowTime == 'true'
   }

   isShowDate = getLocalStorage('isShowDate');
   if (isShowDate == undefined) {
      setLocalStorage('isShowDate', true);
      isShowDate = true;
   } else {
      isShowDate = isShowDate == 'true'
   }

   isShowGreeting = getLocalStorage('isShowGreeting');
   if (isShowGreeting == undefined) {
      setLocalStorage('isShowGreeting', true);
      isShowGreeting = true;
   } else {
      isShowGreeting = isShowGreeting == 'true'
   }

   isShowQuote = getLocalStorage('isShowQuote');
   if (isShowQuote == undefined) {
      setLocalStorage('isShowQuote', true);
      isShowQuote = true;
   } else {
      isShowQuote = isShowQuote == 'true'
   }

   isShowWeather = getLocalStorage('isShowWeather');
   if (isShowWeather == undefined) {
      setLocalStorage('isShowWeather', true);
      isShowWeather = true;
   } else {
      isShowWeather = isShowWeather == 'true'
   }

   isShowPlayer = getLocalStorage('isShowPlayer');
   if (isShowPlayer == undefined) {
      setLocalStorage('isShowPlayer', true);
      isShowPlayer = true;
   } else {
      isShowPlayer = isShowPlayer == 'true'
   }

   isShowTodo = getLocalStorage('isShowTodo');
   if (isShowTodo == undefined) {
      setLocalStorage('isShowTodo', true);
      isShowTodo = true;
   } else {
      isShowTodo = isShowTodo == 'true'
   }
})

// closing settings by clicking outside:
document.addEventListener('click', (e) => {
   let element = document.querySelector('.settings');
   let withinBoundaries = e.composedPath().includes(element);

   if (!withinBoundaries) {
      settings.style.opacity = 0;
      settings.style.zIndex = -10;
   }
})

function translateSearch(lng) {
   if (backgroundChangeInput.placeholder == 'What are we looking for?' || backgroundChangeInput.placeholder == 'Что мы ищем?') {
      backgroundChangeInput.placeholder = lng == 'en' ? 'What are we looking for?' : 'Что мы ищем?';
   }
}

function translateSettingDisplay(lng) {
   settingTime.textContent = lng == 'en' ? 'Time' : 'Время';
   settingDate.textContent = lng == 'en' ? 'Date' : 'Дата';
   settingPlayer.textContent = lng == 'en' ? 'Player' : 'Плеер';
   settingGreeting.textContent = lng == 'en' ? 'Greeting' : 'Обращение';
   settingQuote.textContent = lng == 'en' ? 'Quote' : 'Цитата';
   settingWeather.textContent = lng == 'en' ? 'Weather' : 'Погода';
   settingTodo.textContent = lng == 'en' ? 'Todo' : 'Задачи';
   settingTitleImage.textContent = lng == 'en' ? 'Image source:' : 'Источник изображений:';
   settingTitleBlocks.textContent = lng == 'en' ? 'Hide / Show blocks:' : 'Скрыть / показать блоки:';
   settingTitleLanguage.textContent = lng == 'en' ? 'Change language:' : 'Изменить язык:';
}

function showTime() {
   if (isShowTime) {
      time.style.transition = "all 0.3s";
      time.style.opacity = 1;
      time.style.zIndex = 1;
   } else {
      time.style.opacity = 0;
      time.style.zIndex = -10;
      time.style.transition = "all 0.3s";
   }
}

function showDate() {
   if (isShowDate) {
      data.style.transition = "all 0.3s";
      data.style.opacity = 1;
      data.style.zIndex = 1;
   } else {
      data.style.opacity = 0;
      data.style.zIndex = -10;
      data.style.transition = "all 0.3s";
   }
}

function showQuote() {
   if (isShowQuote) {
      quotesContainer.style.transition = "all 0.3s";
      quotesContainer.style.opacity = 1;
      quotesContainer.style.zIndex = 1;
   } else {
      quotesContainer.style.opacity = 0;
      quotesContainer.style.zIndex = -10;
      quotesContainer.style.transition = "all 0.3s";
   }
}

function showWeather() {
   if (isShowWeather) {
      weatherContainer.style.transition = "all 0.3s";
      weatherContainer.style.opacity = 1;
      weatherContainer.style.zIndex = 1;
   } else {
      weatherContainer.style.opacity = 0;
      weatherContainer.style.zIndex = -10;
      weatherContainer.style.transition = "all 0.3s";
   }
}

function showPlayer() {
   if (isShowPlayer) {
      playerContainer.style.transition = "all 0.3s";
      playerContainer.style.opacity = 1;
      playerContainer.style.zIndex = 1;
   } else {
      playerContainer.style.opacity = 0;
      playerContainer.style.zIndex = -10;
      playerContainer.style.transition = "all 0.3s";
   }
}

function showTodo() {
   if (isShowTodo) {
      todoContainer.style.transition = "all 0.3s";
      todoContainer.style.opacity = 1;
      todoContainer.style.zIndex = 1;
   } else {
      todoContainer.style.opacity = 0;
      todoContainer.style.zIndex = -10;
      todoContainer.style.transition = "all 0.3s";
   }
}

function showGreeting() {
   if (isShowGreeting) {
      greetingContainer.style.transition = "all 0.3s";
      greetingContainer.style.opacity = 1;
      greetingContainer.style.zIndex = 1;
   } else {
      greetingContainer.style.opacity = 0;
      greetingContainer.style.zIndex = -10;
      greetingContainer.style.transition = "all 0.3s";
   }
}

ruButton.addEventListener('click', () => {
   langValue = 'ru';
   engButton.classList.remove('_active');
   ruButton.classList.add('_active');
   setLocalStorage('lng', langValue);
   getWeather(langValue, city.value);
   translateCity(langValue);
   translateGreetingPlaceholder(langValue);
   translateSearch(langValue);
   translateSettingDisplay(langValue);
   getQuotes(langValue, quoteNum);
   calculateDate(langValue);
   calculateGreeting(langValue);
   translateTodo(langValue);
})

engButton.addEventListener('click', () => {
   langValue = 'en';
   ruButton.classList.remove('_active');
   engButton.classList.add('_active');
   setLocalStorage('lng', langValue);
   getWeather(langValue, city.value);
   translateCity(langValue);
   translateGreetingPlaceholder(langValue);
   translateSearch(langValue);
   translateSettingDisplay(langValue);
   getQuotes(langValue, quoteNum);
   calculateDate(langValue);
   calculateGreeting(langValue);
   translateTodo(langValue);
})

settingsButton.addEventListener('click', function (e) {
   if (settings.style.opacity == 0) {
      settings.style.opacity = 1
      settings.style.zIndex = 2;
      settingsButton.style.zIndex = 3;
   } else {
      settings.style.opacity = 0
      settings.style.zIndex = -10;
      settingsButton.style.zIndex = 1;
   }
});

checkboxTime.addEventListener('change', (e) => {
   setLocalStorage('isShowTime', checkboxTime.checked);
   isShowTime = checkboxTime.checked;
   showTime();
})

checkboxDate.addEventListener('change', (e) => {
   setLocalStorage('isShowDate', checkboxDate.checked);
   isShowDate = checkboxDate.checked;
   showDate();
})

checkboxGreeting.addEventListener('change', (e) => {
   setLocalStorage('isShowGreeting', checkboxGreeting.checked);
   isShowGreeting = checkboxGreeting.checked;
   showGreeting();
})

checkboxQuote.addEventListener('change', (e) => {
   setLocalStorage('isShowQuote', checkboxQuote.checked);
   isShowQuote = checkboxQuote.checked;
   showQuote();
})

checkboxWeather.addEventListener('change', (e) => {
   setLocalStorage('isShowWeather', checkboxWeather.checked);
   isShowWeather = checkboxWeather.checked;
   showWeather();
})

checkboxPlayer.addEventListener('change', (e) => {
   setLocalStorage('isShowPlayer', checkboxPlayer.checked);
   isShowPlayer = checkboxPlayer.checked;
   showPlayer();
})

checkboxTodo.addEventListener('change', (e) => {
   setLocalStorage('isShowTodo', checkboxTodo.checked);
   isShowTodo = checkboxTodo.checked;
   showTodo();
})

export { settings, settingsButton, engButton, ruButton, checkboxTime, checkboxDate, checkboxPlayer, checkboxGreeting, checkboxQuote, checkboxWeather, checkboxTodo, isShowTime, isShowDate, isShowPlayer, isShowGreeting, isShowQuote, isShowWeather, isShowTodo, translateSearch, translateSettingDisplay, showTime, showDate, showGreeting, showQuote, showWeather, showPlayer, showTodo }