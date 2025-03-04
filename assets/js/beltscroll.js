import { setSubStatus } from './substatus.js';
import { pixelData, pixelDataLoad } from './pixel.js';


// 선택자
const rocket = document.querySelector('#rocket'); // 로켓
const heroBS = document.querySelector('#heroBS'); // 주인공, 탐색로버
const zLine1 = document.querySelector('.z-line-back.back1'); // 1차 배경
const zLine2 = document.querySelector('.z-line-back.back2'); // 2차 배경 - 중간 배경
const zLine3 = document.querySelector('.z-line-back.back3'); // 3차 배경 - 최후경
const ground = document.querySelector('.ground'); // 1차 배경 - 바닥
const scenery = document.querySelector('.scenery'); // 1차 배경 - 후경
const aboutme = document.querySelector('.aboutme-wrap'); // 구조물 - 어바웃미
const portfolio = document.querySelector('.portfolio-wrap'); // 구조물 - 포트폴리오
const portfolioHover = portfolio.querySelector('.hover-con'); // 구조물 - 포트폴리오 hover
const guestbook = document.querySelector('.guestbook-wrap') // 구조물 - 게스트북
const guestbookHover = guestbook.querySelector('.hover-con') // 구조물 - 게스트북
const aboutmePopup = document.querySelector('.aboutme-popup'); // 팝업 - 어바웃미
const guestbookPopup = document.querySelector('.guestbook-popup'); // 팝업 - 게스트북
const guidePopup = document.querySelector('.guide-popup'); // 팝업 - 가이드

// 픽셀 로드
const pixelList = [
  {uri: pixelData.rocketFire, obj: rocket},
  {uri: pixelData.rocketObj, obj: rocket},
  {uri: pixelData.rover, obj: heroBS},
  {uri: pixelData.roverWheel, obj: heroBS, custom: 'wheel wheel1'},
  {uri: pixelData.roverWheel, obj: heroBS, custom: 'wheel wheel2'},
  {uri: pixelData.roverWheel, obj: heroBS, custom: 'wheel wheel3'},
  {uri: pixelData.roverLight, obj: heroBS},
  {uri: pixelData.rock1, obj: scenery},
  // {uri: pixelData.rock2, obj: scenery},
  {uri: pixelData.aboutme, obj: aboutme},
  {uri: pixelData.portfolio, obj: portfolio},
  {uri: pixelData.portfolioHover, obj: portfolioHover},
  {uri: pixelData.guestbook, obj: guestbook},
  {uri: pixelData.guestbookHover, obj: guestbookHover},
];

pixelList.forEach((el) => {
  const custom = el.custom ? el.custom : undefined;
  pixelDataLoad(el.uri, el.obj, custom);
});

function groundRendering() {
  const groundWidth = ground.offsetWidth;
  const groundTileWidth = 300;
  const tileLegth = Math.round(groundWidth / groundTileWidth) + 2;
  for (let i = 0; i < tileLegth; i++) {
    pixelDataLoad(pixelData.ground, ground);
  }
}
groundRendering();

const BSstate = {
  hero: {
    x: 200,
    absX: 200,
    width: 116,
    height: 96,
  },
  map: {
    width: 4000,
    winWidth: window.innerWidth,
    zLine1X: 0,
    zLine2X: 0,
    zLine3X: 0,
    zLine2Speed: 0.4,
    zLine3Speed: 0.1,
  },
  obj: { // structures
    aboutme: {
      x: 1200,
      width: 265,
      max: 1200 + 265,
    },
    portfolio: {
      x: 1900,
      width: 544,
      max: 1900 + 544,
    },
    guestbook: {
      x: 3000,
      width: 592,
      max: 3000 + 592,
    },
  },
  mv: { // movement
    direction: null,
    distance: 20,
    isMoving: false,
    isPopup: false,
  }
};
const { hero, map, obj, mv } = BSstate;

function activeTrigger(status) {
  const triggers = [
    { name: 'aboutme', dom: aboutme, popup: aboutmePopup },
    { name: 'portfolio', dom: portfolio, action: () => setSubStatus('cellmove') },
    { name: 'guestbook', dom: guestbook, popup: guestbookPopup }
  ];

  triggers.forEach(({ name, dom, popup, action }) => {
    const objTarget = obj[name];
    const domTarget = dom;

    if (hero.absX >= objTarget.x && hero.absX <= objTarget.max) {
      if (status === 'action') {
        if (popup) {
          popup.classList.add('open');
          mv.isPopup = true;
        } else if (action) {
          action();
        }
      } else if (status === 'move') {
        domTarget.classList.add('on');
      }
    } else {
      domTarget.classList.remove('on');
    }
  });
}

function moveBackground(direction) {
  if (direction === 'left') {
    map.zLine1X -= mv.distance;
    map.zLine2X -= mv.distance * map.zLine2Speed;
    map.zLine3X -= mv.distance * map.zLine3Speed;
  } else if (direction === 'right') {
    map.zLine1X += mv.distance;
    map.zLine2X += mv.distance * map.zLine2Speed;
    map.zLine3X += mv.distance * map.zLine3Speed;
  }
  zLine1.style.transform = `translateX(-${map.zLine1X}px)`;
  zLine2.style.transform = `translateX(-${map.zLine2X}px)`;
  zLine3.style.transform = `translateX(-${map.zLine3X}px)`;
}

function beltscrollKeyDown(key) {
  if ((key === 'ArrowRight' || key === 'ArrowLeft') && !mv.isPopup) {
    // 우측 이동
    if (key === 'ArrowRight') {
      // 주인공 현재 위치값이 화면크기의 75% 보다 작으면 주인공이 이동함
      if (hero.x < map.winWidth * 0.75 + hero.width) {
        hero.x += mv.distance;
        hero.absX += mv.distance;
      }
      // 1차 배경의 위치값이 전체맵크기에서 화면 크기를 뺀 값보다 작다면 (1차배경이 화면 우측 끝에 도달하지 않았다면),
      // 주인공은 움직이지 않고, 배경이 움직임
      else if (map.zLine1X < map.width - map.winWidth * 1.15) {
        moveBackground('right');
        hero.absX += mv.distance;
      } else {
        console.log('화면 우측 끝에 도달함');
      }
      heroBS.classList.remove('left');
    }
    // 좌측 이동
    if (key === 'ArrowLeft') {
      // 주인공 현재 위치값이 화면크기의 15% 보다 크다면 주인공이 이동함
      if (hero.x > map.winWidth * 0.15) {
        hero.x -= mv.distance;
        hero.absX -= mv.distance;
      }
      // 1차 배경의 위치값이 0보다 크다면,
      // 주인공은 움직이지 않고, 배경이 움직임
      else if (map.zLine1X > 0) {
        moveBackground('left')
        hero.absX -= mv.distance;
      } else {
        console.log('화면 좌측 끝에 도달함');
      }
      heroBS.classList.add('left');
    }

    heroBS.classList.add('move');
    activeTrigger('move');
    heroBS.style.left = `${hero.x}px`;
  }

  // 트리거 발동
  if (key === 'ArrowUp' || key === ' ') {
    activeTrigger('action');
    heroBS.classList.add('up');
  }

  // 취소, 창 닫기
  if (key === 'ArrowDown' || key === 'Escape') {
    closePopup()
  }


  // console.log(
  //   'hero.absX : '+hero.absX,
  //   ' min : '+obj.aboutme.x,
  //   ' max : '+obj.aboutme.max,
  // )
}

function beltscrollKeyUp() {
  heroBS.classList.remove('move', 'up');
  // stopMoving(); // 키를 떼면 이동 중지
}

// 팝업 닫기
function closePopup() {
  const openPopup = document.querySelectorAll('.popup.open');
  openPopup.forEach(popup => popup.classList.remove('open'));
  mv.isPopup = false;
}

// 창닫기 버튼 누르면 팝업창 닫음
const popupCloseBtn = document.querySelectorAll('.popup .btn-close');
popupCloseBtn.forEach(btn => {
  btn.onclick = () => {
    closePopup();
  };
});

export { beltscrollKeyDown, beltscrollKeyUp };

console.log('Module loaded - beltscroll');