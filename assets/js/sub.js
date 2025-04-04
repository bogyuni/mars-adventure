import { subStatus } from './substatus.js';
import { beltscrollKeyDown, beltscrollKeyUp } from './beltscroll.js';
import { cellmoveKeydown, cellmoveKeyup } from './cellmove.js';

// 페이지 로드되고 로켓 객체의 착륙 시간
const landingTime = 2200;
// 사용자 브라우저 언어 환경
const userLanguage = (navigator.language === 'ko')? 'ko' : 'en';

/**
 * 다국어 관리를 위한 json 텍스트 삽입 함수
 * @param {*} data 
 */
function textInsert(data) {
  const aboutmeTable = document.querySelector('.aboutme-table');
  const aboutmeData = data.aboutme;
  const myself = document.querySelector('.aboutme-myself');
  const myselfData = data.myself;
  myself.append(myselfData);
  // const guestfromSelect = document.querySelector('#guestFrom');
  // const guestfromData = data.guestfrom;

  // aboutme table set
  for (let key in aboutmeData) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    th.append(aboutmeData[key].title);
    if (key === 'skill') {
      td.classList.add('skill-td');
      for (let i = 0; i < aboutmeData[key].data.length; i++) {
        td.innerHTML += `<span>${aboutmeData[key].data[i]}</span>`;
      }
    } else {
      td.append(aboutmeData[key].data);
    }
    tr.append(th, td);
    aboutmeTable.append(tr);
  }

  // guestbook from data insert
  // for (let key in guestfromData) {
  //   const opt = document.createElement('option');
  //   opt.setAttribute('value', key);
  //   opt.append(guestfromData[key]);
  //   guestfromSelect.append(opt);
  // }

}

// 본문의 문구 데이터 불러오기
fetch('./assets/textdata.json')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    textInsert(data[userLanguage]);
  })
  .catch(error => {
    console.error('tabledata error:', error);
  });

// 쿠키 설정 함수
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // days 값을 ms로 변환
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}
// 쿠키 가져오기 함수
function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookie = cookieArr[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring((name.length + 1));
    }
  }
  return null;
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');

  // 가이드 팝업, 쿠키 설정
  const guidePopup = document.querySelector('.guide-popup');
  const closeGuide = document.querySelector('.guide-popup .btn-close');
  const guideToday = document.getElementById('guideToday');

  const noShowGuide = getCookie('noShowGuide');
  if (!noShowGuide) {
    guidePopup.classList.add('open');
  }

  closeGuide.addEventListener('click', function() {
    if (guideToday.checked) {
      setCookie('noShowGuide', true, 1); // 쿠키를 하루 동안 저장
    }
  });
});

window.onkeydown = (e) => {
  if (subStatus.key === true) {
    const key = e.key || e.keyCode;
    if (subStatus.name === 'beltscroll') {
      beltscrollKeyDown(key);
    } else if (subStatus.name === 'cellmove') {
      cellmoveKeydown(key);
    }
  } else {
    console.log('키 입력 불가');
  }
};

window.onkeyup = () => {
  if (subStatus.name === 'beltscroll') {
    beltscrollKeyUp();
  } else if (subStatus.name === 'cellmove') {
    cellmoveKeyup();
  }
};

window.onload = () => {
  console.log('window onload');
  // 페이지가 로드되면 셀무브를 display none 처리한다.
  // 페이지 로드 전에  display none(예:css) 처리하면, 화면의 크기와 같은 값들을 불러올 수 없다.
  document.querySelector('#cellmove').style.display = 'none';

  document.querySelector('body').classList.remove('sub-loading');

  if (subStatus.name === 'beltscroll') {
    // 로켓이 랜딩되도록 클래스 부여
    document.querySelector('#rocket').classList.add('on');
    // 로켓의 랜딩 시간 이후에 키입력 가능
    setTimeout(function(){
      subStatus.key = true;
    }, landingTime);
    // 주인공이 보이도록 클래스 부여
    document.querySelector('#heroBS').classList.add('on');
  } else if (subStatus.name === 'cellmove') {
    console.log('Cell move');
  }

  document.querySelector('.bigsize-popup').addEventListener('click', function() {
    this.style.display = 'none';
  });
};
