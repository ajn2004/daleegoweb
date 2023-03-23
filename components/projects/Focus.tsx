import React from 'react';

interface FocusProps {
  returnToGallery: () => void,
}

const Focus: React.FC<FocusProps> = ({ returnToGallery }) => {
  // ...rendering logic for the focused project view


  return (
    <div className="focus">
      {/* Render your specific project component here */}
      <button onClick={returnToGallery}>Back to Gallery</button>
    </div>
  );
};

export default Focus;
