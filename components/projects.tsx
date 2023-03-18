import React, { useState, useRef, useEffect } from "react";
import { Project } from "./project";

interface ProjectsProps {
  projects: Project[];
}

enum Mode {
  Gallery,
  Focus,
}
const fastScroll = 60;
const slowScroll = 25;

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // define our state variables and default types
  const [mode, setMode] = useState<Mode>(Mode.Gallery);
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mouseMiddle, setMouseMiddle] = useState<boolean | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState<number>(slowScroll);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // keep track of which project is 'in focus'
  const focusProject = (project: Project) => {
    setMode(Mode.Focus);
    setFocusedProject(project);
  };

  // allow us to return to the gallery from a project
  const returnToGallery = () => {
    setMode(Mode.Gallery);
  };

  // Interactive useEffects
  useEffect(() => {
    const gallery = galleryRef.current;
    const interval = setInterval(() => {
      galleryRef.current?.scrollBy({
        left: scrollSpeed,
        behavior: "smooth",
      });
    }, 30);

    // check if we've hit the limits of our gallery
      return () => clearInterval(interval);
  }, [scrollSpeed]);
  setInterval(() => {
    const gallery = galleryRef.current
     if(gallery) {
      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
      if (gallery.scrollLeft <= 0 && scrollSpeed == -slowScroll) {setScrollSpeed(slowScroll)};
       if (gallery.scrollLeft >= maxScrollLeft-20 && scrollSpeed == slowScroll) {setScrollSpeed(-slowScroll)};
    };
  }, 10); 
    
  const handleMouseEnter = (index: number) => {
    setHoveredProject(index);
    if (mouseMiddle){
      setScrollSpeed(0)
    };
    setMouseMiddle(false)
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const mouseX = e.clientX;

    if(mouseX < 200){
      setScrollSpeed(-fastScroll);
    }else if(mouseX > 1574 - 200){
      setScrollSpeed(fastScroll);
    }else{
      setMouseMiddle(true);
    };
  };
  const handleUserDisengage = () =>{
    setTimeout(() => {setScrollSpeed(slowScroll)}, 500)
  };

  const renderGallery = () => (
    <div
      className="gallery"
    ref={galleryRef}
    onMouseMove={handleMouseMove}
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
