// This file is the basic scene to show us how we can get up and started
// we're ging to want a couple of different versions here to 

import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';

// custom shaders
const vertexShader = `
  uniform float size;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    vec2 uv = gl_PointCoord.xy - vec2(0.5, 0.5);
    float radius = 0.5;
    float distanceFromCenter = length(uv);
    float circle = smoothstep(radius, radius + 0.01, distanceFromCenter);
    gl_FragColor = vec4(color, 1.0 - circle);
  }
`;

interface pointProps{
  inputArray: number[],
  color: number,
  radius: number,
}

const BasicScene = () => {
  const [scene, setScene] = useState<THREE.Scene>();
  const [camera, setCamera] = useState<THREE.PerspectiveCamera>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const renderContainerRef = useRef<HTMLDivElement|null>(null);
  
  useEffect(() => {
    // we're attaching this to a rendered container, so get that
    const renderContainer = renderContainerRef.current; // this could be null
    // Create the scene
    if (!renderContainer) return;
    const renderHeight = renderContainer.clientHeight // build in a 16:9 ratio based on div height
    const renderWidth = Math.round(16*renderHeight/9);
    const scene = new THREE.Scene();
    setScene(scene);

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, renderWidth / renderHeight, 0.1, 1000);
    // camera.position.z = 10;
    camera.position.z = 40;
    camera.lookAt(0, 0, 0);
    setCamera(camera);
    // Create the renderer

    const rendererInstance = new THREE.WebGLRenderer({ antialias: true });
    rendererInstance.setSize(renderWidth, renderHeight);
    renderContainer.appendChild(rendererInstance.domElement);
    setRenderer(rendererInstance);
    // let's build a function to get pc1 given point array, radius and


    
    // Create the point clouds
    function getPoints({inputArray, color = 0xFF0000, radius = 5}: pointProps) {
      const pcGeometry = new THREE.BufferGeometry();
      pcGeometry.setAttribute('position', new THREE.Float32BufferAttribute(inputArray, 3));
      const pcMaterial = new THREE.ShaderMaterial({
	uniforms: {
	  color: { value: new THREE.Color(color) },
	  size: { value: radius },
	},
      vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	transparent: true,
	depthTest: true,
	depthWrite: false,
	blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(pcGeometry, pcMaterial);
    };
    
    // const pcGeometry = new THREE.BufferGeometry();
    // pcGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 1,0,1, 1,0,2, 2,1,2, 3,2,2], 3));
    // const pc1Material = new THREE.ShaderMaterial({
    //   uniforms: {
    // 	color: { value: new THREE.Color(0xff0000) },
    // 	size: { value: 0.1 },
    //   },
    //   vertexShader: vertexShader,
    //   fragmentShader: fragmentShader,
    //   transparent: true,
    //   depthTest: true,
    //   depthWrite: false,
    //   blending: THREE.AdditiveBlending,
    // });

    // const pc1 = new THREE.Points(pc1Geometry, pc1Material);
    const pc1 = getPoints({
      inputArray : [0,0,0, 1,0,1, 1,0,2, 2,1,2, 3,2,2],
      color : 0xFF0000,
      radius:5})
    scene.add(pc1);

    // const pc2Geometry = new THREE.BufferGeometry();
    // pc2Geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1,0,0, -1,1,0, -1,2,0, -2,2,1, -3,2,2], 3));
    // const pc2Material = new THREE.PointsMaterial({ color: 0x00ff00 });
    // const pc2 = new THREE.Points(pc2Geometry, pc2Material);
    const pc2 = getPoints({
      inputArray : [-1,0,0, -1,1,0, -1,2,0, -2,2,1, -3,2,2],
      color : 0x00FF00,
      radius:3})
    scene.add(pc2);

    // Create a point light and add it to the scene
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight)
    
    // Create a resize listener
    const handleResize = () => {
      camera.aspect = renderWidth / renderHeight;
      camera.updateProjectionMatrix();
      if(renderer){
	renderer.setSize(renderWidth , renderHeight);
      };
    };
    renderContainer.addEventListener('resize', handleResize);
    
    // render
    const animate = () => {
      requestAnimationFrame(animate);
      rendererInstance.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      renderContainer.removeChild(rendererInstance.domElement);

    };
  }, []);

  return <div ref={renderContainerRef} className="basicScene" />;
};

export default BasicScene;
