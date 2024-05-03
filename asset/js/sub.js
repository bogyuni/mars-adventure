import { STRT } from './subdata.js';

import { subStatus, setSubStatus } from './substatus.js';
import { beltscrollKeyDown, beltscrollKeyUp } from './beltscroll.js';
import { cellmoveKeydown, cellmoveKeyup } from './cellmove.js';


console.log(
  STRT.ABME
)
//.sub-obj.rocket.on 로켓의 착률 시간
const landingTime = 2200;

window.onkeydown = (e) => {
  if (S.keyCheck === true) {
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
  // setSubStatus(subStatus);
  // document.querySelector('#cellmove').style.display = 'none';
  // B.CM.style.display = 'none';

  if (subStatus === 'beltscroll') {
    // document.querySelector('#rocket').classList.add('on');
    C.ROC.classList.add('on');
    setTimeout(function(){
      S.keyCheck = true;
    }, landingTime);
    // document.querySelector('#heroBS').classList.add('on');
    C.HBS.classList.add('on');
  } else if (subStatus === 'cellmove') {
    console.log('Cell move');
  }
};


// document.querySelector('.guide-popup').addEventListener('click', function () {
//   this.remove();
// });