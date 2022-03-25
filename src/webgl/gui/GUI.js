// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

import { BLOOMPARAMS, FILMPARAMS } from '../utility/config.js';

export function initGUI(bloomPass, filmPass) {

    const gui = new GUI();
    const bloomFolder = gui.addFolder('Bloom');

    bloomFolder.add(BLOOMPARAMS, "bloomStrength", 0, 2.0).onChange(function() {
        bloomPass.strength = BLOOMPARAMS.bloomStrength;
    });
    bloomFolder.add(BLOOMPARAMS, "bloomThreshold", 0, 1.0).onChange(function() {
        bloomPass.threshold = BLOOMPARAMS.bloomThreshold;
    });
    bloomFolder.add(BLOOMPARAMS, "bloomRadius", 0, 2.0).onChange(function() {
        bloomPass.radius = BLOOMPARAMS.bloomRadius;
    });

    // const filmFolder = gui.addFolder('Film');
    // filmFolder.add(FILMPARAMS, "noiseIntensity", 0, 1.0).onChange(function() {
    //     filmPass.noiseIntensity = FILMPARAMS.noiseIntensity;
    //     filmPass.uniforms.noiseIntensity = FILMPARAMS.noiseIntensity;
    // });
    // filmFolder.add(FILMPARAMS, "scanlinesIntensity", 0, 1.0).onChange(function() {
    //     filmPass.scanlinesIntensity = FILMPARAMS.scanlinesIntensity;
    //     filmPass.uniforms.scanlinesIntensity = FILMPARAMS.scanlinesIntensity;
    // });
    // filmFolder.add(FILMPARAMS, "scanlinesCount", 0, 10000).onChange(function() {
    //     filmPass.scanlinesCount = FILMPARAMS.scanlinesCount;
    //     filmPass.uniforms.scanlinesCount = FILMPARAMS.scanlinesCount;
    // });
    // filmFolder.add(FILMPARAMS, "grayscale").onChange(function() {
    //     filmPass.grayscale = FILMPARAMS.grayscale
    //     console.log(filmPass.uniforms);
    //     filmPass.uniforms.grayscale = FILMPARAMS.grayscale;
    // });
    gui.open();
}