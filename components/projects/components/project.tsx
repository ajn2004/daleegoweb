import { JSXElementConstructor } from "react";

// Project.ts
export interface Project {
  id: number; // basic ID for the element to look up and sort
  name: string; // Name of the project
  imageUrl: string; // image to the gallery display of the project
  shortBlurb: string; // Gallery length blurb about the project
  description: string[]; // Couple sentence description of this project
  component: () => JSX.Element; // Project's specific rendering element
  projectShadow: string; // a string representing the project's border color to add customization of color palette w/ the project
  projectBackgr: string; // a string representing the project's background color
  projectText: string; // a string representing the project's text over the background for contrast/ colorblindness awareness
  outsideLink: string | null;
}

export interface projectProps {
  background: string;
  shadowColor: string;
}
