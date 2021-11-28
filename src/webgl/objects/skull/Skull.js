import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import vs from '../shader/Skull.vs';
import fs from '../shader/Skull.fs';

export default class Skull extends THREE.Group {
	constructor(geometry1, geometry2) {
		// Create Object3D
		super();

		// Define Material
		this.material = new THREE.RawShaderMaterial({
			uniforms: {
				time: {
					type: 'f',
					value: 0
				},
				renderOutline: {
					type: 'f',
					value: 0
				},
				noiseTex: {
					type: 't',
					value: null
				},
			},
			vertexShader: vs,
			fragmentShader: fs,
		});

		this.head = new THREE.Mesh(geometry1, this.material);
		this.jaw = new THREE.Mesh(geometry2, this.material);

		this.add(this.head);
		this.add(this.jaw);

		this.setScale(0.11, 0.11, 0.11);
		this.rotation.set(0, 75 * (Math.PI/180), 10 * (Math.PI/180));

		this.position.set(1.5, -3.4, -0.3);

	}

	start(noiseTex) {
		this.material.uniforms.noiseTex.value = noiseTex;
	}

	update(time) {
		this.material.uniforms.time.value += time;
		var speedMultiplier = 1;

		// rotation of the skull jaw default 8
		this.head.rotation.set(MathEx.radians(-(Math.sin(this.material.uniforms.time.value * speedMultiplier) * 0.7 + 0.7) * 2), 0, 0);
		this.jaw.rotation.set(MathEx.radians((Math.sin(this.material.uniforms.time.value * speedMultiplier) * 0.7 + 0.7) * 2), 0, 0);
	}

	setScale(x, y, z) {
		this.head.scale.set(x, y, z);
		this.jaw.scale.set(x, y, z);
	}

	setPosition(x, y, z) {
		this.head.position.set(x, y, z);
		this.jaw.position.set(x, y, z);
	}

	degreesToRadians(degrees) {
		var pi = Math.PI;
		return degrees * (pi / 180);
	}
}
