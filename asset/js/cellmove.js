import {setSubStatus} from './substatus.js';

const heroCM = document.querySelector('#heroCM');
const viewArea = document.querySelector('#viewArea');
const tileSize = 50;
const delayTime = 101; // 0.101s
const viewWidth = viewArea.offsetWidth;
const viewHeight = viewArea.offsetHeight;
let moveCheck = true; // 캐릭터 이동 후 딜레이 체크
let popupOpenCheck = false;
const heroCMStat = {
	y : parseInt(viewHeight / 2 / tileSize) * tileSize,
	x : parseInt(viewWidth / 2 / tileSize) * tileSize,
	direction : heroCM.dataset.direction = 'right'
};
heroCM.style.top = heroCMStat.y+'px';
heroCM.style.left = heroCMStat.x+'px';

const portObjS = document.querySelectorAll('.port-obj');
const portObjAry = [];

for (let i = 0; i < portObjS.length; i++) {
	portObjAry.push({
		'id': portObjS[i].dataset.id,
		'y': portObjS[i].offsetTop + tileSize,
		'x': portObjS[i].offsetLeft + tileSize,
	});
}

const portData = {
	'portfolio': {
		name: 'portfolio',
		tit: 'Project Outputs',
		cap: '회사나 프리로 진행한 프로젝트 산출물, 저장소의 오타 portpolio는 신경쓰지 말자.',
		url: 'https://bogyuni.github.io/portpolio/',
	},
	'benchmarking': {
		name: 'benchmarking',
		tit: 'Benchmarking Tech',
		cap: '쓸만한 플러그인이나 구현 기술들',
		url: 'https://bogyuni.github.io/benchmarking/',
	},
	'game': {
		name: 'game',
		tit: 'Game List',
		cap: '간단하게 구현한 미니게임들',
		url: 'https://bogyuni.github.io/game/',
	},
	'doteditor': {
		name: 'doteditor',
		tit: 'Dot Editor',
		cap: '도트를 찍어서 픽셀 아트를 만드는 에디터, 이 홈페이지를 구성하기 위해 제작했다.',
		url: 'https://bogyuni.github.io/DotEditor/',
	},
};

const portPopup = document.querySelector('#portPopup');
const portPopTit = document.querySelector('#portPopTit');
const portPopCap = document.querySelector('#portPopCap');
const portPopLink = document.querySelector('#portPopLink');



function positionCheck(character, coordinate) {
	const currentCoordinatePx = window.getComputedStyle(character).getPropertyValue(coordinate);
	const currentCoordinate = parseInt(currentCoordinatePx.split('px')[0]);
	return currentCoordinate;
}

function cellmoveKeydown(key) {
	if (moveCheck === true && popupOpenCheck === false) {
		moveCheck = false;
		const currentTop = parseInt(positionCheck(heroCM, 'top'));
		const currentLeft = parseInt(positionCheck(heroCM, 'left'));

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
	if (popupOpenCheck === true) {
		if (key === 'Escape') {
			portPopup.classList.remove('open');
			const currentTop = parseInt(positionCheck(heroCM, 'top'));
			heroCM.style.top = `${currentTop+tileSize}px`;
			popupOpenCheck = false;
		} else if (key === 'Enter') {
			window.open(portPopLink.href, '_blank');
		}
	}
}

function openPortPopup(id) {
	portPopup.classList.add('open');
	portPopTit.innerHTML = portData[id].tit;
	portPopCap.innerHTML = portData[id].cap;
	portPopLink.href = portData[id].url;
	popupOpenCheck = true;
}

function cellmoveKeyup(key) {
	if (popupOpenCheck === false) {
		setTimeout(function(){
			const currentTop = parseInt(positionCheck(heroCM, 'top'));
			const currentLeft = parseInt(positionCheck(heroCM, 'left'));

			for (let i = 0; i < portObjAry.length; i++) {
				if(portObjAry[i].y == currentTop && portObjAry[i].x == currentLeft) {
					if (portObjAry[i].id === 'exit') {
						heroCM.style.top = heroCMStat.y+'px';
						heroCM.style.left = heroCMStat.x+'px';
						setSubStatus('beltscroll');
					} else {
						openPortPopup(portObjAry[i].id);
					}
				}
			}
		}, delayTime);
	}
}

export {cellmoveKeydown, cellmoveKeyup};