import { getRandomNum } from "./helper.js";
import { getTimeOfDay } from './dateTime.js';

const githubRadioButton = document.querySelector('#github');
const unsplashRadioButton = document.querySelector('#unsplash');
const flickrRadioButton = document.querySelector('#flickr');
const backgroundChangeInput = document.querySelector('#background-tag');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const body = document.querySelector('body');
let imageSource = githubRadioButton.value;
let globalTag;
let randomNum;

window.addEventListener('load', () => {
   randomNum = getRandomNum(1, 21);
})

githubRadioButton.addEventListener('change', (e) => {
   imageSource = e.target.value;
   backgroundChangeInput.style.opacity = 0;
   backgroundChangeInput.disabled = true;
   setSlide(globalTag)
})

unsplashRadioButton.addEventListener('change', (e) => {
   imageSource = e.target.value;
   backgroundChangeInput.style.opacity = 1;
   backgroundChangeInput.disabled = false;
   setSlide(globalTag)
})

flickrRadioButton.addEventListener('change', (e) => {
   imageSource = e.target.value;
   backgroundChangeInput.style.opacity = 1;
   backgroundChangeInput.disabled = false;
   setSlide(globalTag)
})

backgroundChangeInput.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) {
      e.target.blur()
   }
})

backgroundChangeInput.addEventListener('change', (e) => {
   globalTag = backgroundChangeInput.value;
   setSlide(globalTag)
})

// scroll through images by clicking:
slideNext.addEventListener('click', () => setSlide(globalTag, 'next'));
slidePrev.addEventListener('click', () => setSlide(globalTag, 'prev'));

function setSlide(tag, direction = 'next') {
   if (imageSource == 'unsplash') {
      setImageFromUnsplash(tag)
   } else if (imageSource == 'github') {
      setImageFromGithub(direction);
   } else {
      setImageFromFlickr(tag);
   }
}

function changeRandomNumImage(direction) {
   if (direction == 'next') {
      if (randomNum < 20) {
         randomNum += 1;
      } else {
         randomNum = 1;
      }
   } else {
      if (randomNum > 1) {
         randomNum -= 1;
      } else {
         randomNum = 20;
      }
   }
}

async function setImageFromUnsplash(tag = getTimeOfDay()) {
   if (tag == '') {
      tag = getTimeOfDay()
   }
   const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=FI9u5kBxt3varPmHLIiYkHakOzPPQIIxO-ryP0V5KIU`;
   const res = await fetch(url);
   const data = await res.json();
   const img = new Image();

   img.src = data.urls.regular;
   img.onload = () => {
      body.style.backgroundImage = `url('${data.urls.regular}')`;
   };
   img.onerror = () => {
      setImageFromUnsplash(tag);
   }
}

async function setImageFromGithub(direction) {
   changeRandomNumImage(direction);

   const timeOfDay = getTimeOfDay();
   const bgNum = randomNum.toString().padStart(2, 0);
   const img = new Image();

   img.src = `https://raw.githubusercontent.com/kotangenss/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg`
   img.onload = () => {
      body.style.backgroundImage = `url('${img.src}')`;
   };
}

async function setImageFromFlickr(tag = getTimeOfDay()) {
   if (tag == '') {
      tag = getTimeOfDay()
   }
   const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bc41b926812581bf5d3e3806e6864686&tags=${tag}&sort=relevanse&per_page=500&extras=url_h&format=json&nojsoncallback=1`;
   const res = await fetch(url);
   const data = await res.json();

   selectAndSetNewImage(data.photos.photo);
}

function selectAndSetNewImage(photo) {
   const img = new Image();
   const num = getRandomNum(1, 500);

   img.src = photo[num].url_h;
   img.onload = () => {
      body.style.backgroundImage = `url('${photo[num].url_h}')`;
   };
   img.onerror = () => {
      selectAndSetNewImage(photo)
   }
}

export {
   githubRadioButton, unsplashRadioButton, setSlide, flickrRadioButton, imageSource, globalTag, slideNext, slidePrev, changeRandomNumImage, setImageFromUnsplash, setImageFromGithub, setImageFromFlickr, selectAndSetNewImage, backgroundChangeInput
};