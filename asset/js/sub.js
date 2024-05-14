import { PHASE, STRT, CHAR, CHECK } from './subdata.js';
import { subStatus, setSubStatus } from './substatus.js';
import { beltscrollKeyDown, beltscrollKeyUp } from './beltscroll.js';
import { cellmoveKeydown, cellmoveKeyup } from './cellmove.js';

// 페이지 로드되고 로켓 객체의 착륙 시간
const landingTime = 2200;

window.onkeydown = (e) => {
  if (CHECK.key === true) {
    const key = e.key || e.keyCode;
    if (subStatus === 'beltscroll') {
      beltscrollKeyDown(key);
    } else if (subStatus === 'cellmove') {
      cellmoveKeydown(key);
    }
  } else {
    console.log('키 입력 불가');
  }
};

window.onkeyup = (e) => {
  if (subStatus === 'beltscroll') {
    beltscrollKeyUp();
  } else if (subStatus === 'cellmove') {
    cellmoveKeyup();
  }
};

window.onload = () => {
  PHASE.CM.style.display = 'none';

  if (subStatus === 'beltscroll') {
    CHAR.ROC.classList.add('on');
    setTimeout(function(){
      CHECK.key = true;
    }, landingTime);
    CHAR.HBS.classList.add('on');
  } else if (subStatus === 'cellmove') {
    console.log('Cell move');
  }
};

// 가이드 팝업 제작 중
// document.querySelector('.guide-popup').addEventListener('click', function () {
//   this.remove();
// });