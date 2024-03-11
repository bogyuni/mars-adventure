// let subStatus = 'beltscroll';
let subStatus = 'cellmove';

function setSubStatus(val) {
  subStatus = val;
  if (val === 'beltscroll') {
    document.querySelector('#beltscroll').style.display = 'block';
    document.querySelector('#cellmove').style.display = 'none';
    document.querySelector('.portfolio').classList.remove('on');
    heroBC.classList.add('on');
  } else if (val === 'cellmove') {
    document.querySelector('#beltscroll').style.display = 'none';
    document.querySelector('#cellmove').style.display = 'block';
  }
}

// setSubStatus(subStatus);

export {subStatus, setSubStatus};