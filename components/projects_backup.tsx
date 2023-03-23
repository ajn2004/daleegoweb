import React from 'react';
import { useState, useRef, useEffect} from 'react';
import { Project } from "./project";
import styles from "@/styles/Home.module.css"
interface ProjectsProps {
  projects: Project[];
}

enum Mode {
  Gallery,
  Focus,
}

// Scroll speeds
const fastScroll = 60;
const slowScroll = 25;

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // define our state variables and default types
  const [mode, setMode] = useState<Mode>(Mode.Gallery);
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [haltScroll, setHaltScroll] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(slowScroll);
  const scrollRef = useRef<number>(scrollSpeed);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const glassRef = useRef<HTMLDivElement | null>(null);

  // keep track of which project is 'in focus'
  const focusProject = (project: Project) => {
    setMode(Mode.Focus);
    setFocusedProject(project);
  };

  // allow us to return to the gallery from a project
  const returnToGallery = () => {
    setMode(Mode.Gallery);
  };

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
  // handle moust leaving event
  const handleMouseLeave = () => {
    setHoveredProject(null);
    // setScrollSpeed(scrollRef.current)
    setHaltScroll(false)
  };

  const handleUserDisengage = () =>{
    setTimeout(() => {setScrollSpeed(scrollRef.current)}, 500)
  };
  
  const renderGallery = () => (
    <div
    className={styles.gallery_glass}
    style={{border: '1px solid red'}}
    ref={glassRef}
      >
      <div
    className="gallery"
    ref={galleryRef}
    onMouseLeave={handleUserDisengage}
      >
      {projects.map((project, index) => (
        <div
          key={project.id}
          id={`project-${index}`}
          className="project-card"
          style={{
            transform: `scale(${index === hoveredProject ? 1.1 : 1})`,
          }}
        onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => focusProject(project)}
        >
          <img	src={project.imageUrl}	alt={project.name} />
          <h3>{project.name}</h3>
          <p>{project.shortBlurb}</p>
        </div>
      ))}
      <style jsx>{`
        .gallery {
          display: flex;
          height: 100%;
          overflow-x: scroll;
          padding: 1rem;
          align-items: center;
          border: 1px solid green;
        }
        .project-card {
          flex: 0 0 auto;
          scroll-snap-align: center;
          cursor: pointer;
          max-height:60vh;
          padding: 1rem;
          margin-left: 2rem;
          transition: transform 0.5s;
          border: 1px solid blue;
        }
        .project-card img {
          max-height: 40vh;
        }

         `}</style>
    </div>
	</div>
	
  );

  const renderFocus = () => (
    <div className="focus">
      {/* Render your specific project component here */}
      <button onClick={returnToGallery}>Back to Gallery</button>
    </div>
  );

  return mode === Mode.Gallery ? renderGallery() : renderFocus();
};

export default Projects
