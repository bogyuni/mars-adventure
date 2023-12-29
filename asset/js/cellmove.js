const app = document.querySelector('#app');
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const tileSize = 100;
const hero = document.querySelector('.hero');
const enemy = document.querySelector('.enemy');

const heroStat = {
	posTop : parseInt(winHeight / 2 / tileSize) * tileSize,
	posLeft : parseInt(winWidth / 2 / tileSize) * tileSize,
	direction : hero.dataset.direction = 'right'
}
const enemyStat = {
	posTop : parseInt(winHeight / 4 / tileSize) * tileSize,
	posLeft : parseInt(winWidth / 2 / tileSize) * tileSize
}

hero.style.top = heroStat.posTop+'px';
hero.style.left = heroStat.posLeft+'px';
enemy.style.top = enemyStat.posTop+'px';
enemy.style.left = enemyStat.posLeft+'px';

function positionCheck(character, coordinate) {
	let currentCoordinatePx = window.getComputedStyle(character).getPropertyValue(coordinate);
	let currentCoordinate = parseInt(currentCoordinatePx.split('px')[0]);
	return currentCoordinate;
}


window.onkeydown = (e) => {
	let currentTop = parseInt(positionCheck(hero, 'top'));
	let currentLeft = parseInt(positionCheck(hero, 'left'));

	if (e.key === 'ArrowLeft')
	{
		hero.style.left = `${currentLeft-tileSize}px`;
		hero.dataset.direction = 'left';
	}
	else if (e.key === 'ArrowRight')
	{
		hero.style.left = `${currentLeft+tileSize}px`;
		hero.dataset.direction = 'right';
	}
	else if (e.key === 'ArrowUp')
	{
		hero.style.top = `${currentTop-tileSize}px`;
		hero.dataset.direction = 'up';
	}
	else if (e.key === 'ArrowDown')
	{
		hero.style.top = `${currentTop+tileSize}px`;
		hero.dataset.direction = 'down';
	}

	hero.innerHTML = hero.dataset.direction;
}

window.onkeyup = (e) => {
	let currentTop = parseInt(positionCheck(hero, 'top'));
	let currentLeft = parseInt(positionCheck(hero, 'left'));
	let enemyTop = parseInt(positionCheck(enemy, 'top'));
	let enemyLeft = parseInt(positionCheck(enemy, 'left'));

	if( enemyTop == currentTop && enemyLeft == currentLeft ) 
	{
		alert('Warnning!!');
	}
	else
	{
		console.log('top:'+(currentTop), 'left:'+(currentLeft));
	}


}