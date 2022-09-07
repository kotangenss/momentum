function setLocalStorage(key, value) {
   localStorage.setItem(key, value);
}

function getLocalStorage(key) {
   if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
   }
}

function getRandomNum(min = 1, max = 21) {
   return Math.floor(Math.random() * (max - min)) + min;
}

export { setLocalStorage, getLocalStorage, getRandomNum }