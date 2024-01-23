import * as THREE from "three";

const earth = document.querySelector('#earth');
const mars = document.querySelector('#mars');
const moon = document.querySelector('#moon');


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
  const cameraWidth = canvasWidth / 2; // canvas width
  const cameraHeight = canvasHeight / 2; // canvas height
  const fov = 70;  // field of view(시야각) 수직면 X도로 설정
  const aspect = cameraWidth / cameraHeight; // 비율
  const near = 0.1; // near 와 far 는 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소다.
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2; // 카메라는 -Z 축 + Y 축, 즉 아래를 본다.

  let geometry = '';
  const radius = 1.1;
  var material = '';

  if (objType === 'earth') {
    geometry = new THREE.SphereGeometry(1, 32, 32);
    // geometry = new THREE.TetrahedronGeometry(1, 13);
    material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./asset/img/earth_dot2.png'),  // Replace with your earth texture
      // bumpMap: new THREE.TextureLoader().load('./asset/img/earth_clouds.jpeg'),  // Replace with your bump map
      // bumpScale: 1,
      // specularMap: new THREE.TextureLoader().load('./asset/img/earth.jpg'),  // Replace with your specular map
      // specular: new THREE.Color('grey')
    });
  } else if (objType === 'mars') {
    // geometry = new THREE.SphereGeometry(1, 32, 32);
    geometry = new THREE.TetrahedronGeometry(1, 8);
    material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./asset/img/mars_dot.png'),  // Replace with your earth texture
    });
  } else {
    geometry = new THREE.TetrahedronGeometry(1, 8);
    material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./asset/img/moon_dot.png'),  // Replace with your earth texture
    });
  }

  // Meterial 을 만들어 색을 지정한다. 색 지정은 CSS 처럼 hex 코드를 사용한다.
  // const material = new THREE.MeshPhongMaterial({ color: objColor, flatShading: true });
  // 앞서 만든 물체와 색을 이용해 Mesh 를 만든다.
  const sphere = new THREE.Mesh( geometry, material );

  
  const scene = new THREE.Scene(); // 이제 Scene 을 만든다.
  scene.add( sphere ); //마지막으로 Scene 에 넣는다.

  // 애니메이션을 구현하기 위해 requestAnimationFrame 루프로 렌더링 함수를 호출한다.
  function animate(time) {
    time *= 0.0001;  // convert time to seconds
    // sphere.rotation.x = time;
    sphere.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // 광원을 추가하여 그림자를 만들자.
  var ambientLight = new THREE.AmbientLight(0x404040);  // Soft white light
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);
  // DirectionalLight 에 위치(position) 와 타깃(target) 속성이 있다.
  // 기본 값은 (0, 0, 0) 으로 position 을 (-1, 2, 4)로 설정해 약간 동서쪽으로 보낸다.
  // target 은 기본값 (0, 0, 0) 그대로 두어 공간 중앙에 비춘다.

  // 이제 계단 현상을 없애보자.
  renderer.setSize(cameraWidth, cameraHeight, false);
  renderer.setPixelRatio(window.devicePixelRatio);
}
createMainCanvas(earth, 2000, 2000, 0xaa8844, 'earth');
createMainCanvas(moon, 400, 400, 0xaa8844, 'moon');
createMainCanvas(mars, 600, 600, 0xaa8844, 'mars');
