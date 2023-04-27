import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth
  / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let mouse = {
  x: 5000,
  y: 5000
};

let onDocumentMouseMove = (e) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener('mousemove', onDocumentMouseMove);




const hoverGeometry = new THREE.BoxGeometry(3, 1, 1);
const baseMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00});
const hoverMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF});


const hoverBox = new THREE.Mesh(hoverGeometry, baseMaterial);
scene.add(hoverBox);

camera.position.z = 5;
// camera.position.x = 0

let update = () => {
  let vector = new THREE.Vector3(mouse.x, mouse.y, 1);
  vector.unproject(camera);
  let ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

  let intersects = ray.intersectObjects(scene.children);
  if (intersects.length > 0) {
    hoverBox.material = hoverMaterial;
    if (hoverBox.scale.x < 2) {
      hoverBox.scale.x += 0.05;
    }
  } else {
    hoverBox.material = baseMaterial;
    if (hoverBox.scale.x > 0.05) {
      hoverBox.scale.x -= 0.05;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  update();
  renderer.render(scene, camera);
}
animate();
