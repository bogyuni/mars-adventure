import {setSubStatus} from './substatus.js';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const tileSize = 50;
const delayTime = 101; // 0.2s
let moveCheck = true; // 캐릭터 이동 후 딜레이 체크
const viewWidth = 1000;
const viewHeight = 700;

const heroCM = document.querySelector('#heroCM');
const exit = document.querySelector('#exit');

const heroCMStat = {
	posTop : parseInt(viewHeight / 2 / tileSize) * tileSize,
	posLeft : parseInt(viewWidth / 2 / tileSize) * tileSize,
	direction : heroCM.dataset.direction = 'right'
}
const exitStat = {
	// posTop : parseInt(viewHeight / 4 / tileSize) * tileSize,
	// posLeft : parseInt(viewWidth / 2 / tileSize) * tileSize
	posTop : exit.offsetTop,
	posLeft : exit.offsetLeft,
}

heroCM.style.top = heroCMStat.posTop+'px';
heroCM.style.left = heroCMStat.posLeft+'px';
// exit.style.top = exitStat.posTop+'px';
// exit.style.left = exitStat.posLeft+'px';

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

		// console.log(currentLeft, currentTop)

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
			// const exitTop = parseInt(positionCheck(exit, 'top'));
			// const exitLeft = parseInt(positionCheck(exit, 'left'));
			const exitTop = tileSize * 1;
			const exitLeft = tileSize * 10;

			if( exitTop == currentTop && exitLeft == currentLeft ) {
				setSubStatus('beltscroll');
				heroCM.style.top = heroCMStat.posTop+'px';
				heroCM.style.left = heroCMStat.posLeft+'px';
	
				console.log('Acecss !!');
			} else {
				console.log(exitTop, exitLeft, typeof exitLeft, typeof currentLeft);
				console.log('top:'+(currentTop), 'left:'+(currentLeft));
			}
		}, delayTime);
}

export {cellmoveKeydown, cellmoveKeyup};