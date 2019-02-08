import React, {Component} from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

class ThreeScene extends Component {
    componentDidMount() {
        const {
            width,
            height
        } = this.getMountDimensions();

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 6;

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        this.light = new THREE.AmbientLight(0x404040, 2);
        this.scene.add(this.light);

        const spotLight = new THREE.SpotLight(0xc13d98, 4);
        spotLight.position.set(0, 0, 200);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        this.scene.add(spotLight);

        this.loader = new GLTFLoader();
        this.loaded = false;
        this.loader.load(
            'motiv.glb',
            (gltf) => {
                this.loaded = true;
                const material = new THREE.MeshPhysicalMaterial({
                    color: '#364ee5',
                    metalness: 0.6,
                });
                material.side = THREE.BackSide;
                this.logo = gltf.scene.children[0];
                this.logo.material = material;
                this.scene.add(gltf.scene);
            },
            (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
            (error) => console.error(error.message),
        );

        window.addEventListener('resize', this.onWindowResize, false);

        this.start();
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    };

    getMountDimensions = () => {
        return {
            width: this.mount.clientWidth,
            height: this.mount.clientHeight,
        };
    };

    onWindowResize = () => {
        const {
            width,
            height
        } = this.getMountDimensions();

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    animate = () => {
        if (this.loaded) {
            this.logo.rotation.z += 0.01;
        }

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div
                style={{width: '100vh', height: '60vh'}}
                ref = {(mount) => {
                    this.mount = mount
                }}
            />
        );
    }
}

export default ThreeScene;
