import React from 'react';
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

  const ProjectComponent = project.component;
  
  return (
    <div className={styles.focus}>
      <h1>{project.name}</h1>
      <div className={styles.focusBody}>
        <div className={styles.description}>
          {project.description.map((description) => (
  	    <p
	    key={description}
	    style={{
	      boxShadow: `0px 0px 20px rgb(${project.projectShadow},0.9)`,
	      background: `rgb(${project.projectBackgr}, 0.7)`,
	      color: `rgb(${project.projectText})`,
		}}
	      >{description}</p>
	  ))}
          {project.outsideLink? <p><a href={project.outsideLink}>WOULD YOU LIKE TO KNOW MORE?</a></p>:<></>} 
        </div>
      <ProjectComponent
    shadowColor={project.shadowColor}
    background={project.background}
      />
      </div>
      <button onClick={returnToGallery}>Back to Gallery</button>
    </div>
  );
};

export default Focus;
