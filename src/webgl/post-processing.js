import * as THREE from 'three';

// composer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

//

import { BLOOMPARAMS, FILMPARAMS } from './config.js';

//

export function initPostProcessing(renderer, scene, camera) {

    var exposure = 1;
    var composer = new EffectComposer(renderer);

    // Passes
    var renderPass = new RenderPass(scene, camera);
    // resolution, strength, radius, threshold
    var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    var smaaPass = new SMAAPass(window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio());
    // noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale
    var filmPass = new FilmPass(
        FILMPARAMS.noiseIntensity,
        FILMPARAMS.scanlinesIntensity,
        FILMPARAMS.scanlinesCount,
        FILMPARAMS.grayscale,
    )

    renderer.toneMappingExposure = Math.pow(exposure, 4.0);

    bloomPass.strength = BLOOMPARAMS.bloomStrength;
    bloomPass.threshold = BLOOMPARAMS.bloomThreshold;
    bloomPass.radius = BLOOMPARAMS.bloomRadius;

    renderPass.renderToScreen = false;
    bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    filmPass.renderToScreen = false;

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(smaaPass);
    composer.addPass(filmPass);

    return [composer, bloomPass, filmPass];

}
