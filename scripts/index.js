import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn'),
      playerBlock = document.querySelectorAll('.player-block'),
      temp = document.querySelector('.temp'),
      videoPlayer = document.querySelector('.video-player'),
      audioPlayer = document.querySelector('.audio-player'),
      audio = document.querySelector('.audio'),
      audioButtonPlay = document.querySelector('.audio-button__play');
      
const deactivationPlayer = () => {
    temp.getElementsByClassName.display = 'none';
    playerBtn.forEach((item) => {
        item.classList.remove('active');
    });
    playerBlock.forEach((item) => {
        item.classList.remove('active');
    });
};

playerBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');

        videoPlayer.currentTime = 0;
        videoPlayer.pause();

        audioPlayer.currentTime = 0;
        audioPlayer.pause();

        audio.classList.remove('play');
        audioButtonPlay.classList.add('fa-play');
        audioButtonPlay.classList.remove('fa-pause');
    });
});

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();