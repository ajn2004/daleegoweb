import React from 'react';
import { projects } from './components';
import useScroll from './useScroll';

interface GalleryProps {
  focusProject: (project: number) => void;
}

const Gallery: React.FC<GalleryProps> = ({ focusProject }) => {
  const { 
    galleryRef, 
    handleMouseEnter, 
    handleMouseLeave, 
    handleUserDisengage,
    hoveredProject
  } = useScroll(); // attach our horizontal scrolling features and get the functions that make the gallery responsive to user

  return (
      <div
    className="gallery"
    ref={galleryRef}
    onMouseLeave={handleUserDisengage}
      >
      {projects.map((project,index) => (
        <div
          key={project.id}
          id={`project-${index}`}
          className="project-card"
          style={{
            transform: `scale(${index === hoveredProject ? 1.1 : 1})`,
          }}
        onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => focusProject(project.id)}
        >
          <img
	src={project.imageUrl}
	alt={project.name}
	style={{maxWidth:'60vw', height:'auto'}}
	  />
          <h3>{project.name}</h3>
          <p>{project.shortBlurb}</p>
        </div>
      ))}
      <style jsx>{`
        .gallery {
          display: flex;
          overflow-x: scroll;
          padding: 1rem;
align-items: center;
box-shadow: 0px 0px 25px rgb(0, 255, 0, 0.5);
border-radius: 25px;

        }
        .project-card {
          flex: 0 0 auto;
          scroll-snap-align: center;
          cursor: pointer;
          max-height:60vh;
          max-width:60vw;
          padding: 1rem;
          margin-left: 2rem;
          transition: transform 0.5
        }
        .project-card img {
          max-height: 40vh;
        }

         `}</style>
    </div>
  );
};

export default Gallery;
