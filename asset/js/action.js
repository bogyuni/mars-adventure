const app = document.querySelector('#app');
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const tileSize = 100;
const hero = document.querySelector('.hero');
const enemy = document.querySelector('.enemy');

const heroStat = {
	posLeft : parseInt(winWidth / 2 / tileSize) * tileSize,
	posTop : parseInt(winHeight / 2 / tileSize) * tileSize
}
const enemyStat = {
	posLeft : parseInt(winWidth / 2 / tileSize) * tileSize,
	posTop : parseInt(winHeight / 4 / tileSize) * tileSize
}

hero.style.left = heroStat.posLeft+'px';
hero.style.top = heroStat.posTop+'px';
enemy.style.left = enemyStat.posLeft+'px';
enemy.style.top = enemyStat.posTop+'px';


window.onkeydown = (e) => {
	let currentLeftPx = window.getComputedStyle(hero).getPropertyValue('left');
	let currentLeft = parseInt(currentLeftPx.split('px')[0]);
	let currentTopPx = window.getComputedStyle(hero).getPropertyValue('top');
	let currentTop = parseInt(currentTopPx.split('px')[0]);

	console.log(currentTop+tileSize, e);

	if (e.key === 'ArrowLeft') {
		hero.style.left = `${currentLeft-tileSize}px`;
	} else if (e.key === 'ArrowRight') {
		hero.style.left = `${currentLeft+tileSize}px`;
	} else if (e.key === 'ArrowUp') {
		hero.style.top = `${currentTop-tileSize}px`;
	} else if (e.key === 'ArrowDown') {
		hero.style.top = `${currentTop+tileSize}px`;
	}
}