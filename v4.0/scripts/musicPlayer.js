export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
            const isPlayed = audioPlayer.paused,
                track = playlist[trackIndex];

            audioPlayer.src = `./audio/${track}.mp3`;
            audioImg.src = `./audio/${track}.jpg`;
            audioHeader.textContent = track.toUpperCase();
            if (isPlayed) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }

        },
        nextTrack = () => {
            if (trackIndex === playlist.length - 1) {
                trackIndex = 0;
            } else {
                trackIndex++;
            }
            loadTrack();
        },
        prevTrack = () => {
            if (trackIndex !== 0) {
                trackIndex--;
            } else {
                trackIndex = playlist.length - 1;
            }
            loadTrack();
        },
        addZero = n => n < 10 ? '0' + n : n;

    audioNavigation.addEventListener('click', event => {
        const target = event.target,
            track = playlist[trackIndex];
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            audioHeader.textContent = track.toUpperCase();
        }
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

        audioPlayer.addEventListener('ended', () => {
            nextTrack();
            audioPlayer.play();
        });
        audioPlayer.addEventListener('timeupdate', () => {
            const duration =audioPlayer.duration,
                  currentTime = audioPlayer.currentTime,
                  progress = (currentTime / duration) * 100;

            audioProgressTiming.style.width = `${progress}%`;

            const minutesPassed = Math.floor(currentTime / 60),
                  secondsPassed = Math.floor(currentTime % 60),
                  minutesTotal = Math.floor(duration / 60),
                  secondsTotal = Math.floor(duration % 60);

            audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
            audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
        });
        audioProgress.addEventListener('click', event => {
            const x = event.offsetX,
                  allWidth = audioProgress.clientWidth,
                  progress = (x /allWidth) * audioPlayer.duration;

            audioPlayer.currentTime = progress;
        });
    });
};