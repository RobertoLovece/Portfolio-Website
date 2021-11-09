import * as THREE from 'three';

// shaders
import eclipseVertex from './shader/eclipseVertex.glsl';
import eclipseFragment from './shader/eclipseFragment.glsl';
import atmosphereVertex from './shader/atmosphereVertex.glsl';
import atmosphereFragment from './shader/atmosphereFragment.glsl';

import Stars from './stars/stars.js'

//

export function initEclipse(scene) {

    var geometry = new THREE.SphereGeometry(1, 128, 128);
    var material = new THREE.ShaderMaterial({
        vertexShader: eclipseVertex,
        fragmentShader: eclipseFragment,
    });
    
    var eclipse = new THREE.Mesh(geometry, material);

    scene.add(eclipse);

    return eclipse;

}

export function initAtmosphere(scene) {

    var geometry = new THREE.SphereGeometry(1, 128, 128);
    var material = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        // blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });

    var atmosphere = new THREE.Mesh(geometry, material);
    atmosphere.scale.set(1.23, 1.23, 1.23);

    scene.add(atmosphere);

    return atmosphere;

}

export function initStars(scene) {

    var stars = new Stars(3000);

    scene.add(stars);

    return stars;

}

export function initOrbit(scene, camera, eclipse) {

    //the camera rotation pivot
    var orbit = new THREE.Object3D();
    orbit.rotation.order = "YXZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
    orbit.position.copy(eclipse.position);
    
    scene.add(orbit);

    //offset the camera and add it to the pivot
    //you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..
    let cameraDistance = 0;
    camera.position.z = cameraDistance;
    orbit.add(camera);

    return orbit;
}