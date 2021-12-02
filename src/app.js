// react
import React from 'react';
import { LoadingManager, Clock } from 'three';

// gsap
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

// react components
import { Loader } from './main/loader.js';
import { Main } from './main/main.js';

// WebGL 
import { initScene } from './webgl/render/scene.js';
import { initPostProcessing } from './webgl/render/post-processing.js';
import { initSkull, initEclipse, initAtmosphere, initStars, initOrbit } from './webgl/objects/objects.js';
import { initGUI } from './webgl/gui/GUI.js';

// css / sass
import './app.sass';
import './utility/styling/scrollbar.sass';

let clock = new Clock();

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            showLoad: false
        }

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)

        this.manager = new LoadingManager();

    }

    //

    // when react component is mounted
    componentDidMount() {

        // WebGL setup

        // scene / renderer
        [this.renderer, this.scene, this.camera] = initScene(this.mount);
        [this.composer, this.bloomPass, this.filmPass] = initPostProcessing(this.renderer, this.scene, this.camera);

        // objects
        initSkull(this.scene, this.manager);
        this.manager.onLoad = this.managerLoad.bind(this);

        this.eclipse = initEclipse(this.scene);
        this.atmosphere = initAtmosphere(this.scene);
        this.stars = initStars(this.scene);
        this.orbit = initOrbit(this.scene, this.camera, this.eclipse);

        // initGUI(this.bloomPass, this.filmPass);

        this.mount.appendChild(this.renderer.domElement)

        // Add WebGL Event-Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this))
        window.addEventListener('mousemove', this.onMouseMove.bind(this))

        // OnLoad Event-Listener
        window.addEventListener('load', this.eventLoad.bind(this));
        this.onWindowResize();

    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    //

    managerLoad() {
        console.log('manager')
        if (this.state.showLoad === true) {
            this.onLoad();
        } else {
            this.setState({ showLoad: true });
        }
    }

    //

    eventLoad() {
        console.log('event')
        if (this.state.showLoad === true) {
            this.onLoad();
        } else {
            this.setState({ showLoad: true });
        }
    }

    //

    // Handle page load
    onLoad() {
        console.log('loading')

        let timer = setTimeout(() => {

            this.skull = this.scene.children[4];
            this.onWindowResize();
            this.start();

            this.setState({ isLoading: false });

            timer = setTimeout(() => {

                document.body.style.overflowY = 'auto';
                document.body.style.overflowY = 'overlay';
            }, 2300);
            return () => clearTimeout(timer);
        }, 1000);
        return () => clearTimeout(timer);
    }

    //

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    //

    // WebGL animate and render
    animate() {

        var delta = clock.getDelta();

        this.skull.update(delta);

        var damp = 0.008;
        this.stars.rotation.y += -.1 * damp;

        this.renderScene(delta)
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene(delta) {
        this.composer.render(delta)
    }

    //

    // React component render
    render() {

        return (

            <>
                <div className='canvas'
                    ref={(mount) => { this.mount = mount }}
                />

                {this.state.isLoading === true ? (
                    <Loader />
                ) : (
                    <div />
                )}

                <div className='main'>
                    <Main
                        isLoading={this.state.isLoading}
                        camera={this.camera}
                        atmosphere={this.atmosphere}
                        scene={this.scene}
                        bloomPass={this.bloomPass}
                        skull={this.skull}
                    />
                </div>

            </>



        )
    }

    //
    // WebGL Event-Listeners
    //

    onMouseMove(e) {

        let scale = -0.0001;
        this.orbit.rotateY(e.movementX * scale);

        // orbit.rotateX(e.movementY * scale);

        this.orbit.rotation.z = 0; //this is important to keep the camera level..
    }

    onWindowResize() {
        var width = this.mount.offsetWidth;
        var height = this.mount.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        this.composer.setPixelRatio(window.devicePixelRatio);
        this.composer.setSize(width, height);
    }

}