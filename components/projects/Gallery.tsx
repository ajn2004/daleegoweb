import React, { useState, useRef } from 'react';
import { Project } from '../project';
import useScroll from './useScroll';
import styles from '@/styles/Home.module.css';
interface GalleryProps {
  projects: Project[];
  focusProject: (project: Project) => void;
}

const Gallery: React.FC<GalleryProps> = ({ projects, focusProject }) => {
  const { 
    galleryRef, 
    handleMouseEnter, 
    handleMouseLeave, 
    handleUserDisengage,
    hoveredProject
  } = useScroll(projects);

  return (
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
  );
};

export default Gallery;
