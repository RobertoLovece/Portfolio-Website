import * as THREE from 'three';
import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

//

import { initGUI } from './gui/GUI';
import { initPostProcessing } from './post-processing.js'
import { initEclipse, initAtmosphere, initStars, initOrbit } from './objects/objects.js'

//

let scene, camera, renderer, composer;
let eclipse, atmosphere, stars, orbit;

let clock = clock = new THREE.Clock();

//

window.onload = function () {

    initScene();

    var bloomPass, filmPass;
    [composer, bloomPass, filmPass] = initPostProcessing(renderer, scene, camera);

    eclipse = initEclipse(scene);
    atmosphere = initAtmosphere(scene);
    stars = initStars(scene);

    orbit = initOrbit(scene, camera, eclipse)

    // initGUI(bloomPass, filmPass);

    var container = document.getElementById('homepage');
    var maxHeight = (container.clientHeight || container.offsetHeight) - window.innerHeight;

    gsap.to(camera.position, {
        y: -3.2,
        ease: 'none',
        scrollTrigger:
        {
            trigger: container,
            start: 'top top',
            end: maxHeight,
            pin: false,
            scrub: true
        },
    })

    gsap.to(atmosphere.position, {
        y: 0.3,
        ease: 'none',
        scrollTrigger:
        {
            trigger: container,
            start: 'top top',
            end: maxHeight,
            pin: false,
            scrub: true,
        },
    })

    ScrollTrigger.create({

        trigger: document.getElementById('universe-content'),
        // markers: true,
        start: 'top +20%',

        onEnter: () => {
            gsap.to(scene.background, new THREE.Color(0x403d39))
            gsap.to(bloomPass, { threshold: 1 })
        },

        onLeaveBack: () => {
            gsap.to(scene.background, new THREE.Color(0x000))
            gsap.to(bloomPass, { threshold: 0 })
        },
    })

    threeEventListeners();

    animate();

}

//

function initScene() {

    var container = document.getElementById('canvas');
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000)

    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    camera.position.x = 2.80;
    camera.position.y = 0.5;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0)

}

//

function animate() {
    requestAnimationFrame(animate);

    var damp = 0.008;
    stars.rotation.y += -.1 * damp;

    // renderer.render(scene, camera);
    var delta = clock.getDelta();
    composer.render(delta);
}

//
// EVENT LISTENERS
//

function threeEventListeners() {

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onClick, false);
    document.addEventListener('mousemove', onMouseMove, false);

}

//

function onWindowResize() {
    var container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    composer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(width, height);
}

//

function onClick(e) {
    console.log(camera.position)
}

function onMouseMove(e) {
    let scale = -0.0001;
    orbit.rotateY(e.movementX * scale);
    // orbit.rotateX(e.movementY * scale);
    orbit.rotation.z = 0; //this is important to keep the camera level..
}