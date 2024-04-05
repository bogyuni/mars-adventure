import { setSubStatus } from './substatus.js';
import { pixelData, pixelDataLoad } from './pixel.js';

const winWidth = window.innerWidth;
let keyMove = true;
const heroBS = document.querySelector('#heroBS');
const heroBSWidth = heroBS.offsetWidth;
const posX = 50; // 이동 거리 단위
let heroBSX = 200; // 탐색로버의 초기 위치값
const rocket = document.querySelector('#rocket');

// bg
const ground = document.querySelector('#ground');
const scenery = document.querySelector('#scenery');

pixelDataLoad(pixelData.rocketFire, rocket);
pixelDataLoad(pixelData.rocketObj, rocket);
pixelDataLoad(pixelData.rover, heroBS);
pixelDataLoad(pixelData.roverWheel, heroBS, 'wheelL');
pixelDataLoad(pixelData.roverWheel, heroBS, 'wheelR');

pixelDataLoad(pixelData.rock1, scenery);

function groundRendering() {
  const groundWidth = ground.offsetWidth;
  const groundTileWidth = 120;
  const tileLegth = Math.round(groundWidth / groundTileWidth);
  console.log(Math.round(groundWidth / groundTileWidth), groundWidth / groundTileWidth);
  for (let i = 0; i < tileLegth; i++) {
    pixelDataLoad(pixelData.ground, ground);
  }
}
groundRendering();

const zLine1 = document.querySelector('.z-line-wrap');
let zLine1X = 0;
const zLine2 = document.querySelector('.z-line-back.back1');
let zLine2X = 0;
const zLine3 = document.querySelector('.z-line-back.back2');
let zLine3X = 0;
const mapWidth = zLine1.offsetWidth;

const aboutme = document.querySelector('.aboutme');
const aboutmeStatus = {
  open: false,
  width: aboutme.offsetWidth,
  range: aboutme.offsetWidth / 2,
}
const portfolio = document.querySelector('.portfolio');
const portfolioStatus = {
  open: false,
  width: portfolio.offsetWidth,
  range: portfolio.offsetWidth / 2,
}
const contactus = document.querySelector('.contactus');
const contactusStatus = {
  open: false,
  width: contactus.offsetWidth,
  range: contactus.offsetWidth / 2,
}
const aboutmePopup = document.querySelector('.aboutme-popup');


function beltscrollKeydown(key) {
  if (key === 'ArrowLeft' && keyMove === true) {
    if (heroBSX > winWidth * 0.15) {
      heroBSX -= posX;
    }

    if (heroBSX < winWidth * 0.15 && zLine1X > 0 ) {
      zLine1X -= posX;
      zLine1.style.left = '-'+zLine1X+'px';
      zLine2X -= posX * 0.3;
      zLine2.style.left = '-'+zLine2X+'px';
      zLine3X -= posX * 0.05;
      zLine3.style.left = '-'+zLine3X+'px';
    }
    heroBS.classList.remove('right');
    heroBS.classList.add('left');
    heroBS.classList.add('move');
  }
  if (key === 'ArrowRight' && keyMove === true) {
    if (heroBSX < winWidth * 0.75) {
      heroBSX += posX;
    }

    if (heroBSX >= winWidth * 0.75 && zLine1X < mapWidth - winWidth) {
      zLine1X += posX;
      zLine1.style.left = '-'+zLine1X+'px';
      zLine2X += posX * 0.3;
      zLine2.style.left = '-'+zLine2X+'px';
      zLine3X += posX * 0.05;
      zLine3.style.left = '-'+zLine3X+'px';
    }
    heroBS.classList.remove('left');
    heroBS.classList.add('right');
    heroBS.classList.add('move');
  }
  heroBS.style.left = heroBSX+'px';

  if (key === 'ArrowUp' || key === ' ') {
    const heroBSLeft = heroBS.getBoundingClientRect().left + (heroBSWidth / 4);

    const aboutmeLeft = aboutme.getBoundingClientRect().left + (aboutmeStatus.width / 2);
    const portfolioLeft = portfolio.getBoundingClientRect().left + (portfolioStatus.width / 2);
    const contactusLeft = contactus.getBoundingClientRect().left + (contactusStatus.width / 2);

    const aboutmePosition = heroBSLeft - aboutmeLeft < 0 ? (heroBSLeft - aboutmeLeft) * -1 : heroBSLeft - aboutmeLeft;
    const portfolioPosition = heroBSLeft - portfolioLeft < 0 ? (heroBSLeft - portfolioLeft) * -1 : heroBSLeft - portfolioLeft;
    const contactusPosition = heroBSLeft - contactusLeft < 0 ? (heroBSLeft - contactusLeft) * -1 : heroBSLeft - contactusLeft;

    if (aboutmePosition <= aboutmeStatus.range) {
      aboutme.classList.add('on');
      aboutmePopup.classList.add('on');
      keyMove = false;
    }
    if (portfolioPosition <= portfolioStatus.range) {
      portfolio.classList.add('on');
      setSubStatus('cellmove');
    }
    if (contactusPosition <= contactusStatus.range) {
      contactus.classList.add('on');
    }
  }

  if (key === 'Escape') {
    aboutme.classList.remove('on');
    aboutmePopup.classList.remove('on');
    keyMove = true;
  }
}

function aboutmeClose() {
  aboutme.classList.remove('on');
  aboutmePopup.classList.remove('on');
  keyMove = true;
}

export {beltscrollKeydown, aboutmeClose};
