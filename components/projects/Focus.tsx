import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { projects } from './components';
// My project specific components are imported here, it's too manual, we should only have
// to import one 'projects' object and go from there

interface FocusProps {
  returnToGallery: () => void,
  projectID: number | null,
}

const Focus: React.FC<FocusProps> = ({ returnToGallery, projectID }) => {
  // we need code that given the projectID, chooses to render the appropriate
  // project data into our focus div
  const project = projects.find((p) => p.id === projectID);

  if (!project){
    return null;
  }
  const [galBack, setGalBack] = useState(project.projectBackgr);
  const ProjectComponent = project.component;

  const handleMouseOver = () => {
    setGalBack(project.projectShadow)
  }
  const handleMouseExit = () => {
    setGalBack(project.projectBackgr)
  }
  return (
    <div className={styles.focus}
      >
      <h1>{project.name}</h1>
      <div className={styles.focusBody}>
        <div className={styles.description}>
          {project.description.map((description) => (
  	    <p
	    key={description}
	    style={{
	      boxShadow: `0px 0px 25px rgb(${project.projectShadow},0.8)`,
	      background: `rgb(${project.projectBackgr}, 0.5)`,
	      color: `rgb(${project.projectText})`,
		}}
	      >{description}</p>
	  ))}
          {project.outsideLink? <p><a href={project.outsideLink}>WOULD YOU LIKE TO KNOW MORE?</a></p>:<></>} 
    </div>
      <div
    style={{
      display: 'flex',
      position: 'relative',
      minHeight: '100%',
      borderRadius: '20px',
      boxShadow: `0px 0px 20px rgb(${project.projectShadow},0.7)`,
    }}
      >
      <ProjectComponent
      /></div>
      </div>
      <div
    className={styles.backGal}
    style={{
      boxShadow: `0px 0px 10px rgb(${project.projectShadow},0.5)`,
      background: `rgb(${galBack}, 0.5)`,
      transition: 'background 0.5s',
      color: `rgb(${project.projectText})`,
		}}
    onClick={returnToGallery}
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseExit}
      >Back to Gallery</div>
    </div>
  );
};

export default Focus;
