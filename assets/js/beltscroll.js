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
const guestbook = document.querySelector('.guestbook-wrap') // 구조물 - 게스트북
const aboutmePopup = document.querySelector('.aboutme-popup'); // 팝업 - 어바웃미
const guestbookPopup = document.querySelector('.guestbook-popup'); // 팝업 - 게스트북
const guidePopup = document.querySelector('.guide-popup'); // 팝업 - 가이드
const profile = document.querySelector('.profile-photo'); // 팝업 - 가이드

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
  {uri: pixelData.guestbook, obj: guestbook},
  {uri: pixelData.profile, obj: profile},
];

pixelList.forEach((el) => {
  const custom = el.custom ? el.custom : undefined;
  pixelDataLoad(el.uri, el.obj, custom);
});

function groundRendering() {
  const groundWidth = ground.offsetWidth;
  const groundTileWidth = 132;
  const tileLegth = Math.round(groundWidth / groundTileWidth) + 2;
  for (let i = 0; i < tileLegth; i++) {
    pixelDataLoad(pixelData.ground, ground);
  }
}
groundRendering();

const BSstate = {
  hero: {
    x: 200, // 화면상의 위치값
    absX: 200, // 절대 위치값
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
  mv: { // movement
    distance: 30,
    direction: null,
    isMoving: false,
    isPopup: false,
  },
  obj: { // structures
    aboutme: {
      x: 1200,
      width: 240,
      max: 1200 + 240,
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
};
const { hero, map, obj, mv } = BSstate;

function moveFrameSet() {
  if (!mv.isMoving) return; // 이미 움직이는 중이면 실행하지 않음

  if (mv.direction === 'right') {
    // 주인공 현재 위치값이 화면크기의 75% 보다 작으면 주인공이 이동함
    if (hero.x < map.winWidth - hero.width) {
      hero.absX += mv.distance;
      hero.x += mv.distance;
    }
    // 1차 배경의 위치값이 전체맵크기에서 화면 크기를 뺀 값보다 작다면 (1차배경이 화면 우측 끝에 도달하지 않았다면),
    // 주인공은 움직이지 않고, 배경이 움직임
    else if (map.zLine1X < map.width - (map.winWidth + hero.width)) {
      hero.absX += mv.distance;
      map.zLine1X += mv.distance;
      map.zLine2X += mv.distance * map.zLine2Speed;
      map.zLine3X += mv.distance * map.zLine3Speed;
    } else {
      console.log('우측 끝에 도달함');
    }
  }
  else if (mv.direction === 'left') {
    // 주인공 현재 위치값이 화면크기의 15% 보다 크다면 주인공이 이동함
    if (hero.x > hero.width) {
      hero.absX -= mv.distance;
      hero.x -= mv.distance;
    }
    // 1차 배경의 위치값이 0보다 크다면,
    // 주인공은 움직이지 않고, 배경이 움직임
    else if (map.zLine1X > 0) {
      hero.absX -= mv.distance;
      map.zLine1X -= mv.distance;
      map.zLine2X -= mv.distance * map.zLine2Speed;
      map.zLine3X -= mv.distance * map.zLine3Speed;
    } else {
      console.log('좌측 끝에 도달함');
    }
  }

  heroBS.style.left = `${hero.x}px`;
  zLine1.style.transform = `translateX(-${map.zLine1X}px)`;
  zLine2.style.transform = `translateX(-${map.zLine2X}px)`;
  zLine3.style.transform = `translateX(-${map.zLine3X}px)`;
  requestAnimationFrame(moveFrameSet);
}

function startMoving(direct) {
  if (!mv.isMoving) {
    mv.direction = direct;
    mv.isMoving = true;
    heroBS.classList.add('move');
    requestAnimationFrame(moveFrameSet);
  }
}

function stopMoving() {
  mv.isMoving = false;
}

function activeTrigger() {
  const triggers = [
    { name: obj.aboutme, popup: aboutmePopup },
    { name: obj.portfolio, action: () => setSubStatus('cellmove') },
    { name: obj.guestbook, popup: guestbookPopup }
  ];

  triggers.forEach(({ name, popup, action }) => {
    if (hero.absX >= name.x && hero.absX <= name.max) {
      if (popup) {
        mv.isPopup = true;
        popup.classList.add('open');
      } else if (action) {
        action();
      }
    }
  });
}

function beltscrollKeyDown(key) {
  if (key === 'ArrowRight' && !mv.isPopup) {
    startMoving('right');
    heroBS.classList.remove('left');
  }
  else if (key === 'ArrowLeft' && !mv.isPopup) {
    startMoving('left');
    heroBS.classList.add('left');
  }
  // 트리거 발동
  else if (key === 'ArrowUp' || key === ' ') {
    activeTrigger();
    heroBS.classList.add('up');
  }
  // 취소, 창 닫기
  else if (key === 'ArrowDown' || key === 'Escape') {
    closePopup();
  }
}

function beltscrollKeyUp() {
  heroBS.classList.remove('move', 'up');
  stopMoving(); // 키를 떼면 이동 중지
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

// 브라우저 크기 변경 대응
function winDebounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}
window.addEventListener('resize', winDebounce(() => { map.winWidth = window.innerWidth; }, 200));


export { beltscrollKeyDown, beltscrollKeyUp };

console.log('Module loaded - beltscroll');