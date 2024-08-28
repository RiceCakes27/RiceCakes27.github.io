import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// Set up scene, camera, and renderer with transparent background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);  // Transparent background
document.getElementById('model-container').appendChild(renderer.domElement);

const spotLight = new THREE.SpotLight(0xffffff, 600, 50, 0.2, 0.5);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);

var mesh
const loader = new GLTFLoader();
loader.load( 'rat.glb', (gltf) => {
    mesh = gltf.scene;
    mesh.position.set(0,-1,0);
    mesh.scale.set(0.5,0.5,0.5);
    scene.add(mesh);
    animate();

});

camera.position.z = 5;

// Animation loop to spin the model
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}



// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});