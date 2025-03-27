/**
 * 서브페이지의 페이즈에 대한 상태 값
 * 처음 진입할 때는 벨트스트롤(beltscroll)로 시작, 키입력 불가
 * @type { object } 서브 상태
 * */
const subStatus = {
  name: 'beltscroll',
  key: false,
  popup: false,
};

// 브라우저 크기 설정
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
// 가로세로비율에 따른 크기 비교
const winHighRatioSize = winWidth - winHeight > 0 ? winWidth : winHeight;
// 벨트스크롤에서 조작하는 주인공 선택자
const heroBS = document.querySelector('#heroBS');
// 화면전환 선택자
const changeOverWrap = document.querySelector('.changeover');
const overCircle = document.querySelector('#overCircle');
// 화면전환되는 시간
const changeTime = 1400;

/**
 * 화면전환 효과 함수
 * 페이즈 이동하면서 화면이 전환되는 효과를 담당하며, 키입력과 같은 상태값을 제어한다.
 * @param { string } direct 방향을 나타냄, in, out
 * @param { string } subname 서브 페이즈 이름, beltscroll, cellmove
 */
function changeOver(direct, subname) {
  // 화면전환 시 키입력 불가
  // subChange = true;
  subStatus.key = false;
  // 벨트스크롤은 주인공 객체의 현재위치에 전환 효과가 집중되어야함.
  // 현재 주인공 객체의 위치값을 받아옴
  const heroBSWidth = heroBS.offsetWidth;
  const heroBSHeight = heroBS.offsetHeight;
  // rover는 5px dot으로 새로 만들어야함. 임시로 1/2 스케일 적용
  const heroBSLeft = heroBS.getBoundingClientRect().left + (heroBSWidth / 4);
  const heroBSTop = heroBS.getBoundingClientRect().top + (heroBSHeight / 4);
  // 화면전환 원의 사이즈 지정, 사이즈는 화면 가로세로 비율 중 큰 사이즈의 2.3배로 지정,
  // 이렇게 해야 큰 쪽(가로든 세로든) 화면 끝까지 커버가 가능함
  const overCircleDiameter = Math.round(winHighRatioSize * 2.3);
  overCircle.style.width = overCircleDiameter + 'px';
  overCircle.style.height = overCircleDiameter + 'px';

  // 셀무브로 페이즈 전환 할 때는, 현재 주인공 객체의 위치로 지정
  if (subname === 'cellmove') {
    overCircle.style.left = heroBSLeft + 'px';
    overCircle.style.top = heroBSTop + 'px';
  }
  // 벨트스크롤로 전환 할 때는, 화면의 중앙으로 위치 지정
  else if (subname === 'beltscroll') {
    overCircle.style.left = '50%';
    overCircle.style.top = '50%';
  }

  // 들어가는 모션
  if (direct === 'in') {
    changeOverWrap.classList.add('on');
    overCircle.style.borderWidth = Math.round(overCircleDiameter / 2) + 'px';
  }
  // 나가는 모션
  else if (direct === 'out') {
    overCircle.style.borderWidth = '0px';
    // 화면전환 종료, 나가는 모션 시작하면 키입력 가능
    // subChange = false;
    subStatus.key = true;
    // 화면전환 효과가 끝나면, 화면전환효과의 래핑 객체를 줄임 처리
    setTimeout(function(){
      changeOverWrap.classList.remove('on');
    }, changeTime);
  }
}

/**
 * 서브페이지 상태 관리하는 함수
 * 페이즈 전환에 따른 각각의 요소들 세팅과 화면전환효과를 담당
 * @param { string } val 전달 받은 페이즈 이름
 */
function setSubStatus(val) {
  // 전달 받은 이름은 현재 서브 상태값에 저장
  subStatus.name = val;
  if (val === 'beltscroll') {
    changeOver('in', 'beltscroll');
    // 전환효과의 진행 시간 동안 벨트스크롤에 대한 세팅
    setTimeout(function(){
      document.querySelector('#beltscroll').style.display = 'block';
      document.querySelector('#cellmove').style.display = 'none';
      // document.querySelector('.sub-obj.portfolio').classList.remove('on');
      heroBS.classList.add('on');
      changeOver('out', 'cellmove');
    }, changeTime);
  } else if (val === 'cellmove') {
    changeOver('in', 'cellmove');
    // 전환효과의 진행 시간 동안 셀무브에 대한 세팅
    setTimeout(function(){
      document.querySelector('#beltscroll').style.display = 'none';
      document.querySelector('#cellmove').style.display = 'block';
      changeOver('out', 'beltscroll');
    }, changeTime);
  }
}

export { subStatus, setSubStatus };

console.log('Module loaded - Sub status');
