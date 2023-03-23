import React, { useState } from 'react';
import { Project } from '../project';
import Gallery from './Gallery';
import Focus from './Focus';
import styles from '@/styles/Home.module.css';
import { isUint16Array } from 'util/types';
interface ProjectsProps {
  projects: Project[];
}

enum Mode {
  Gallery,
  Focus,
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // ...logic for switching between Gallery and Focus views
  // keep track of which project is 'in focus'
  const [mode, setMode] = useState<Mode>(Mode.Gallery);
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const [fade, setFade] = useState<boolean>(false);

  
  const focusProject = (project: Project) => {
    setFade(true)
    setTimeout(() =>{
      setMode(Mode.Focus);
      setFocusedProject(project);
      setFade(false)
    }, 250)
  };

  // allow us to return to the gallery from a project
  const returnToGallery = () => {
    setFade(true)
    setTimeout(() =>{
      setMode(Mode.Gallery);
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
    <Gallery projects={projects} focusProject={focusProject}/>
      ):(
    <Focus returnToGallery={returnToGallery}/>
      )}
    </div>
      
  );
};
export default Projects;
