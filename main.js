import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
// 1. Importation du module de contrôle à la souris
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Configuration de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 0, 10); // Recule la caméra au début

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Activation des contrôles de la souris
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Ajoute un effet d'inertie fluide très agréable
controls.dampingFactor = 0.02;

// Chargement du nuage de points
const loader = new PLYLoader();
loader.load('/0000000000.ply', function (geometry) {
    geometry.center();
    geometry.computeBoundingSphere();
    
    const radius = geometry.boundingSphere.radius;
    if (radius > 0) {
        geometry.scale(5 / radius, 5 / radius, 5 / radius);
    }

    const material = new THREE.PointsMaterial({
        size: 0.05,           
        color: 0xffffff,       
        vertexColors: false,   
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);
    
    console.log("Nuage affiché. Points :", geometry.attributes.position.count);
});

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    
    // 3. TRÈS IMPORTANT : Met à jour les contrôles à chaque frame
    controls.update(); 
    
    renderer.render(scene, camera);
}
animate();

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});