import {setSubStatus} from './substatus.js';

const winWidth = window.innerWidth;
let keyMove = true;
const heroBC = document.querySelector('#heroBC');
const heroBCWidth = heroBC.offsetWidth;
const posX = 50; // 이동 거리 단위
let heroBCX = 200; // 탐색로버의 초기 위치값

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
    if (heroBCX > winWidth * 0.15) {
      heroBCX -= posX;
    }

    if (heroBCX < winWidth * 0.15 && zLine1X > 0 ) {
      zLine1X -= posX;
      zLine1.style.left = '-'+zLine1X+'px';
      zLine2X -= posX * 0.3;
      zLine2.style.left = '-'+zLine2X+'px';
      zLine3X -= posX * 0.05;
      zLine3.style.left = '-'+zLine3X+'px';
    }
    heroBC.classList.remove('right');
    heroBC.classList.add('left');
    heroBC.classList.add('move');
  }
  if (key === 'ArrowRight' && keyMove === true) {
    if (heroBCX < winWidth * 0.75) {
      heroBCX += posX;
    }

    if (heroBCX >= winWidth * 0.75 && zLine1X < mapWidth - winWidth) {
      zLine1X += posX;
      zLine1.style.left = '-'+zLine1X+'px';
      zLine2X += posX * 0.3;
      zLine2.style.left = '-'+zLine2X+'px';
      zLine3X += posX * 0.05;
      zLine3.style.left = '-'+zLine3X+'px';
    }
    heroBC.classList.remove('left');
    heroBC.classList.add('right');
    heroBC.classList.add('move');
  }
  heroBC.style.left = heroBCX+'px';

  if (key === 'ArrowUp' || key === ' ') {
    const heroBCLeft = heroBC.getBoundingClientRect().left + (heroBCWidth / 4);

    const aboutmeLeft = aboutme.getBoundingClientRect().left + (aboutmeStatus.width / 2);
    const portfolioLeft = portfolio.getBoundingClientRect().left + (portfolioStatus.width / 2);
    const contactusLeft = contactus.getBoundingClientRect().left + (contactusStatus.width / 2);

    const aboutmePosition = heroBCLeft - aboutmeLeft < 0 ? (heroBCLeft - aboutmeLeft) * -1 : heroBCLeft - aboutmeLeft;
    const portfolioPosition = heroBCLeft - portfolioLeft < 0 ? (heroBCLeft - portfolioLeft) * -1 : heroBCLeft - portfolioLeft;
    const contactusPosition = heroBCLeft - contactusLeft < 0 ? (heroBCLeft - contactusLeft) * -1 : heroBCLeft - contactusLeft;

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
