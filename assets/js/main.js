import * as THREE from "three";
import { pixelData, pixelDataLoad } from "./pixel.js";

const winHeight = window.innerHeight;
const mainWrap = document.querySelector('.main-wrap');
const backSpace = document.querySelector('.back-space');
const introBG = document.querySelector('.intro-bg');
const guideScroll = document.querySelector('.guide-scroll');

const earth = document.querySelector('#earth');
const mars = document.querySelector('#mars');
const moon = document.querySelector('#moon');
const satellite = document.querySelector('#satellite');
const rocket = document.querySelector('#rocket');

const commentBox = document.querySelector('.comment-box');

pixelDataLoad(pixelData.rocketFire, rocket);
pixelDataLoad(pixelData.rocketObj, rocket);


/**
 * Main 페이지 Canvas object 생성 함수
 * @param {object} objDom canvas 선택자
 * @param {number} canvasWidth canvas width size
 * @param {number} canvasHeight canvas height size
 * @param {string} objColor object color
 * @param {string} objType geometry type
 */
function createMainCanvas(objDom, canvasWidth, canvasHeight, objColor, objType) {
  const renderer = new THREE.WebGLRenderer({ canvas: objDom, alpha: true, premultipliedAlpha: false, });
  const cameraWidth = canvasWidth; // canvas width
  const cameraHeight = canvasHeight; // canvas height
  const fov = 70;  // field of view(시야각) 수직면 X도로 설정
  const aspect = cameraWidth / cameraHeight; // 비율
  const near = 0.1; // near, far : 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2; // 카메라는 -Z 축 + Y 축으로 아래를 보게한다

  let geometry = '';
  const radius = 1.1;
  var material = '';

  if (objType === 'earth') {
    geometry = new THREE.SphereGeometry(1, 32, 32);
    // geometry = new THREE.TetrahedronGeometry(1, 13);
    material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./assets/img/earth_dot.png'),
      // bumpMap: new THREE.TextureLoader().load('./assets/img/earth_clouds.jpeg'),
      // bumpScale: 1,
      // specularMap: new THREE.TextureLoader().load('./assets/img/earth.jpg'),
      // specular: new THREE.Color('grey')
    });
  } else if (objType === 'moon') {
    geometry = new THREE.TetrahedronGeometry(1, 8);
    material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./assets/img/moon_dot.png'),
    });
  } else if (objType === 'mars') {
    // geometry = new THREE.SphereGeometry(1, 32, 32);
    geometry = new THREE.TetrahedronGeometry(1, 8);
    material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./assets/img/mars_dot.png'),
    });
  }

  // Meterial을 만들어 색을 지정, 색 지정은 CSS 처럼 hex 코드를 사용
  // const material = new THREE.MeshPhongMaterial({ color: objColor, flatShading: true });
  // 앞서 만든 물체와 색을 이용해 Mesh를 생성
  const sphere = new THREE.Mesh( geometry, material );

  const scene = new THREE.Scene(); // Scene을 생성
  scene.add( sphere ); // Scene에 삽입

  // 애니메이션을 구현하기 위해 requestAnimationFrame 루프로 렌더링 함수를 호출
  function animate(time) {
    time *= 0.0001;  // convert time to seconds
    // sphere.rotation.x = time;
    sphere.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // 광원을 추가하여 그림자 생성
  var ambientLight = new THREE.AmbientLight(0x404040);  // Soft white light
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);
  // DirectionalLight에 위치(position)와 타깃(target) 속성이 있다.
  // 기본 값은 (0, 0, 0) 으로 position 을 (-1, 2, 4)로 설정해 약간 동서쪽으로 보낸다.
  // target은 기본값 (0, 0, 0) 그대로 두어 공간 중앙에 비춘다.

  // 계단 현상을 제거하기
  renderer.setSize(cameraWidth, cameraHeight, false);
  // renderer.setPixelRatio(window.devicePixelRatio);
}
createMainCanvas(earth, 500, 500, 0xaa8844, 'earth');
createMainCanvas(moon, 300, 300, 0xaa8844, 'moon');
createMainCanvas(mars, 600, 600, 0xaa8844, 'mars');

// const earthTop = winHeight * 2; // earth의 offsetTop은 화면 크기의 2배 위치
const earthWrap = document.querySelector('.earth-wrap');
let earthTop = 0;
const earthScaleMax = 1.6;
const earthScaleStand = 0.0005;
let earthStart = 0;
let earthScaleSet = 0;
let satelliteStart = 0;

const marsWrap = document.querySelector('.mars-wrap');
let marsTop = 0;

window.onload = () => {
  earthTop = earthWrap.offsetTop - winHeight;
  marsTop = marsWrap.offsetTop;

  const devGuideLine = document.querySelector('.dev-guide-line');
  if(devGuideLine != null && !devGuideLine) {
    const maxHeight = mainWrap.offsetHeight;
    const winHeightLength = parseInt(maxHeight / winHeight);
    for (let i = 0; i < winHeightLength; i++) {
      devGuideLine.innerHTML += '<div class="in-line" style="top:'+ winHeight * i +'px">win: '+ i +'</div>';
    }
  }

} // window load

window.onresize = () => {
  earthTop = earthWrap.offsetTop - winHeight;
  marsTop = marsWrap.offsetTop;
} // window resize

window.onscroll = () => {
  if (window.scrollY > 10) {
    guideScroll.classList.add('scrolled');
    introBG.classList.add('scrolled');
  } else {
    guideScroll.classList.remove('scrolled');
    introBG.classList.remove('scrolled');
  }
  mainWrap.style.backgroundPosition = 'center -' + (window.scrollY / 18)+'px';
  backSpace.style.backgroundPosition = 'center -' + (window.scrollY / 8)+'px';

  earthStart = window.scrollY - earthTop <= 0 ? 0 : window.scrollY - earthTop;
	earthScaleSet = earthStart * earthScaleStand > earthScaleMax ? earthScaleMax : earthStart * earthScaleStand;
  earth.style.transform = 'scale('+ earthScaleSet +')';

  console.log(
    // window.scrollY,
    // earthTop,
    // earthStart,
    // earthStart - (winHeight * 2),
		// earthScaleMax,
    // winHeight,
    // earth.offsetHeight * earthScaleSet,
    // winHeight * 5,
    // earthTop + marsWrap.innerHeight,

  )

  // satellite 이동
  satelliteStart = (earthStart - (winHeight * 3)) * 0.2;
  satellite.style.left = satelliteStart +'%';
  satellite.style.width = 160 - satelliteStart + 'px';

  // 로켓 온
  if (window.scrollY > earthTop + (winHeight * 4)) {
    rocket.classList.add('on');
  } else {
    rocket.classList.remove('on');
  }

  // 로켓 오프
  if (window.scrollY > marsTop - (winHeight * 0.2)) {
    rocket.classList.add('in');
  } else {
    rocket.classList.remove('in');
  }


  // 코멘트 1 노출
  if (window.scrollY > winHeight * 6.5 && window.scrollY < winHeight * 8) {
    commentBox.classList.add('on');
    commentBox.querySelectorAll('p').forEach(p => {
      p.classList.remove('on');
    });
    commentBox.querySelector('.p1').classList.add('on');
  } else if (window.scrollY > winHeight * 10.3 && window.scrollY < winHeight * 11.5) {
    commentBox.classList.add('on');
    commentBox.querySelectorAll('p').forEach(p => {
      p.classList.remove('on');
    });
    commentBox.querySelector('.p2').classList.add('on');
  } else if (window.scrollY > winHeight * 14 && window.scrollY < winHeight * 15) {
    commentBox.classList.add('on');
    commentBox.querySelectorAll('p').forEach(p => {
      p.classList.remove('on');
    });
    commentBox.querySelector('.p3').classList.add('on');
  } else {
    commentBox.classList.remove('on');
  }

} // window scroll



// lenis scroll
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);