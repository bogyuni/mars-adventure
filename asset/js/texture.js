import * as THREE from "three";
// import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

// 캔버스 요소를 참조 후 WebGLRenderer 를 생성했다.
// 렌더러 종류로 여러가지 있었지만 현재 3차원을 그리는 WebGLRenderer 를 사용한다.
// Three.js 에 canvas 요소를 넘기지 않으면 자동으로 생성되므로 동적으로 삽입되어 코드를 직접 코쳐야하니 호환성 면에서 캔버스 요소를 직접 넣자.
const canvas = document.querySelector('#sphere');
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  premultipliedAlpha: false,
});

// 다음으로 PerspectiveCamera(원근 카메라) 객체로 카메라를 생성한다.
// fov 는 field of view(시야각) 의 줄임말로, 수직면 X도로 설정했다.
// aspect 는 캔버스의 가로 세로 비율이다. 기본 설정은 300x150로 2이다.
// near 와 far 는 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소다.
// 이 공간 밖 요소는 화면에서 잘려나가 렌더링되지 않는다.
const cameraWidth = 300;
const cameraHeight = 300;
const fov = 75;
const aspect = cameraWidth / cameraHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// near 와 far 평면의 높이는 시야각, 너비는 시야각과 aspect 에 의해 결정된다.
// 카메라는 -Z 축 + Y 축, 즉 아래를 본다.
camera.position.z = 2;

// 이제 Scene 을 만든다.
// 씬 그래프 최상단 위치한 요소므로 렌더링 시 먼저 Scene 에 추가한다.
const scene = new THREE.Scene();

// SphereGeometry로 구체를 만든다.
// const radius = 1;
// const widthSegments = 100;
// const heightSegments = 8;
// const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
const radius = 1.1;
const detail = 4;
const geometry = new THREE.TetrahedronGeometry(radius, detail);

// Meterial 을 만들어 색을 지정한다.
// 색 지정은 CSS 처럼 hex 코드를 사용한다.
// material 도 바꾸는데, MeshBasicMaterial 은 광원에 반응하지 않으니 MeshPhongMaterial 로 바꾼다.
// const material = new THREE.MeshBasicMaterial( { color: 0xaa8844 } );
const material = new THREE.MeshPhongMaterial({
  color: 0xaa8844,
  flatShading: true
});

// 앞서 만든 물체와 색을 이용해 Mesh 를 만든다.
const sphere = new THREE.Mesh( geometry, material );
//마지막으로 Scene 에 넣는다.
scene.add( sphere );

// renderer.render(scene, camera);

// 한 면만 보이는 구체를 움직여보자.
// 애니메이션을 구현하기 위해 requestAnimationFrame 루프로 렌더링 함수를 호출한다.
function render(time) {
  time *= 0.0005;  // convert time to seconds
  sphere.rotation.x = time;
  sphere.rotation.y = time;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
// requestAnimationFrame 은 브라우저에 애니메이션 프레임을 요청하는 함수다.
// 페이지에 변화가 있으면 다시 렌더링한다. 위 예제는 Three.js 의 renderer.render 메소드로 씬을 렌더링한다.
// requestAnimationFrame 은 매개변수로 받은 함수에 페이지가 로드 이후의 시간을 밀리초 단위로 넘겨준다.
// 그리고 씬을 렌더링한 후, 애니메이션 프레임을 요청해 반복한다.
// 마지막으로 루프 밖에 requestAnimationFrame 한 번 호출하여 루프를 시작한다.

// 3D 라기엔 좀 부족한데, 광원을 추가하여 그림자를 만들자.
// 지금은 예시로 DirectionalLight 를 사용한다.
{
  const color = 0xFFFFFF;
  const intensity = 2;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(1, 1, 1);
  scene.add(light);
}
// DirectionalLight 에 위치(position) 와 타깃(target) 속성이 있다.
// 기본 값은 (0, 0, 0) 으로 position 을 (-1, 2, 4)로 설정해 약간 동서쪽으로 보낸다.
// target 은 기본값 (0, 0, 0) 그대로 두어 공간 중앙에 비춘다.

// 이제 계단 현상을 없애보자.
// 캔버스 요소엔 크기와 픽셀 수에 대한 두 종류의 크기가 있다.
// 캔버스의 원본 크기, 해상도는 드로잉버퍼(drawingbuffer)라고 불린다.
// Three.js 에선 renderer.setSize 메소드를 호출해 캔버스의 드로잉버퍼 크기를 지정할 수 있다.
// 캔버스의 디스플레이 크기인 clientWidth 와 clientHeight 를 이용하자.
renderer.setSize(cameraWidth, cameraHeight, false);
// renderer.setPixelRatio 메소드로 해상도 배율을 알려주는 것이다.
// 이는 renderer.setSize 가 알아서 사이즈에 배율을 곱해 리사이징한다. 하지만 이 방법은 추천하지 않는다.
renderer.setPixelRatio(window.devicePixelRatio);


// 마우스 드래그 이동 
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 1;
// controls.maxDistance = 500;