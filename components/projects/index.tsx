import React, { useState } from 'react';
import Gallery from './Gallery';
import Focus from './Focus';
import styles from '@/styles/Home.module.css';

enum Mode {
  Gallery,
  Focus,
}

const Projects = () => {
  
 // ...logic for switching between Gallery and Focus views
  // keep track of which project is 'in focus'
  const [mode, setMode] = useState<Mode>(Mode.Gallery);
  const [projectID, setProjectID] = useState<number | null>(null);
  const [fade, setFade] = useState<boolean>(false);

  // This causes us to swap from gallery to focus
  const focusProject = (index: number) => {
    setFade(true) // fade to soften the transition
    setTimeout(() =>{ // timeout prevents snap changes seen by user
      setMode(Mode.Focus); // swap to focused mode
      setProjectID(index); // 
      setFade(false)
    }, 250)
  };

  // allow us to return to the gallery from a project
  const returnToGallery = () => {
    setFade(true)
    setTimeout(() =>{
      setMode(Mode.Gallery);
      setProjectID(null);
      setFade(false)
    }, 250)  };

  return (
    <div
    className={styles.gallery_glass}
    style={{
      opacity: fade? 0: 1,
      transition: `opacity 0.25s`,
    }}
      >
      {mode == Mode.Gallery? (
	<Gallery
	focusProject={focusProject}
	  />
      ):(
	<Focus
	returnToGallery={returnToGallery}
	projectID={projectID}
	  />
      )}
    </div>
      
  );
};
export default Projects;
