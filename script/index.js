import i18Obj from './translate.js';

function preloadSummerImages() {
    ['winter', 'spring', 'summer', 'autumn'].forEach((item) => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${item}/${i}.jpg`;
        }
    });
}

preloadSummerImages();

function toggleMenu() {
    hamburger.classList.toggle('open');
    navigation.classList.toggle('open');
}

function closeMenu(item) {

    if (item.target.classList.contains('text-link')) {
        hamburger.classList.remove('open');
        navigation.classList.remove('open');
    }
}

function changePortfolioBtn(event) {
    document.querySelectorAll('.portfolio-btn')
        .forEach((item) => item.classList.remove('active'));

    if (event.target.classList.contains('portfolio-btn')) {
        event.target.classList.add('active');
        changePortfolioImage(event.target.dataset.season);
    }
}

function changePortfolioImage(season) {
    portfolioImages.forEach((img, index) => {
        img.src = `./assets/img/${season}/${index + 1}.jpg`;
    });
}

function chooseLang(event) {

    if (event.target.classList.contains('switch-lang')) {
        document.querySelectorAll('.switch-lang').forEach((item) => {
            item.classList.remove('active');
        });
        // event.target.classList.toggle('active');
        changeLang(event.target.textContent);
    }
}

function changeLang(lang) {
    document.querySelectorAll('.switch-lang').forEach((btn) => {
        if (btn.textContent === lang.toUpperCase()) {
            btn.classList.add('active');
        }
    });

    const i18n = document.querySelectorAll('[data-i18]');

    i18n.forEach((item) => {
        let data = item.dataset.i18;
        item.innerHTML = i18Obj[lang.toLowerCase()][data];
        lastLang = lang.toLowerCase();
    });
}

function changeTheme() {

    const classList = ['body', 'a', '.btn', '.switch-theme-light', '.switch-theme-dark', '.hamburger_line', '.section-title', '.hover-icon', '.container-header', '.hero', '.contacts', '.section-title-contact', '.contact-element', '.nav', '.switch-lang', '.controls__volume-video', '.controls__progress-video'];

    classList.map((classElementNode) => document.querySelectorAll(classElementNode))
        .forEach((classElement) => classElement
            .forEach((element) => element
                .classList.toggle('light-theme')));

    if (document.querySelector(classList[0]).classList.contains('light-theme')) {
        theme = 'light';
    } else theme = 'dark';
}

function setLocalStorage() {
    localStorage.setItem('lang', lastLang);
    localStorage.setItem('theme', theme);
}

function getLocalStorage() {

    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        changeLang(lang);
    } else changeLang('en');

    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');

        if (theme === 'light') {
            changeTheme();
        }
    }
}

function checkPlay() {
    isPlaying ? pauseVideo() : playVideo();
}

function playVideo() {
    playHover.style.display = 'none';
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    isPlaying = true;
    progressVideo.max = video.duration;
    document.querySelector('.video-player__controls').style.display = 'flex';

    intervalProgress = setInterval(checkProgressVideo, 10);

    video.play();
}

function pauseVideo() {
    isPlaying = false;
    playHover.style.display = 'block';
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';

    clearInterval(intervalProgress);

    video.pause();
}

function muteVolume() {
    if (video.volume !== 0) {
        safeVolume = video.volume;
        video.volume = 0;
    } else {
        video.volume = safeVolume;
    }

    changeVolumeIco(video.volume);
}

function changeVolumeIco(value) {
    let mute = document.querySelector('.mute-off').style;
    let half = document.querySelector('.volume-half').style;
    let full = document.querySelector('.volume-full').style;
    mute.display = 'none';
    half.display = 'none';
    full.display = 'none';

    if (value === 0) {
        mute.display = 'block';
        return 0;
    }

    if (value > 0.75) {
        full.display = 'block';
        half.display = 'block';
        return 0;
    }

    if (value > 0.2) {
        half.display = 'block';
    }
}

function changeProgressVideo() {
    video.currentTime = this.value;
}

function checkProgressVideo() {
    progressVideo.value = video.currentTime;
    let progress = 100 * (1 - (video.duration - progressVideo.value) / video.duration);
    progressVideo.style.background = `linear-gradient(to right, rgb(189, 174, 130) ${progress}%, rgb(189, 174, 130) 0%, rgb(200, 200, 200) 0%, rgb(200, 200, 200) 100%)`;
}


function changeVolumeVideo() {
    video.volume = this.value;
    changeVolumeIco(video.volume);
    volumeVideo.style.background = `linear-gradient(to right, rgb(189, 174, 130) ${video.volume * 100}%, rgb(189, 174, 130) 0%, rgb(200, 200, 200) 0%, rgb(200, 200, 200) 100%)`;
}

const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav');
const portfolioImages = document.querySelectorAll('.portfolio-img');
const portfolioBtns = document.querySelector('.portfolio-btns');
const switchLang = document.querySelector('.switchs-lang');
const switchTheme = document.querySelector('.switch-theme');
const playButton = document.querySelector('.controls__play');
const pauseButton = document.querySelector('.controls__pause');
const video = document.querySelector('.video-player');
const playHover = document.querySelector('.video_play_hover');
const muteButton = document.querySelector('.controls__mute-container');
const progressVideo = document.querySelector('.controls__progress-video');
const volumeVideo = document.querySelector('.controls__volume-video');

let lastLang = 'en';
let theme = 'dark';
let isPlaying = false;
let safeVolume = 1;
let intervalProgress = 0;

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
hamburger.addEventListener('click', toggleMenu);
navigation.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', changePortfolioBtn);
switchLang.addEventListener('click', chooseLang);
switchTheme.addEventListener('click', changeTheme);
playHover.addEventListener('click', playVideo);
video.addEventListener('click', checkPlay);
video.addEventListener('ended', pauseVideo);
playButton.addEventListener('click', playVideo);
pauseButton.addEventListener('click', pauseVideo);
progressVideo.addEventListener('input', changeProgressVideo);
muteButton.addEventListener('click', muteVolume);
volumeVideo.addEventListener('input', changeVolumeVideo);




















