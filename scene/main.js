import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth
  / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8A00FF);
document.body.appendChild(renderer.domElement);

const bgGeometry = new THREE.PlaneGeometry( 50, 50);
const frontMaterial = new THREE.MeshBasicMaterial( { color: 0x302E68})
const backMaterial = new THREE.MeshBasicMaterial( { color: 0x16FF2A})
const leftMaterial = new THREE.MeshBasicMaterial( { color: 0xFF16B5})
const rightMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFE16})

const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);
gridHelper.position.y = 0;

const bg = new THREE.Mesh(bgGeometry, frontMaterial);
const bgLeft = new THREE.Mesh(bgGeometry, leftMaterial);
const bgRight = new THREE.Mesh(bgGeometry, rightMaterial);
const bgBack = new THREE.Mesh(bgGeometry, backMaterial);


scene.add(bg);
scene.add(bgLeft);
scene.add(bgRight);
scene.add(bgBack);

bg.position.z = -25;
bg.position.y = 25;

bgLeft.position.x = -25;
bgLeft.position.y = 25;
bgLeft.rotation.y= 90;

bgRight.position.x = 25;
bgRight.position.y = 25;
bgRight.rotation.y = -90;

bgBack.position.z = 25;
bgBack.position.y = 25;
bgBack.rotation.y = 180;


const cubeSize = 5;
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// cube.position.z = -10;

camera.position.y = 5;
camera.position.z = 5;
camera.rotation.y = 0;

function animate() {
  requestAnimationFrame(animate);

  camera.rotation.y += 0.10;

  renderer.render(scene, camera);
}
animate();
