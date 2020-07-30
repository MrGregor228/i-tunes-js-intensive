export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
          radioCoverImg = document.querySelector('.radio-cover__img'),
          radioNavigation = document.querySelector('.radio-navigation'),
          radioHeader = document.querySelector('.radio-header__big'),
          radioItem = document.querySelectorAll('.radio-item'),
          radioStop = document.querySelector('.radio-stop'),
          radioVolume = document.querySelector(".radio-range input[type='range']"),
          radioVolumeIndicator = document.querySelector('.volume-indicator'),
          playerBtn = document.querySelectorAll('.player-btn');
    
    const audio = new Audio();
    audio.type = 'audio/aac';
    radioVolumeIndicator.textContent = radioVolume.value;
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target,
              parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;

        radioHeader.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;

        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });
    
    radioVolume.addEventListener('input', () => {
        radioVolumeIndicator.textContent = radioVolume.value;
        audio.volume = radioVolume.value / 100;       
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        
    });

    playerBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            audio.pause();
            changeIconPlay();
        });        
    });
};