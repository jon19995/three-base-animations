import {
	// AnimationClip,
	AnimationMixer,
	Clock,
	GridHelper,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const dogUrl = new URL('@models/dog.glb', import.meta.url);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#a3a3a3');
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.set(10, 10, 10);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const grid = new GridHelper(30, 30);
scene.add(grid);

let mixer;
const assetLoader = new GLTFLoader();
assetLoader.load(
	dogUrl.href,
	(gltf) => {
		const model = gltf.scene;
		scene.add(model);
		mixer = new AnimationMixer(model);
		const clips = gltf.animations;
		clips.forEach((clip) => {
			// clip = AnimationClip.findByName(clips, 'HeadAction');
			const action = mixer.clipAction(clip);
			action.play();
		});
	},
	undefined,
	(error) => {
		console.log(error);
	},
);

const clock = new Clock();

const animate = () => {
	if (mixer) {
		mixer.update(clock.getDelta());
	}

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
