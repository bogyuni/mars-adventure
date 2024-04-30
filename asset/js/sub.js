import {subStatus, setSubStatus} from './substatus.js';
import {beltscrollKeyDown, beltscrollKeyUp, aboutmeClose} from './beltscroll.js';
import {cellmoveKeydown, cellmoveKeyup} from './cellmove.js';
import subData from './subdata.js';

subData();

console.log(keyStatusCheck);

/* * module 사용시 주의 사항 *
  기본적으로 module 에서 선언한 변수는 가져올 수 없다.
  winWidth 같은 것도 에러난다.
  그런데 선택자는 가져온다,
  module에서 선언된 hero는 접근이 가능하다.
  대신 ID 속성 값이 지정되어 있어야한다,
  class="hero" 는 id="hero" 가 있어서 접근이 되지만,
  같은 선택자라도 class="aboutme" 는 ID값이 없어서 접근하면 에러난다,

  - 위 내용은 틀렸다. - 2024-04-26
  원래 ID 선택자는 모듈과 상관 없이 그냥 접근이 가능하다.
  따로 변수 지정을 하지 않아도 같은 이름이면 가능함.
*/

document.querySelector('.aboutme-popup .btn-close').onclick = () => {
  aboutmeClose();
};

window.onkeydown = (e) => {
  const key = e.key || e.keyCode;
  if (subStatus === 'beltscroll') {
    beltscrollKeyDown(key);
  } else if (subStatus === 'cellmove') {
    cellmoveKeydown(key);
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
  document.querySelector('#cellmove').style.display = 'none';


  if (subStatus === 'beltscroll') {
    document.querySelector('#rocket').classList.add('on');
    document.querySelector('#heroBS').classList.add('on');
  } else if (subStatus === 'cellmove') {
    console.log('Cell move');
  }
};

// document.querySelector('.guide-popup').addEventListener('click', function () {
//   this.remove();
// });