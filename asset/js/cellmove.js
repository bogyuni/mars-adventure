import {subStatus, setSub} from './substatus.js';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const tileSize = 100;
const heroCM = document.querySelector('#heroCM');
const enemy = document.querySelector('.enemy');

const heroCMStat = {
	posTop : parseInt(winHeight / 2 / tileSize) * tileSize,
	posLeft : parseInt(winWidth / 2 / tileSize) * tileSize,
	direction : heroCM.dataset.direction = 'right'
}
const enemyStat = {
	posTop : parseInt(winHeight / 4 / tileSize) * tileSize,
	posLeft : parseInt(winWidth / 2 / tileSize) * tileSize
}

heroCM.style.top = heroCMStat.posTop+'px';
heroCM.style.left = heroCMStat.posLeft+'px';
enemy.style.top = enemyStat.posTop+'px';
enemy.style.left = enemyStat.posLeft+'px';

function positionCheck(character, coordinate) {
	let currentCoordinatePx = window.getComputedStyle(character).getPropertyValue(coordinate);
	let currentCoordinate = parseInt(currentCoordinatePx.split('px')[0]);
	return currentCoordinate;
}

function cellmoveKeydown(key) {
	let currentTop = parseInt(positionCheck(heroCM, 'top'));
	let currentLeft = parseInt(positionCheck(heroCM, 'left'));

	if (key === 'ArrowLeft') {
		heroCM.style.left = `${currentLeft-tileSize}px`;
		heroCM.dataset.direction = 'left';
	} else if (key === 'ArrowRight') {
		heroCM.style.left = `${currentLeft+tileSize}px`;
		heroCM.dataset.direction = 'right';
	} else if (key === 'ArrowUp') {
		heroCM.style.top = `${currentTop-tileSize}px`;
		heroCM.dataset.direction = 'up';
	} else if (key === 'ArrowDown') {
		heroCM.style.top = `${currentTop+tileSize}px`;
		heroCM.dataset.direction = 'down';
	}

	heroCM.innerHTML = heroCM.dataset.direction;
}

function cellmoveKeyup(key) {
	let currentTop = parseInt(positionCheck(heroCM, 'top'));
	let currentLeft = parseInt(positionCheck(heroCM, 'left'));
	let enemyTop = parseInt(positionCheck(enemy, 'top'));
	let enemyLeft = parseInt(positionCheck(enemy, 'left'));

	if( enemyTop == currentTop && enemyLeft == currentLeft ) {
		setSub('beltscroll');
		document.querySelector('#beltscroll').style.display = 'block';
		document.querySelector('#cellmove').style.display = 'none';
		heroCM.style.top = heroCMStat.posTop+'px';
		heroCM.style.left = heroCMStat.posLeft+'px';

	} else {
		console.log('top:'+(currentTop), 'left:'+(currentLeft));
	}
}

export {cellmoveKeydown, cellmoveKeyup};