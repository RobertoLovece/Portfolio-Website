import * as THREE from 'three';
import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// composer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

// shaders
import eclipseVertex from './shader/eclipseVertex.glsl';
import eclipseFragment from './shader/eclipseFragment.glsl';
import atmosphereVertex from './shader/atmosphereVertex.glsl';
import atmosphereFragment from './shader/atmosphereFragment.glsl';

//

import { BLOOMPARAMS, FILMPARAMS } from './utility/config.js';
import { initGUI } from './utility/GUI';

//

import Stars from './stars/stars.js'

//

let scene, camera, renderer;
let composer, bloomPass, filmPass;
let orbit, container, clock;
let eclipse, atmosphere, stars;

//

window.onload = function () {

    initScene();
    initPostProcessing();

    initObjects();
    initOrbit();

    initStats();
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

        trigger: document.getElementById('scroll-content'),
        // markers: true,
        start: 'top +20%',

        onEnter: () => {
            gsap.to(scene.background, new THREE.Color(0x403d39))
            gsap.to(bloomPass, {threshold: 1})
        },

        onLeaveBack: () => {
            gsap.to(scene.background, new THREE.Color(0x000))
            gsap.to(bloomPass, {threshold: 0})
        },
    })

    // atmosphere.position.set(0, 0.2, 0);
    initGUI(bloomPass, filmPass)

    animate();

}

//

function initScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000 )

    container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

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

function initPostProcessing() {

    var exposure = 1;
    renderer.toneMappingExposure = Math.pow(exposure, 4.0);

    composer = new EffectComposer(renderer);

    var renderPass = new RenderPass(scene, camera);

    // resolution, strength, radius, threshold
    bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);

    bloomPass.strength = BLOOMPARAMS.bloomStrength;
    bloomPass.threshold = BLOOMPARAMS.bloomThreshold;
    bloomPass.radius = BLOOMPARAMS.bloomRadius;

    var smaaPass = new SMAAPass(window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio());

    // noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale
    filmPass = new FilmPass(
        FILMPARAMS.noiseIntensity,
        FILMPARAMS.scanlinesIntensity,
        FILMPARAMS.scanlinesCount,
        FILMPARAMS.grayscale,
    );

    renderPass.renderToScreen = false;
    bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    filmPass.renderToScreen = false;

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(smaaPass);
    composer.addPass(filmPass);

}

//

function initObjects() {

    var geometry = new THREE.SphereGeometry(1, 128, 128);
    var material = new THREE.ShaderMaterial({
        vertexShader: eclipseVertex,
        fragmentShader: eclipseFragment,
    });
    eclipse = new THREE.Mesh(geometry, material);

    scene.add(eclipse)

    geometry = new THREE.SphereGeometry(1, 128, 128);
    material = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        // blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });

    atmosphere = new THREE.Mesh(geometry, material);
    atmosphere.scale.set(1.23, 1.23, 1.23);

    scene.add(atmosphere);

    stars = new Stars(3000);

    scene.add(stars);
}

//

function initOrbit() {

    document.addEventListener('mousemove', function (e) {
        let scale = -0.0001;
        orbit.rotateY(e.movementX * scale);
        // orbit.rotateX(e.movementY * scale);
        orbit.rotation.z = 0; //this is important to keep the camera level..
    })

    //the camera rotation pivot
    orbit = new THREE.Object3D();
    orbit.rotation.order = "YXZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
    orbit.position.copy(eclipse.position);
    
    scene.add(orbit);

    //offset the camera and add it to the pivot
    //you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..
    let cameraDistance = 0;
    camera.position.z = cameraDistance;
    orbit.add(camera);
}


//

function initStats() {

    clock = new THREE.Clock();
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

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onClick, false);

//

function onWindowResize() {
    container = document.getElementById('canvas');

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