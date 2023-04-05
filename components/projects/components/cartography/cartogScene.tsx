// Build the render for the 3d model used in cartography component 

import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

interface pointProps{ // properties of the point cloud generation script
  inputArray: number[],
  color: number,
  radius: number,
  widthSegments: number,
  heightSegments: number,
  scale: number, // scalar factor for point distances
}

const CartogScene = () => {
  const [scene, setScene] = useState<THREE.Scene>();
  const [camera, setCamera] = useState<THREE.PerspectiveCamera>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const renderContainerRef = useRef<HTMLDivElement|null>(null);
  
  useEffect(() => {
    // we're attaching this to a rendered container, so get that
    const renderContainer = renderContainerRef.current; // this could be null
    // Create the scene
    if (!renderContainer) return;
    const renderHeight = renderContainer.clientHeight; // build in a 16:9 ratio based on div height
    const renderWidth = Math.round(16*renderHeight/12);
    const scene = new THREE.Scene();
    setScene(scene);

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, renderWidth / renderHeight, 0.1, 1000);
    // Start Camera Position
    camera.position.set(0, 200, 100);
    camera.lookAt(0, 0, 0);
    camera.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI)
    setCamera(camera);
    // Create the renderer

    const rendererInstance = new THREE.WebGLRenderer({ antialias: true });
    rendererInstance.setSize(renderWidth, renderHeight);
    renderContainer.appendChild(rendererInstance.domElement);
    setRenderer(rendererInstance);
    // let's build a function to get pc1 given point array, radius and

    // Create a point light and add it to the scene
    const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight)
    const pointLight2 = new THREE.PointLight(0xffffff, 2, 1000);
    pointLight.position.set(0, 100, 0);
    scene.add(pointLight2)
    // create Point clouds
    function getPoints({
      inputArray,
      color = 0xffffff,
      radius = 1,
      widthSegments = 16,
      heightSegments = 16,
      scale = 100,
    }: pointProps){
      const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshPhongMaterial({ color: color });

      // Create a mesh with the instanced geometry and the material
      const instanceCount = inputArray.length / 3;
      const instancedMesh = new THREE.InstancedMesh(sphereGeometry, material, instanceCount);
      instancedMesh.frustumCulled = false; // Disable frustum culling to ensure all instances are rendered

      // Set the position for each instance
      for (let i = 0; i < instanceCount; i++) {
	const position = new THREE.Vector3(
	  scale * inputArray[i * 3],
	  scale * inputArray[i * 3 + 1],
	  scale * inputArray[i * 3 + 2]
	);
	instancedMesh.setMatrixAt(i, new THREE.Matrix4().setPosition(position));
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
      
      return instancedMesh;
    };
    
    async function getArrayFromFile(fname: string): Promise<number[][]>{
      return fetch(fname)
	.then(response => response.text())
	.then(text => {	  
	  // we need to determine what kind of file we have
	  // 1 distribution or 2
	  let rows = text.trim().split('\n');
	  if (rows[0].split(',').length == 3){ // determine what case we're dealing with
	    let outArr: number[] = [];
	    let values = text.trim().replace(/\n/g,',').split(',')
	    let nums = values.map((value) => parseFloat(value));
	    outArr.push(...nums)
	    return [outArr, [0]]
	  }else if (rows[0].split(',').length == 4){

	    let outArr1: number[] = [];
	    let outArr2: number[] = [];
	    for (const row of rows){
	      let values = row.split(',') // we know the final value is type
	      let nums = values.map((value) => parseFloat(value))
	      if (nums[3] == 1){
		outArr1.push(...nums.slice(0,2))
	      }else if (nums[3] == 2){
		outArr2.push(...nums.slice(0,2))
	      }
	    }
	    return [outArr1, outArr2];
	  }else{
	    throw new Error(`Invald File format: ${fname}`);
	  }
	})
	.catch(error => {
	  throw error;
	});
    // let's load our mesh array
    };
    async function loadSurfaceMesh() {
      try{
	console.log('arrayin')
	const surfaceArray = await getArrayFromFile('/surface_bouton.csv')
	console.log('array time')
	console.log(surfaceArray[0])
	const surfaceMesh = getPoints({
	  inputArray :surfaceArray[0],
	  color : 0x4B0092,
	  radius: 0.6,
	  widthSegments: 16,
	  heightSegments: 16,
	  scale: 100,
	});
	scene.add(surfaceMesh)
	return surfaceMesh
      } catch (error) {
	console.log(error)
      }
    }

    async function loadLocalizationMesh() {
      try{
	const surfaceArray = await getArrayFromFile('/drift_corrected_raw_bouton.csv')
	const vGlutMesh = getPoints({
	  inputArray :surfaceArray[1],
	  color : 0x1AFF1A,
	  radius: 3.5,
	  widthSegments: 16,
	  heightSegments: 16,
	  scale: 100,
	});
	scene.add(vGlutMesh)
	return vGlutMesh
	 } catch (error) {
	console.log(error)
      }
    }
    
    async function run() {
      try {
	const surfaceMesh = await loadSurfaceMesh();
	// const locsArray = await getArrayFromFile('/drift_corrected_raw_bouton.csv');
	// const vglutMesh = getPoints({
	//   inputArray: locsArray[1] ? locsArray[1] : [0],
	//   color: 0x1AFF1A,
	//   radius: 5,
	// });
	// scene.add(vglutMesh);
	
      // 	const gpiMesh = getPoints({
      // 	  inputArray: locsArray[0],
      // color: 0xFFFF00,
      // 	  radius: 3,
      // 	});
	// I don't want to show the gpi mesh initially
	// scene.add(gpiMesh)
	const localMesh = await loadLocalizationMesh()
	const rotationInterval = setInterval(() => {
	  const newAngle = new THREE.Quaternion();
	  newAngle.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.02);
	  surfaceMesh?.applyQuaternion(newAngle);
	  localMesh?.applyQuaternion(newAngle);
	}, 30);
      } catch (error) {
	console.log(error);
      }
    }
    
    run();
    // Create a resize listener
    const handleResize = () => {
      camera.aspect = renderWidth / renderHeight;
      camera.updateProjectionMatrix();
      if(renderer){
	renderer.setSize(renderWidth , renderHeight);
      };
    };
    renderContainer?.addEventListener('resize', handleResize);
    
    // render
    const animate = () => {
      requestAnimationFrame(animate);
      rendererInstance.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      renderContainer?.removeChild(rendererInstance.domElement);

    };
  }, [renderContainerRef]);

  return <div ref={renderContainerRef} className={styles.cartogScene} />;
};

export default CartogScene;
