export {subStatus, setSubStatus};

let subStatus = 'beltscroll';
// let subStatus = 'cellmove';
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const winHighRatioSize = winWidth - winHeight > 0 ? winWidth : winHeight;
const heroBS = document.querySelector('#heroBS');

// change over - 화면 전환
function changeOver(direct, subname) {
  const changeOverWrap = document.querySelector('.changeover');
  const overCircle = document.querySelector('#overCircle');

  const heroBSWidth = heroBS.offsetWidth;
  const heroBSHeight = heroBS.offsetHeight;
  const heroBSLeft = heroBS.getBoundingClientRect().left + (heroBSWidth / 2);
  const heroBSTop = heroBS.getBoundingClientRect().top + (heroBSHeight / 2);

  const overCircleDiameter = Math.round(winHighRatioSize * 2.3);
  overCircle.style.width = overCircleDiameter + 'px';
  overCircle.style.height = overCircleDiameter + 'px';

  if (subname === 'cellmove') {
    overCircle.style.left = heroBSLeft + 'px';
    overCircle.style.top = heroBSTop + 'px';
  } else if (subname === 'beltscroll') {
    overCircle.style.left = '50%';
    overCircle.style.top = '50%';
  }

  if (direct === 'in') {
    changeOverWrap.classList.add('on');
    overCircle.style.borderWidth = Math.round(overCircleDiameter / 2) + 'px';
  } else if (direct === 'out') {
    overCircle.style.borderWidth = '0px';
    setTimeout(function(){
      changeOverWrap.classList.remove('on');
    }, 1400);
  }
}

function setSubStatus(val) {
  subStatus = val;
  if (val === 'beltscroll') {
    changeOver('in', 'beltscroll');
    setTimeout(function(){
      document.querySelector('#beltscroll').style.display = 'block';
      document.querySelector('#cellmove').style.display = 'none';
      document.querySelector('.portfolio').classList.remove('on');
      heroBS.classList.add('on');
      changeOver('out', 'cellmove');
    }, 1400);
} else if (val === 'cellmove') {
    changeOver('in', 'cellmove');
    setTimeout(function(){
      document.querySelector('#beltscroll').style.display = 'none';
      document.querySelector('#cellmove').style.display = 'block';
      changeOver('out', 'beltscroll');
    }, 1400);
  }
}
