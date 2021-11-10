import {WebGLRenderer, Scene, PerspectiveCamera, Color} from 'three';

export function initScene(container) {

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    var renderer = new WebGLRenderer({ alpha: false, antialias: false });
    var scene = new Scene();
    var camera = new PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    scene.background = new Color(0x000);

    camera.position.x = 2.80;
    camera.position.y = 0.5;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0)

    container.appendChild(renderer.domElement);

    return [renderer, scene, camera];

}