import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import Skull from './Skull';

export default class SkullGroup extends THREE.Group {
	constructor() {
		super();
		this.skull;
	}

	start(geometry1, geometry2, noiseTex) {
		this.skull = new Skull(geometry1, geometry2);

		this.add(this.skull);

		this.skull.start(noiseTex);

	}

	update(time) {

		this.skull.rotation.set(0, 70, 0);

		// update children.
		this.skull.update(time);

	}
}
