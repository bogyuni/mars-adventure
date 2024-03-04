const hero = document.querySelector('#hero');
let heroX = 200;
const posX = 100;
const winWidth = window.innerWidth;

const scenery = document.querySelector('.scenery');
let sceneryX = 0;
const mapWidth = winWidth * 2;
// console.log(mapWidth);

window.addEventListener('keydown', (e) => {
  let key = e.key || e.keyCode;
  console.log(key);

  if (key === 'ArrowLeft') {
    if (heroX > winWidth * 0.2) {
      heroX -= posX;
    }
    // bg move
    if (heroX < winWidth * 0.2 && sceneryX > 0 ) {
      sceneryX -= posX * 0.8;
      scenery.style.transform = 'translateX(-'+sceneryX+'px)';
    }
  }
  if (key === 'ArrowRight') {
    if (heroX < winWidth * 0.8) {
      heroX += posX;
    }
    // bg move
    if (heroX > winWidth * 0.8 && sceneryX < mapWidth - winWidth) {
      sceneryX += posX * 0.8;
      scenery.style.transform = 'translateX(-'+sceneryX+'px)';
    }
  }
  hero.style.left = heroX+'px';

  if (key === 'ArrowUp' || key === ' ') {
    console.log('ENTER !!');
  }

  // console.log(heroX, sceneryX);

});


document.querySelector('.guide-popup').addEventListener('click', function () {
  console.log(this);
  this.remove();
});