import React, { useState } from 'react';
import { Project } from '../project';
import Gallery from './Gallery';
import Focus from './Focus';
import styles from '@/styles/Home.module.css';
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
  const focusProject = (project: Project) => {
    setMode(Mode.Focus);
    setFocusedProject(project);
  };

  // allow us to return to the gallery from a project
  const returnToGallery = () => {
    setMode(Mode.Gallery);
  };

  return (
    <div
    className={styles.gallery_glass}
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
