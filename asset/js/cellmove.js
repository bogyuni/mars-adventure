import {setSubStatus} from './substatus.js';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const tileSize = 100;
const delayTime = 201; // 0.2s
let moveCheck = true; // 캐릭터 이동 후 딜레이 체크
const viewWidth = 1000;
const viewHeight = 700;

const heroCM = document.querySelector('#heroCM');
const enemy = document.querySelector('.enemy');

const heroCMStat = {
	posTop : parseInt(viewHeight / 2 / tileSize) * tileSize,
	posLeft : parseInt(viewWidth / 2 / tileSize) * tileSize,
	direction : heroCM.dataset.direction = 'right'
}
const enemyStat = {
	posTop : parseInt(viewHeight / 4 / tileSize) * tileSize,
	posLeft : parseInt(viewWidth / 2 / tileSize) * tileSize
}

heroCM.style.top = heroCMStat.posTop+'px';
heroCM.style.left = heroCMStat.posLeft+'px';
enemy.style.top = enemyStat.posTop+'px';
enemy.style.left = enemyStat.posLeft+'px';

function positionCheck(character, coordinate) {
	const currentCoordinatePx = window.getComputedStyle(character).getPropertyValue(coordinate);
	const currentCoordinate = parseInt(currentCoordinatePx.split('px')[0]);
	return currentCoordinate;
}

function cellmoveKeydown(key) {
	if (moveCheck === true) {
		moveCheck = false;
		const currentTop = parseInt(positionCheck(heroCM, 'top'));
		const currentLeft = parseInt(positionCheck(heroCM, 'left'));

		console.log(currentLeft, currentTop)

		if (key === 'ArrowLeft') {
			if( currentLeft > 0) {
				heroCM.style.left = `${currentLeft-tileSize}px`;
				heroCM.dataset.direction = 'left';
			} else {
				console.log('LEFT MAX')
			}
		} else if (key === 'ArrowRight') {
			if (currentLeft < viewWidth - tileSize) {
				heroCM.style.left = `${currentLeft+tileSize}px`;
				heroCM.dataset.direction = 'right';
			} else {
				console.log('Right MAX');
			}
		} else if (key === 'ArrowUp') {
			if (currentTop > 0) {
				heroCM.style.top = `${currentTop-tileSize}px`;
				heroCM.dataset.direction = 'up';
			} else {
				console.log('Top MAX');
			}
		} else if (key === 'ArrowDown') {
			if (currentTop < viewHeight - tileSize) {
				heroCM.style.top = `${currentTop+tileSize}px`;
				heroCM.dataset.direction = 'down';
			} else {
				console.log('Bottom MAX');
			}
		}
	
		heroCM.innerHTML = heroCM.dataset.direction;

		setTimeout(function(){
			moveCheck = true;
		}, delayTime);
	}
}

function cellmoveKeyup(key) {
		setTimeout(function(){
			const currentTop = parseInt(positionCheck(heroCM, 'top'));
			const currentLeft = parseInt(positionCheck(heroCM, 'left'));
			const enemyTop = parseInt(positionCheck(enemy, 'top'));
			const enemyLeft = parseInt(positionCheck(enemy, 'left'));
		
			if( enemyTop == currentTop && enemyLeft == currentLeft ) {
				setSubStatus('beltscroll');
				heroCM.style.top = heroCMStat.posTop+'px';
				heroCM.style.left = heroCMStat.posLeft+'px';
	
				console.log('Acecss !!');
			} else {
				// console.log('top:'+(currentTop), 'left:'+(currentLeft));
			}
		}, delayTime);
}

export {cellmoveKeydown, cellmoveKeyup};