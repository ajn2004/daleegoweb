// This file is the basic scene to show us how we can get up and started
// we're ging to want a couple of different versions here to 

import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';


interface pointProps{ // properties of the point cloud generation script
  inputArray: number[],
  scene: THREE.Scene | undefined,
  color: number,
  radius: number,
  widthSegments: number,
  heightSegments: number,
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
    // Start Camera Position
    camera.position.set(0, 40, 0);
    camera.lookAt(0, 0, 0);
    setCamera(camera);
    // Create the renderer

    const rendererInstance = new THREE.WebGLRenderer({ antialias: true });
    rendererInstance.setSize(renderWidth, renderHeight);
    renderContainer.appendChild(rendererInstance.domElement);
    setRenderer(rendererInstance);
    // let's build a function to get pc1 given point array, radius and

    // Create a point light and add it to the scene
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight)
    const pointLight2 = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, -20);
    scene.add(pointLight2)
    // create Point clouds
    function getPoints({
      inputArray,
      color = 0xffffff,
      radius = 5,
      widthSegments = 16,
      heightSegments = 16,
    }: pointProps){
      const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshPhongMaterial({ color: color });

      // Create a mesh with the instanced geometry and the material
      const instanceCount = inputArray.length / 3;
      const instancedMesh = new THREE.InstancedMesh(sphereGeometry, material, instanceCount);
      instancedMesh.frustumCulled = false; // Disable frustum culling to ensure all instances are rendered

      // Set the position for each instance
      for (let i = 0; i < instanceCount; i++) {
	const position = new THREE.Vector3(inputArray[i * 3], inputArray[i * 3 + 1], inputArray[i * 3 + 2]);
	instancedMesh.setMatrixAt(i, new THREE.Matrix4().setPosition(position));
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
      
      return instancedMesh;
    };
 
    const redMesh = getPoints({
      inputArray : [0,0,0, 1,0,1, 1,0,2, 2,1,2, 3,2,2],
      color : 0xFF0000,
      radius: 1,
    });
    scene.add(redMesh)

    const greenMesh = getPoints({
      inputArray : [-1,0,0, -1,1,0, -1,2,0, -2,2,1, -3,2,2],
      color : 0x00FF00,
      radius: 1,
    });
    scene.add(greenMesh)

       
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
