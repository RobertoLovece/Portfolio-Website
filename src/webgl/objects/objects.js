import { TextureLoader, SphereGeometry, ShaderMaterial, Mesh, BackSide, Object3D, RepeatWrapping } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// shaders
import eclipseVertex from './shader/eclipseVertex.glsl';
import eclipseFragment from './shader/eclipseFragment.glsl';
import atmosphereVertex from './shader/atmosphereVertex.glsl';
import atmosphereFragment from './shader/atmosphereFragment.glsl';

import Skull from './skull/Skull.js';
import Stars from './stars/stars.js'

//

import SkullModel from './skull/assets/SkullHead.obj'
import NoiseTexture from './skull/assets/noise.png'

//

export async function initSkull(scene, manager) {

    const objLoader = new OBJLoader(manager);
    const texLoader = new TextureLoader(manager);

    let skull = null;
    const scale = 0.13;

    await Promise.all([
        objLoader.loadAsync(SkullModel),
        texLoader.loadAsync(NoiseTexture),
    ]).then((response) => {

        const geometrySkullHead = response[0].children[1].geometry;
        const geometrySkullJaw = response[0].children[0].geometry;
        const noiseTex = response[1];

        noiseTex.wrapS = RepeatWrapping;
        noiseTex.wrapT = RepeatWrapping;

        skull = new Skull(geometrySkullHead, geometrySkullJaw)
		skull.start(noiseTex);

        skull.scale.set(scale, scale, scale);
        skull.position.set(1.5, -6, -0.5);
        
        skull.rotation.set(0, 80 * (Math.PI/180), 5 * (Math.PI/180));

        scene.add(skull);

    });
    
}

export function initEclipse(scene) {

    var geometry = new SphereGeometry(1, 128, 128);
    var material = new ShaderMaterial({
        vertexShader: eclipseVertex,
        fragmentShader: eclipseFragment,
    });
    
    var eclipse = new Mesh(geometry, material);

    scene.add(eclipse);

    return eclipse;

}

export function initAtmosphere(scene) {

    var geometry = new SphereGeometry(1, 128, 128);
    var material = new ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        // blending: THREE.AdditiveBlending,
        side: BackSide
    });

    var atmosphere = new Mesh(geometry, material);
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
    var orbit = new Object3D();
    orbit.rotation.order = "YXZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
    orbit.position.copy(eclipse.position);
    
    scene.add(orbit);

    //offset the camera and add it to the pivot
    let cameraDistance = 0;
    camera.position.z = cameraDistance;
    orbit.add(camera);

    return orbit;
}