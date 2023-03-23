import { useState, useRef, useEffect } from 'react';
import React from 'react';

const slowScroll = 25;
const fastScroll = 60;


const useScroll = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [haltScroll, setHaltScroll] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(slowScroll);
  const scrollRef = useRef<number>(scrollSpeed);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // use effect for mouse interactions
  useEffect(() => {
    // define a handle mouse effect command
    const handleMouse = (e : React.MouseEvent<HTMLElement>) => {
      const gallery = galleryRef.current;
      if (gallery){
	const divBounds = gallery.getBoundingClientRect();
	const x = (e.clientX - divBounds.left) / divBounds.width;
	const y = (e.clientY - divBounds.top) / divBounds.height;
	if (x > 0.9){ // handle edge navigation
	  setScrollSpeed(fastScroll);
	}else if (x < 0.1){
	  setScrollSpeed(-fastScroll);
	};
	console.log(x);
	console.log(y);
      };
    };
    galleryRef.current?.addEventListener('mousemove', handleMouse)
    
    return () => {
      galleryRef.current?.removeEventListener('mousemove', handleMouse)
    };
  }, []);
  // Interactive useEffects
  useEffect(() => {
    const interval = setInterval(() => {
      if (!haltScroll){
	galleryRef.current?.scrollBy({
          left: scrollSpeed,
          behavior: "smooth",
	});
	checkEdges();
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [scrollSpeed, hoveredProject]); // establish the  scrolling behavior to update on a 30ms cycle
  
  const checkEdges = () => { // check to see if the gallery has reached an edge and needs to turn around
    const gallery = galleryRef.current
    if(gallery) {
      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
      if (gallery.scrollLeft <= 0 ) { // left edge
	setScrollSpeed(slowScroll) // we're moving negative, swap to positive slow
	scrollRef.current = scrollSpeed; // keeping track of our scroll speed
      };
      if (gallery.scrollLeft >= maxScrollLeft) { // right edge
	setScrollSpeed(-slowScroll) // we're moving positive, swap to negative slow
	scrollRef.current = -scrollSpeed; // keeping track of our scroll speed
      };
    };
  }; // this appears to be working properly
  
  
   // handle a mouse entering a project card 
  const handleMouseEnter = (index: number) => {
    scrollRef.current = scrollSpeed
    setHoveredProject(index);
    setHaltScroll(true);
    
    const gallery = galleryRef.current;
    const project = gallery?.querySelector(`#project-${index}`);
    if (gallery && project) {
      const galleryBounds = gallery.getBoundingClientRect();
      const projectBounds = project.getBoundingClientRect();

      // calculate whether we need to move to the left or the right
      const scrollLeft = projectBounds.left < galleryBounds.left; // is the project off the left side?
      const scrollRight = projectBounds.right > galleryBounds.right; // is the project off the right side?
      if(scrollLeft){
	setHaltScroll(false)
	gallery.scrollTo({
	  left: gallery.scrollLeft + (projectBounds.left - galleryBounds.left) - 2*slowScroll,
	  behavior: "smooth",
	})
	setHaltScroll(true)
      }else if( scrollRight){
	setHaltScroll(false)
	gallery.scrollTo({
	  left: gallery.scrollLeft + (projectBounds.right - galleryBounds.right) + 2*slowScroll,
	  behavior: "smooth",
	})
	setHaltScroll(true)
      };
    };
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    // setScrollSpeed(scrollRef.current)
    setHaltScroll(false)
  };


  const handleUserDisengage = () =>{
    setTimeout(() => {setScrollSpeed(scrollRef.current)}, 500)
  };

  return {
    galleryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleUserDisengage,
    hoveredProject,
  };
};

export default useScroll;
