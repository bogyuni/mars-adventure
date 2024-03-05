const winWidth = window.innerWidth;

const hero = document.querySelector('#hero');
let heroX = 200;
const posX = 100;

const zLine1 = document.querySelector('.z-line-wrap');
let zLine1X = 0;
const zLine2 = document.querySelector('.z-line-back.back1');
let zLine2X = 0;
const zLine3 = document.querySelector('.z-line-back.back2');
let zLine3X = 0;

const mapWidth = winWidth * 2;

window.addEventListener('keydown', (e) => {
  let key = e.key || e.keyCode;
  console.log(key);

  if (key === 'ArrowLeft') {
    if (heroX > winWidth * 0.2) {
      heroX -= posX;
    }
    // bg move
    if (heroX < winWidth * 0.2 && zLine1X > 0 ) {
      zLine1X -= posX * 0.8;
      zLine1.style.transform = 'translateX(-'+zLine1X+'px)';
      zLine2X -= posX * 0.3;
      zLine2.style.transform = 'translateX(-'+zLine2X+'px)';
      zLine3X -= posX * 0.05;
      zLine3.style.transform = 'translateX(-'+zLine3X+'px)';
    }
    hero.classList.remove('right');
    hero.classList.add('left');
  }
  if (key === 'ArrowRight') {
    if (heroX < winWidth * 0.8) {
      heroX += posX;
    }
    // bg move
    if (heroX > winWidth * 0.8 && zLine1X < mapWidth - winWidth) {
      zLine1X += posX * 0.8;
      zLine1.style.transform = 'translateX(-'+zLine1X+'px)';
      zLine2X += posX * 0.3;
      zLine2.style.transform = 'translateX(-'+zLine2X+'px)';
      zLine3X += posX * 0.05;
      zLine3.style.transform = 'translateX(-'+zLine3X+'px)';
    }
    hero.classList.remove('left');
    hero.classList.add('right');
  }
  hero.style.left = heroX+'px';

  if (key === 'ArrowUp' || key === ' ') {
    console.log('ENTER !!');
  }
});
window.addEventListener('keyup', (e) => {
  hero.classList.remove('left');
  hero.classList.remove('right');
});

window.onload = () => {
  document.querySelector('#rocket').classList.add('on');
  hero.classList.add('on');
};

document.querySelector('.guide-popup').addEventListener('click', function () {
  this.remove();
});