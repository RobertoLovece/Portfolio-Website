import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import vs from '../shader/Skull.vs';
import fs from '../shader/Skull.fs';

export default class Skull extends THREE.Group {
	constructor(geometry1, geometry2) {
		// Create Object3D
		super();

		this.name = 'skull';

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

		// this.rotation.set(
		// 	MathEx.radians(0),
		// 	MathEx.radians(-10),
		// 	MathEx.radians(-15)
		// );

		this.add(this.head);
		this.add(this.jaw);

	}

	start(noiseTex) {
		this.material.uniforms.noiseTex.value = noiseTex;
	}

	update(time) {
		this.material.uniforms.time.value += time;
		var speedMultiplier = 2;

		// rotation of the skull jaw default 8
		this.head.rotation.set(MathEx.radians(-(Math.sin(this.material.uniforms.time.value * speedMultiplier) * 0.7 + 0.7) * 2), 0, 0);
		this.jaw.rotation.set(MathEx.radians((Math.sin(this.material.uniforms.time.value * speedMultiplier) * 0.7 + 0.7) * 2), 0, 0);
	}
}
