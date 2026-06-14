import * as THREE from 'three';

//Creating the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75,
window.innerWidth / window.innerHeight, 0.1, 1000 );


//fov = 75, aspect ratio = widht/height, near = 0.1, far =  1000.
//les objets loin de far ou proche de near ne seront pas rendus
//l'aspect ratio peremt d'avoir une image similaire peu importe l'écran 

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Creating an object

const geometry = new THREE.BoxGeometry( 1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color:
0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
// on déplace la camera car par défaut les objets sont placés à (0, 0, 0)

// Rendering the scene

function animate( time ) {
    // Animating the cube

    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

