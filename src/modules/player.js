import playList from './playList.js';

const buttonPlayPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const buttonPlayNext = document.querySelector('.play-next');
const audio = document.querySelector('audio');
const playListContainer = document.querySelector('.play-list');
const generalTime = document.querySelector('.general-time');
const currentAudio = document.querySelector('.top__current-audio');
const currentTime = document.querySelector('.current-time');
const timelineProgress = document.querySelector('.timeline__progress');
const volumeIcon = document.querySelector('.volume-icon');
const volumeLine = document.querySelector('.volume-line');

let playNum = 0;
let activeNum = -1;
let isPlay = false;

audio.volume = '0.5';

audio.addEventListener("ended", () => playNext());

function playAudio() {
   if (activeNum !== playNum) {
      audio.src = playList[playNum].src;
      audio.currentTime = 0;
      activeNum = playNum;
   }
   diactivateAudioIcons();
   selectActiveAudio()
   audio.play();
   generalTime.textContent = playList[playNum].duration;
   currentAudio.textContent = playList[playNum].title;
   isPlay = true;
   play.classList.add('pause');
}

function pauseAudio() {
   diactivateAudioIcons();
   audio.pause();
   isPlay = false;
   play.classList.remove('pause');
}

function selectActiveAudio() {
   let audioList = document.querySelectorAll('.play-item');

   audioList.forEach((e, index) => {
      if (index === playNum) {
         e.classList.add('item-active');
         e.children[0].classList.add('pause')
      } else {
         e.classList.remove('item-active')
      }
   })
}

// icon play & stop:
play.addEventListener('click', function (e) {
   if (!isPlay) {
      playAudio();
   } else {
      pauseAudio();
   }
})

// switch tracks:
function playNext() {
   playNum = playNum < playList.length - 1 ? playNum + 1 : 0;
   playAudio();
}

function playPrev() {
   playNum = playNum > 0 ? playNum - 1 : playList.length - 1;
   playAudio();
}

buttonPlayPrev.addEventListener('click', function (e) {
   playPrev();
});

buttonPlayNext.addEventListener('click', function (e) {
   playNext();
});

// create a playlist:
playList.forEach((e, index) => {
   let li = document.createElement('li');
   li.classList.add('play-item');
   li.textContent = `${e.title}`;

   let button = document.createElement('button');
   button.classList.add('play');
   button.classList.add('playlist-item-play');
   button.style.backgroundSize = '20px';
   button.style.width = '20px';
   button.style.height = '20px';
   button.style.marginRight = '8px'
   button.style.backgroundRepeat = 'no-repeat';

   playListContainer.append(li);
   li.append(button);

   generalTime.textContent = playList[playNum].duration;

   button.addEventListener('click', function (e) {
      let btn = e.target;

      if (btn.classList.contains('pause')) {
         pauseAudio();
         btn.classList.remove('pause');
      } else {
         diactivateAudioIcons();
         playNum = index;
         playAudio();
         btn.classList.add('pause');
      }
   });
})

function diactivateAudioIcons() {
   document.querySelectorAll('.playlist-item-play').forEach(e => {
      e.classList.remove('pause');
   })
}

//get current time:
function getCurrentTime(num) {
   let sec = parseInt(num);
   let min = parseInt(sec / 60);
   sec -= min * 60;

   return `${min}:${String(sec).padStart(2, 0)}`;
}

//timeline movement:
setInterval(() => {
   if (audio.currentSrc) {
      timelineProgress.value = audio.currentTime / audio.duration * 100;
      currentTime.textContent = getCurrentTime(audio.currentTime);
      changeValueVolume(timelineProgress);
   }
}, 100);

timelineProgress.addEventListener('input', e => {
   if (audio.currentSrc) {
      audio.currentTime = audio.duration * timelineProgress.value / 100;
   }

   changeValueVolume(e.target)
})

//mute & unmute:
let lastVolumeValue = '50';

volumeIcon.addEventListener('click', function (e) {
   volumeIcon.classList.toggle('volume-mute-icon');

   if (volumeIcon.classList.contains('volume-mute-icon')) {
      lastVolumeValue = volumeLine.value;
      audio.volume = 0.0;
      volumeLine.value = '0';
   } else {
      audio.volume = lastVolumeValue / 100;
      volumeLine.value = lastVolumeValue;
   }

   changeValueVolume(volumeLine);
});

volumeLine.addEventListener('input', e => {
   if (volumeLine.value === '0') {
      volumeIcon.classList.add('volume-mute-icon');
   } else {
      volumeIcon.classList.remove('volume-mute-icon');
   }

   audio.volume = volumeLine.value / 100;
   changeValueVolume(e.target);
})

function changeValueVolume(target) {
   const min = target.min;
   const max = target.max;
   const val = target.value;

   target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

export {
   playAudio, pauseAudio, selectActiveAudio, playNext, playPrev, diactivateAudioIcons, getCurrentTime, changeValueVolume
}