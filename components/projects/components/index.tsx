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
      shortBlurb: "This website was coded by Andrew in TS w/ react and next",
      component: Daleego,
      description: ["Writing this website has been a blast. It's one of the first projects I've built entirely in my customized Emacs IDE.", "I incorporated React and Next to create the dynamism you see here. No templates were used and all files were built from scratch.", "Here's a quick view of some of the code, but you can check it out on github if you're interested."],
      outsideLink: 'https://github.com/ajn2004/daleegoweb',
      projectShadow: '75, 159, 248',// the rgb value csv will be properly incorporated elsewhere in the code
      projectBackgr: '30, 30, 30',
      projectText: '199, 183, 133',
    },
    {
      id: 2,
      name: "Molecular Cartography",
      imageUrl: "/guild_icon.png",
      shortBlurb: "Putting the pieces together.",
      component: SurfaceRender,
      description: ["Writing this website has been a blast. It's one of the first projects I've built entirely in my customized Emacs IDE.", "I incorporated React and Next to create the dynamism you see here.", "Here's a quick view of some of the code, but you can check it out on github if you're interested."],
      projectColor: '75, 159, 248',// the rgb value csv will be properly incorporated elsewhere in the code

    },
    {
      id: 3,
      name: "Dalton Balts",
      imageUrl: "/dalton.gif",
      shortBlurb: "The beerer of boo!",
      component: VRMolecules,
      description: ["Writing this website has been a blast. It's one of the first projects I've built entirely in my customized Emacs IDE.", "I incorporated React and Next to create the dynamism you see here.", "Here's a quick view of some of the code, but you can check it out on github if you're interested."],
      projectColor: '75, 159, 248',// the rgb value csv will be properly incorporated elsewhere in the code

    },
    {
      id: 4,
      name: "Deegs Maleegs", 
      imageUrl: "/diego.gif",
      shortBlurb: "A murderous little snit",
      component: Daleego,
      description: ["Writing this website has been a blast. It's one of the first projects I've built entirely in my customized Emacs IDE.", "I incorporated React and Next to create the dynamism you see here.", "Here's a quick view of some of the code, but you can check it out on github if you're interested."],
      outsideLink: 'https://github.com/ajn2004/daleegoweb',
      projectColor: '75, 159, 248',// the rgb value csv will be properly incorporated elsewhere in the code
    },
    {
      id: 5,
      name: "Localization Microscopy",
      imageUrl: "/DSC02350.JPG",
      shortBlurb: "Built a scope to peep some space.",
      component: Localization,
      description: ["Writing this website has been a blast. It's one of the first projects I've built entirely in my customized Emacs IDE.", "I incorporated React and Next to create the dynamism you see here.", "Here's a quick view of some of the code, but you can check it out on github if you're interested."],
      projectColor: '75, 159, 248',// the rgb value csv will be properly incorporated elsewhere in the code
    },

    // ... more projects
];

export {Daleego, VRMolecules, Localization, SurfaceRender, projects, Project};
