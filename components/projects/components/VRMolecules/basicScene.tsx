import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';

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
    camera.position.z = 10;
    setCamera(camera);
    // Create the renderer

    const rendererInstance = new THREE.WebGLRenderer({ antialias: true });
    rendererInstance.setSize(renderWidth, renderHeight);
    renderContainer.appendChild(rendererInstance.domElement);
    setRenderer(rendererInstance);

    // Create the point clouds
    const pc1Geometry = new THREE.BufferGeometry();
    pc1Geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 0,0,1, 0,0,2, 0,1,2, 0,2,2], 3));
    const pc1Material = new THREE.PointsMaterial({ color: 0xff0000 });
    const pc1 = new THREE.Points(pc1Geometry, pc1Material);
    scene.add(pc1);

    const pc2Geometry = new THREE.BufferGeometry();
    pc2Geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 0,1,0, 0,2,0, 0,2,1, 0,2,2], 3));
    const pc2Material = new THREE.PointsMaterial({ color: 0x00ff00 });
    const pc2 = new THREE.Points(pc2Geometry, pc2Material);
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
