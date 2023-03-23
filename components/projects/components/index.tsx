import Daleego from './Daleego';
import Localization from './Localization';
import SurfaceRender from './SurfaceRender';
import VRMolecules from './VRMolecules';
import { Project } from './project';
// Organize the various components to be exported easily to the focus project  
const projects: Project[] = [
    {
      id: 1,
      name: "Daleego.com",
      imageUrl: "/roosevelt_island.jpg",
      shortBlurb: "This website was coded by Andrew in TSX w/ react and next",
    },
    {
      id: 2,
      name: "Molecular Cartography",
      imageUrl: "/guild_icon.png",
      shortBlurb: "Putting the pieces together.",
    },
    {
      id: 3,
      name: "Dalton Balts",
      imageUrl: "/dalton.gif",
      shortBlurb: "The beerer of boo!",
    },
    {
      id: 4,
      name: "Deegs Maleegs", 
      imageUrl: "/diego.gif",
      shortBlurb: "A murderous little snit",
    },
    {
      id: 5,
      name: "Localization Microscopy",
      imageUrl: "/DSC02350.JPG",
      shortBlurb: "Built a scope to peep some space.",
    },

    // ... more projects
];

export {Daleego, VRMolecules, Localization, SurfaceRender, projects, Project};
