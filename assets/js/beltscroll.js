import { setSubStatus } from './substatus.js';
import { pixelData, pixelDataLoad } from './pixel.js';


// 선택자
const rocket = document.querySelector('#rocket'); // 로켓
const heroBS = document.querySelector('#heroBS'); // 주인공, 탐색로버
const zLine1 = document.querySelector('.z-line-wrap'); // 1차 배경
const zLine2 = document.querySelector('.z-line-back.back1'); // 2차 배경 - 중간 배경
const zLine3 = document.querySelector('.z-line-back.back2'); // 3차 배경 - 최후경
const ground = document.querySelector('#ground'); // 1차 배경 - 바닥
const scenery = document.querySelector('#scenery'); // 1차 배경 - 후경
const aboutme = document.querySelector('.sub-obj.aboutme'); // 구조물 - 어바웃미
const portfolio = document.querySelector('.sub-obj.portfolio'); // 구조물 - 포트폴리오
const guest = document.querySelector('.sub-obj.guest') // 구조물 - 컨택어스
const aboutmePopup = document.querySelector('.aboutme-popup'); // 팝업 - 어바웃미
const guestPopup = document.querySelector('.guest-popup'); // 팝업 - 어바웃미

// 픽셀 로드
const pixelList = [
  {uri: pixelData.rocketFire, obj: rocket},
  {uri: pixelData.rocketObj, obj: rocket},
  {uri: pixelData.rover, obj: heroBS},
  {uri: pixelData.roverWheel, obj: heroBS, custom: 'wheelL'},
  {uri: pixelData.roverWheel, obj: heroBS, custom: 'wheelR'},
  {uri: pixelData.rock1, obj: scenery},
  {uri: pixelData.rock2, obj: scenery},
  {uri: pixelData.aboutme, obj: aboutme},
  {uri: pixelData.portfolio, obj: portfolio},
];

pixelList.forEach((el) => {
  const custom = el.custom ? el.custom : undefined;
  pixelDataLoad(el.uri, el.obj, custom);
});

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

// 배경 설정
const mapWidth = zLine1.offsetWidth; // 전체 맵 가로 크기
let zLine1X = 0; // 1차 배경 x 위치값
let zLine2X = 0; // 2차 배경 x 위치값
let zLine3X = 0; // 3차 배경 x 위치값
const zLine2Speed = 0.4; // 2차 배경 이동 속도
const zLine3Speed = 0.1; // 3차 배경 이동 속도
const winWidth = window.innerWidth;

// 주인공 탐색로버의 키 이동 설정값
const posX = 50; // 이동 거리 단위
let heroBSX = 200; // 탐색로버의 초기 위치값

let popupCheck = false;


function activeTrigger() {
  const heroBSWidth = heroBS.offsetWidth;
  // 구조물들이 트리거 되는 범위는 구조물 크기의 절반 범위
  const aboutmeRange = aboutme.offsetWidth / 2;
  const portfolioRange = portfolio.offsetWidth / 2;
  const guestRange = guest.offsetWidth / 2;
  // 주인공은 영역의 1/4만 걸쳐도 발동 하도록 설정
  const heroBSCenter = heroBS.getBoundingClientRect().left + (heroBSWidth / 4);
  // 구조물 중심위치 설정
  // getBoundingClientRect 을 사용한 이유는, 뷰포트 내에서의 위치값이 필요하기 때문,
  // 스크롤 위치값이 아니라, 배경화면의 위치값을 조정함.
  const aboutmeCenter = aboutme.getBoundingClientRect().left + aboutmeRange;
  const portfolioCenter = portfolio.getBoundingClientRect().left + portfolioRange;
  const guestCenter = guest.getBoundingClientRect().left + guestRange;
  // 주인공과 구조물이 겹치는 설정 값
  const aboutmePosition = heroBSCenter - aboutmeCenter < 0 ? (heroBSCenter - aboutmeCenter) * -1 : heroBSCenter - aboutmeCenter;
  const portfolioPosition = heroBSCenter - portfolioCenter < 0 ? (heroBSCenter - portfolioCenter) * -1 : heroBSCenter - portfolioCenter;
  const guestPosition = heroBSCenter - guestCenter < 0 ? (heroBSCenter - guestCenter) * -1 : heroBSCenter - guestCenter;

  // 어바웃미 오픈 트리거 범위
  if (aboutmePosition <= aboutmeRange) {
    aboutme.classList.add('on');
    aboutmePopup.classList.add('on');
    popupCheck = true;
  }
  // 포트폴리오 트리거 범위 - 이후 셀무브로 페이즈 전환
  else if (portfolioPosition <= portfolioRange) {
    portfolio.classList.add('on');
    setSubStatus('cellmove');
  }
  // 컨택어스 오픈 트리거 범위
  else if (guestPosition <= guestRange) {
    guest.classList.add('on');
    guestPopup.classList.add('on');
    popupCheck = true;
  }
}

/**
 * 배경 이동 함수
 * @param { string } direct 스크롤 이동 방향
 */
function moveBackground(direct) {
  if (direct === 'left') {
    zLine1X -= posX;
    zLine2X -= posX * zLine2Speed;
    zLine3X -= posX * zLine3Speed;
  } else {
    zLine1X += posX;
    zLine2X += posX * zLine2Speed;
    zLine3X += posX * zLine3Speed;
  }
  zLine1.style.left = '-'+zLine1X+'px';
  zLine2.style.left = '-'+zLine2X+'px';
  zLine3.style.left = '-'+zLine3X+'px';
}

function beltscrollKeyDown(key) {
  // 좌측 이동
  if (key === 'ArrowLeft' && popupCheck === false) {
    // 주인공 현재 위치값이 화면크기의 15% 보다 크다면 주인공이 이동함
    if (heroBSX > winWidth * 0.15) {
      heroBSX -= posX;
    }
    // 주인공 현재 위치값이 화면 크기의 15% 보다 작은데, 1차 배경의 위치값이 0보다 크다면,
    // 주인공은 움직이지 않고, 배경이 움직임
    else if (heroBSX < winWidth * 0.15 && zLine1X > 0 ) {
      moveBackground('left');
    }
    else {
      console.log('화면 좌측 끝에 도달함');
    }
    heroBS.classList.remove('right');
    heroBS.classList.add('left', 'move');
  }
  // 우측 이동
  else if (key === 'ArrowRight' && popupCheck === false) {
    // 주인공 현재 위치값이 화면크기의 75% 보다 작으면 주인공이 이동함
    if (heroBSX < winWidth * 0.75) {
      heroBSX += posX;
    }
    // 주인공 현재 위치값이 화면 크기의 75% 보다 크고, 1차 배경의 위치값이 전체맵크기에서 화면 크기를 뺀 값보다 작다면 (1차배경이 화면 우측 끝에 도달하지 않았다면),
    // 주인공은 움직이지 않고, 배경이 움직임
    else if (heroBSX >= winWidth * 0.75 && zLine1X < mapWidth - winWidth) {
      moveBackground('right');
    } else {
      console.log('화면 우측 끝에 도달함');
    }
    heroBS.classList.remove('left');
    heroBS.classList.add('right', 'move');
  }
  // 트리거 발동
  else if (key === 'ArrowUp' || key === ' ') {
    activeTrigger();
  }
  // 취소, 창 닫기
  else if (key === 'ArrowDown' || key === 'Escape') {
    aboutmeClose();
    guestClose();
  }

  heroBS.style.left = heroBSX+'px';
}

function beltscrollKeyUp() {
  heroBS.classList.remove('move');
}

// aboutme 창닫기
function aboutmeClose() {
  aboutme.classList.remove('on');
  aboutmePopup.classList.remove('on');
  popupCheck = false;
}
// aboutme 창닫기
function guestClose() {
  guest.classList.remove('on');
  guestPopup.classList.remove('on');
  popupCheck = false;
}

// 창닫기 버튼 누르면 팝업창 닫음
document.querySelector('.popup .btn-close').onclick = () => {
  aboutmeClose();
  guestClose();
};
// 게스트북 작성 전환
document.querySelector('.btn-guest-write').onclick = () => {
  document.querySelector('.guestlist-wrap').style.display = 'none';
  document.querySelector('.guestform-wrap').style.display = 'block';
}
document.querySelector('.btn-guest-list').onclick = () => {
  document.querySelector('.guestlist-wrap').style.display = 'block';
  document.querySelector('.guestform-wrap').style.display = 'none';
}


export { beltscrollKeyDown, beltscrollKeyUp };

console.log('Module loaded - beltscroll');
