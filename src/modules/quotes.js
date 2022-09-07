import { getLocalStorage, getRandomNum } from "./helper.js";

const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let quoteNum;

async function getQuotes(lng = getLocalStorage('lng'), num = getRandomNum(1, 99)) {
   const quotes = 'assets/quotes.json';
   const res = await fetch(quotes);
   const data = await res.json();

   quote.textContent = `${data[num][lng].text}`;
   author.textContent = (data[num][lng].author === null) ? '' : `– ${data[num][lng].author}`;
   quoteNum = num;
}

changeQuote.addEventListener('click', () => getQuotes());

export {
   getQuotes, quoteNum
}