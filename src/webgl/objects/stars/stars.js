import { TextureLoader, Points, BufferGeometry, PointsMaterial, BufferAttribute } from 'three';
import Cross from './texture/cross.png';

//

const loader = new TextureLoader();
const cross = loader.load(Cross);

//

export default class Stars extends Points {
    constructor(starNumber) {

        super();

        this.geometry = new BufferGeometry();
        this.material = new PointsMaterial({
            size: 0.008,
            map: cross,
            transparent: true,
        })

        var position = new Float32Array(starNumber * 3);
        var rands = new Float32Array(starNumber);

        var x, y, z;

        for (let i = 0; i < starNumber; i++) {

            x = (Math.random() - 0.5) * (Math.random() * 5) * 2;
            y = (Math.random() - 0.5) * (Math.random() * 5) * 2;
            z = (Math.random() - 0.5) * (Math.random() * 5) * 2;

            position[i * 3] = x;
            position[(i * 3) + 1] = y;
            position[(i * 3) + 2] = z;

            rands[i] = this.getRandomRange(0.005, 0.01);

        }

        this.material.onBeforeCompile = shader => {

            shader.vertexShader = shader.vertexShader.replace(
                'uniform float size',
                'attribute float size'
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                'outgoingLight = diffuseColor.rgb;',
                `outgoingLight = diffuseColor.rgb;
                
                vec2 circCoord = 2.0 * gl_PointCoord - 1.0;
                if (dot(circCoord, circCoord) >  1. ) { // could use fixed value or try something along the lines of rand / 2.
                    discard;
                }`
            );

        }

        this.geometry.setAttribute('position', new BufferAttribute(position, 3));
        this.geometry.setAttribute('size', new BufferAttribute(rands, 1));

        this.scale.set(1.0, 1.0, 1.0)

    }

    getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
}