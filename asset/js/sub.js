import { PHASE, CHAR, CHECK } from './subdata.js';
import { subStatus } from './substatus.js';
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
  console.log('window onload');
  // 페이지가 로드되면 셀무브를 display none 처리한다.
  // 페이지 로드 전에  display none(예:css) 처리하면, 화면의 크기와 같은 값들을 불러올 수 없다.
  PHASE.CM.style.display = 'none';

  if (subStatus === 'beltscroll') {
    // 로켓이 랜딩되도록 클래스 부여
    CHAR.ROC.classList.add('on');
    // 로켓의 랜딩 시간 이후에 키입력 가능
    setTimeout(function(){
      CHECK.key = true;
    }, landingTime);
    // 주인공이 보이도록 클래스 부여
    CHAR.HBS.classList.add('on');
  } else if (subStatus === 'cellmove') {
    console.log('Cell move');
  }
};

// 가이드 팝업 제작 중
// document.querySelector('.guide-popup').addEventListener('click', function () {
//   this.remove();
// });