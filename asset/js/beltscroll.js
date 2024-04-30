import { setSubStatus } from './substatus.js';
import { pixelData, pixelDataLoad } from './pixel.js';

export {beltscrollKeyDown, beltscrollKeyUp, aboutmeClose};


const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const winHighRatioSize = winWidth - winHeight > 0 ? winWidth : winHeight;

// const rocket = document.querySelector('#rocket');
// const heroBS = document.querySelector('#heroBS');
const heroBSWidth = heroBS.offsetWidth;

const posX = 50; // 이동 거리 단위
let heroBSX = 200; // 탐색로버의 초기 위치값
let keyMove = true;

// 1차 배경 선택자 / 바닥, 후경
const ground = document.querySelector('#ground');
const scenery = document.querySelector('#scenery');

pixelDataLoad(pixelData.rocketFire, rocket);
pixelDataLoad(pixelData.rocketObj, rocket);
pixelDataLoad(pixelData.rover, heroBS);
pixelDataLoad(pixelData.roverWheel, heroBS, 'wheelL');
pixelDataLoad(pixelData.roverWheel, heroBS, 'wheelR');

pixelDataLoad(pixelData.rock1, scenery);
pixelDataLoad(pixelData.rock2, scenery);

// 바닥 맵 그리기, 반복 함. 차후에 이미지로 교체할 생각
// 코드가 너무 방대해짐.
function groundRendering() {
  const groundWidth = ground.offsetWidth;
  const groundTileWidth = 120;
  const tileLegth = Math.round(groundWidth / groundTileWidth);
  for (let i = 0; i < tileLegth; i++) {
    pixelDataLoad(pixelData.ground, ground);
  }
}
groundRendering();

// 1차 배경
const zLine1 = document.querySelector('.z-line-wrap');
let zLine1X = 0;
// 2차 배경 / 중간 배경
const zLine2 = document.querySelector('.z-line-back.back1');
let zLine2X = 0;
// 3차 배경 / 최후경
const zLine3 = document.querySelector('.z-line-back.back2');
let zLine3X = 0;
const mapWidth = zLine1.offsetWidth;

const aboutme = document.querySelector('.aboutme');
const aboutmeStatus = {
  open: false,
  width: aboutme.offsetWidth,
  range: aboutme.offsetWidth / 2,
}
// 분기 필요 셀무브랑 겹침
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

// 배경 이동 속도
const zLine2Speed = 0.4;
const zLine3Speed = 0.1;




// 트리거 발동 함수
function activeTrigger() {
  const aboutmeLeft = aboutme.getBoundingClientRect().left + (aboutmeStatus.width / 2);
  const portfolioLeft = portfolio.getBoundingClientRect().left + (portfolioStatus.width / 2);
  const contactusLeft = contactus.getBoundingClientRect().left + (contactusStatus.width / 2);

  const heroBSLeft = heroBS.getBoundingClientRect().left + (heroBSWidth / 4);

  const aboutmePosition = heroBSLeft - aboutmeLeft < 0 ? (heroBSLeft - aboutmeLeft) * -1 : heroBSLeft - aboutmeLeft;
  const portfolioPosition = heroBSLeft - portfolioLeft < 0 ? (heroBSLeft - portfolioLeft) * -1 : heroBSLeft - portfolioLeft;
  const contactusPosition = heroBSLeft - contactusLeft < 0 ? (heroBSLeft - contactusLeft) * -1 : heroBSLeft - contactusLeft;

  // abouteme 오픈 트리거 범위
  if (aboutmePosition <= aboutmeStatus.range) {
    aboutme.classList.add('on');
    aboutmePopup.classList.add('on');
    keyMove = false;
  }
  // 포트폴리오 전환 트리거 범위
  else if (portfolioPosition <= portfolioStatus.range) {
    portfolio.classList.add('on');
    setSubStatus('cellmove');
  }
  // 컨택어스 오픈 트리거 범위
  else if (contactusPosition <= contactusStatus.range) {
    contactus.classList.add('on');
  }
}

function beltscrollKeyDown(key) {
  // 좌측 이동
  if (key === 'ArrowLeft' && keyMove === true) {
    if (heroBSX > winWidth * 0.15) {
      heroBSX -= posX;
    }

    if (heroBSX < winWidth * 0.15 && zLine1X > 0 ) {
      zLine1X -= posX;
      zLine1.style.left = '-'+zLine1X+'px';
      zLine2X -= posX * zLine2Speed;
      zLine2.style.left = '-'+zLine2X+'px';
      zLine3X -= posX * zLine3Speed;
      zLine3.style.left = '-'+zLine3X+'px';
    }
    heroBS.classList.remove('right');
    heroBS.classList.add('left');
    heroBS.classList.add('move');
  }
  // 우측 이동
  else if (key === 'ArrowRight' && keyMove === true) {
    if (heroBSX < winWidth * 0.75) {
      heroBSX += posX;
    }

    if (heroBSX >= winWidth * 0.75 && zLine1X < mapWidth - winWidth) {
      zLine1X += posX;
      zLine1.style.left = '-'+zLine1X+'px';
      zLine2X += posX * zLine2Speed;
      zLine2.style.left = '-'+zLine2X+'px';
      zLine3X += posX * zLine3Speed;
      zLine3.style.left = '-'+zLine3X+'px';
    }
    heroBS.classList.remove('left');
    heroBS.classList.add('right');
    heroBS.classList.add('move');
  }
  // 트리거 발동
  else if (key === 'ArrowUp' || key === ' ') {
    activeTrigger();
  }

  // 취소, 창 닫기
  else if (key === 'ArrowDown' || key === 'Escape') {
    aboutme.classList.remove('on');
    aboutmePopup.classList.remove('on');
    keyMove = true;
  }

  heroBS.style.left = heroBSX+'px';
}

function beltscrollKeyUp() {
  heroBS.classList.remove('move');
}

function aboutmeClose() {
  aboutme.classList.remove('on');
  aboutmePopup.classList.remove('on');
  keyMove = true;
}
