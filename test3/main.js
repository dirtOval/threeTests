import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth
  / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const bgGeometry = new THREE.PlaneGeometry( 26, 26);
const bgMaterial = new THREE.MeshBasicMaterial( { color: 0xA600FF})

const bg = new THREE.Mesh(bgGeometry, bgMaterial);
scene.add(bg);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
material.transparent = true;

let cubeArray = [];
for (let i = 0; i < 18; i++) {
  for (let j = 0; j < 18; j++) {
    const cube = new THREE.Mesh(geometry, material);
    bg.add(cube);
    cube.position.x = i - 9;
    cube.position.y = j - 9;
    cubeArray.push(cube);
  }
}

camera.position.z = 5;
// camera.position.x = 0

let cubeOpacity = 1;
let opacitySwitch = false;


function animate() {
  requestAnimationFrame(animate);
  bg.rotation.z += 0.01;

  let rotationSwitch = false;

  if (opacitySwitch) {
    cubeOpacity += 0.01
  } else {
    cubeOpacity -= 0.01;
  }
  if (cubeOpacity <= 0.75 || cubeOpacity >= 1) {
    opacitySwitch = !opacitySwitch
  }

  material.opacity = cubeOpacity;

  for (let cube of cubeArray) {
    if (rotationSwitch) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    } else {
      cube.rotation.x -= 0.01;
      cube.rotation.y -= 0.01;
    }
    cube.rotation.z += 0.07
    rotationSwitch = !rotationSwitch;
  }

  renderer.render(scene, camera);
}
animate();
