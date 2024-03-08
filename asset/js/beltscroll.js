import {subStatus, setSub} from './substatus.js';

const winWidth = window.innerWidth;
const heroBC = document.querySelector('#heroBC');
const heroBCWidth = heroBC.offsetWidth;
let heroBCX = 200; // 탐색로버의 초기 위치값
const posX = 50; // 이동 거리 단위

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
  if (key === 'ArrowLeft') {
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
  if (key === 'ArrowRight') {
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

  let aboutmeLeft = aboutme.getBoundingClientRect().left + (aboutmeStatus.width / 2);
  let portfolioLeft = portfolio.getBoundingClientRect().left + (portfolioStatus.width / 2);
  let contactusLeft = contactus.getBoundingClientRect().left + (contactusStatus.width / 2);
  let heroBCLeft = heroBC.getBoundingClientRect().left + (heroBCWidth / 4);

  if (key === 'ArrowUp' || key === ' ') {
    const aboutmePosition = heroBCLeft - aboutmeLeft < 0 ? (heroBCLeft - aboutmeLeft) * -1 : heroBCLeft - aboutmeLeft;
    const portfolioPosition = heroBCLeft - portfolioLeft < 0 ? (heroBCLeft - portfolioLeft) * -1 : heroBCLeft - portfolioLeft;
    const contactusPosition = heroBCLeft - contactusLeft < 0 ? (heroBCLeft - contactusLeft) * -1 : heroBCLeft - contactusLeft;

    if (aboutmePosition <= aboutmeStatus.range) {
      aboutmeStatus.open = true;
    } else {
      aboutmeStatus.open = false;
    }
    if (portfolioPosition <= portfolioStatus.range) {
      portfolioStatus.open = true;
    } else {
      portfolioStatus.open = false;
    }
    if (contactusPosition <= contactusStatus.range) {
      contactusStatus.open = true;
    } else {
      contactusStatus.open = false;
    }

    if (aboutmeStatus.open) {
      aboutme.classList.add('on');
      aboutmePopup.classList.add('on');
    }
    if (portfolioStatus.open) {
      portfolio.classList.add('on');
      setSub('cellmove');
      document.querySelector('#beltscroll').style.display = 'none';
      document.querySelector('#cellmove').style.display = 'block';
    }
    if (contactusStatus.open) {
      contactus.classList.add('on');
    }
  }
}

export {beltscrollKeydown};
