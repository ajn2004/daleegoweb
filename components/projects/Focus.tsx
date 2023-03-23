import React from 'react';
import styles from '@/styles/Home.module.css';

interface FocusProps {
  returnToGallery: () => void,
  projectID: number | null,
}

const Focus: React.FC<FocusProps> = ({ returnToGallery, projectID }) => {
  // ...rendering logic for the focused project view


  return (
    <div className={styles.focus}>
      <p>Project ID: {projectID}</p>
      <button onClick={returnToGallery}>Back to Gallery</button>
    </div>
  );
};

export default Focus;
