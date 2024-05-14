// PHASE 페이지 영역
const phase = {
  BS: document.querySelector('#beltscroll'),
  CM: document.querySelector('#cellmove'),
};
// CHAR 캐릭터 선택자
const character = {
  ROC: document.querySelector('#rocket'),
  HBS: document.querySelector('#heroBS'),
  HCM: document.querySelector('#heroCM'),
};
// BG 배경
const background = {
  // Belt scroll
  zLine1: document.querySelector('.z-line-wrap'),
  zLine2: document.querySelector('.z-line-back.back1'),
  zLine3: document.querySelector('.z-line-back.back2'),
  ground: document.querySelector('#ground'),
  scenery: document.querySelector('#scenery'),
  // Cell move
};
// STRT 구조들
const structure = {
  BS: {
    AM: document.querySelector('.sub-obj.aboutme'),
    PF: document.querySelector('.sub-obj.portfolio'),
    CU: document.querySelector('.sub-obj.contactus'),
  },
  CM: {
    
  }
}
// POP 팝업
const popup = {
  AM: document.querySelector('.aboutme-popup'),

}
// CHECK 상태 체크 값
const check = {
  key: false, // 최초 키입력 가능 불가능
  popup: false, // 팝업 상태

};

console.log('Module loaded - Sub data');

export {
  phase as PHASE,
  character as CHAR,
  background as BG,
  structure as STRT,
  popup as POP,
  check as CHECK,

};