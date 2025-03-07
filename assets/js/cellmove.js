import { setSubStatus } from './substatus.js';
import { pixelData, pixelDataLoad } from './pixel.js';


// 선택자
const heroCM = document.querySelector('#heroCM'); // 주인공, 개척자
const viewArea = document.querySelector('#viewArea'); // 타일 이동 공간
const portPopup = document.querySelector('#portPopup'); // 팝업
const portPopTit = document.querySelector('#portPopTit'); // 팝업 타이틀
const portPopCap = document.querySelector('#portPopCap'); // 팝업 문구
const portPopLink = document.querySelector('#portPopLink'); // 팝업 링크

const portData = {
	'portfolio': {
		name: 'portfolio',
		tit: 'Project Outputs',
		cap: '회사나 프리로 진행한 프로젝트 산출물',
		url: 'https://bogyuni.github.io/portfolio/',
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
		url: 'https://bogyuni.github.io/dot-editor/',
	},
};

// 픽셀 로드
const pixelList = [
  {uri: pixelData.manFront, obj: heroCM},
];
pixelList.forEach((el) => {
  const custom = el.custom ? el.custom : undefined;
  pixelDataLoad(el.uri, el.obj, custom);
});


// 설정값
const tileSize = 50; // 셀의 사이즈
const delayTime = 101; // 셀 이동 시 딜레이를 주어 연속 이동 제약, 이렇게 안하면 위치값이 어긋남
const viewWidth = viewArea.offsetWidth;
const viewHeight = viewArea.offsetHeight;
let moveCheck = true; // 캐릭터 이동 후 딜레이 체크
let popupCheck = false;

// 주인공 위치값
const heroCMStat = {
	y : parseInt(viewHeight / 2 / tileSize) * tileSize,
	x : parseInt(viewWidth / 2 / tileSize) * tileSize,
};
// 주인공 초기 위치 세팅
heroCM.style.top = heroCMStat.y+'px';
heroCM.style.left = heroCMStat.x+'px';
// 포폴 오브젝트들
const portObjS = document.querySelectorAll('.port-obj');
const portObjAry = [];
// 포폴 정보 세팅
for (let i = 0; i < portObjS.length; i++) {
	portObjAry.push({
		'id': portObjS[i].dataset.id,
		'y': portObjS[i].offsetTop + tileSize,
		'x': portObjS[i].offsetLeft + tileSize,
	});
}


/**
 * 현재 주인공 위치값 계산 함수
 * getComputedStyle 으로 주인공의 모든 css 인자값을 액세스
 * getPropertyValue 으로 left와 top에 대한 정보를 가져옴
 * @param { string } coordinate 좌표값
 * @returns 위치값을 넘버로 반환
 */
function currentPosition(coordinate) {
	const currentCoordinatePx = window.getComputedStyle(heroCM).getPropertyValue(coordinate);
	const currentCoordinate = parseInt(currentCoordinatePx.split('px')[0]);
	return currentCoordinate;
}

/**
 * 셀무브에서 키 입력 받는 함수,
 * 주인공의 이동, 이동 가능 체크, 팝업닫기, 링크 열기 등을 수행한다.
 * @param { string } key 전달 받은 키값
 */
function cellmoveKeydown(key) {
	// 이동 가능상태이고 팝업 오픈이 아니면 이동 실행
	if (moveCheck === true && popupCheck === false) {
		// 이동 하는 시점에서 이동 불가능
		moveCheck = false;

		if (key === 'ArrowLeft') {
			if(currentPosition('left') > 0) {
				heroCM.style.left = `${currentPosition('left') - tileSize}px`;
				heroCM.dataset.direction = 'left';
			} else {
				console.log('Left MAX')
			}
		} else if (key === 'ArrowRight') {
			if (currentPosition('left') < viewWidth - tileSize) {
				heroCM.style.left = `${currentPosition('left') + tileSize}px`;
				heroCM.dataset.direction = 'right';
			} else {
				console.log('Right MAX');
			}
		} else if (key === 'ArrowUp') {
			if (currentPosition('top') > 0) {
				heroCM.style.top = `${currentPosition('top') - tileSize}px`;
				heroCM.dataset.direction = 'up';
			} else {
				console.log('Top MAX');
			}
		} else if (key === 'ArrowDown') {
			if (currentPosition('top') < viewHeight - tileSize) {
				heroCM.style.top = `${currentPosition('top') + tileSize}px`;
				heroCM.dataset.direction = 'down';
			} else {
				console.log('Bottom MAX');
			}
		}

		// heroCM.innerHTML = heroCM.dataset.direction;

		// 이동 후 딜레이 지나면 다시 이동 가능
		setTimeout(function(){
			moveCheck = true;
		}, delayTime);
	}

	// 팝업이 오픈된 상태
	if (popupCheck === true) {
		// esc를 누르면 창닫힘
		if (key === 'Escape') {
			portPopup.classList.remove('open');
			// 팝업이 닫히면 셀 한칸만큼 위로 밀려남
			heroCM.style.top = `${currentPosition('top') + tileSize}px`;
			popupCheck = false;
		}
		// 엔터를 누르면 팝업의 링크를 새창으로 열기
		else if (key === 'Enter') {
			window.open(portPopLink.href, '_blank');
		}
	}
}

/**
 * 포폴 팝업 열기 함수
 * @param { string } id 팝업 고유이름
 */
function openPortPopup(id) {
	portPopup.classList.add('open');
	portPopTit.innerHTML = portData[id].tit;
	portPopCap.innerHTML = portData[id].cap;
	portPopLink.href = portData[id].url;
	popupCheck = true;
}

/**
 * 셀무브에서 키업하면서 작동 하는 트리거 함수
 */
function cellmoveKeyup() {
	if (popupCheck === false) {
		// 이동 후 딜레이 시간을 줘서 이동이 완료되면 트리거 발동
		setTimeout(function(){
			// 반복문을 돌려서 포폴 오브젝트의 위치값을 서칭함
			for (let i = 0; i < portObjAry.length; i++) {
				// 현재 주인공 위치와 겹치는 오브젝트 체크함
				if(portObjAry[i].y == currentPosition('top') && portObjAry[i].x == currentPosition('left')) {
					// 체크된 오브젝트가 exit 인지 체크
					if (portObjAry[i].id === 'exit') {
						// exit 면 벨트스크롤로 전환하고 조인공 위치값은 리셋함
						setSubStatus('beltscroll');
						setTimeout(function(){
							heroCM.style.top = heroCMStat.y+'px';
							heroCM.style.left = heroCMStat.x+'px';
						},1400);
					}
					// exit 가 아니면 해당 포폴 팝업을 오픈한다
					else {
						openPortPopup(portObjAry[i].id);
					}
				}
			}
		}, delayTime);
	}
}

export { cellmoveKeydown, cellmoveKeyup };

console.log('Module loaded - cellmove');
