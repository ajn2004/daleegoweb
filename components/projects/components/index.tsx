import Daleego from './Daleego';
import Localization from './Localization';
import Bread from './sourdough';
import Varipics from './varipics';
import { Project} from './project';
import Cartography from './cartography';
import Projects from '..';
// Organize the various components to be exported easily to the focus project  
const projects: Project[] = [
    {
      id: 1,
      name: "Daleego.com",
      imageUrl: "/roosevelt_island.jpg",
      shortBlurb: "This website was coded by Andrew in TS without a template.",
      component: Daleego,
      description: ["Writing this website has been a blast. It's one of the first projects I've built entirely in my customized Emacs IDE.", "I incorporated React and Next to create the dynamism you see here. No templates were used and all files were built from scratch.", "I built this with Typescript and React, hosted on a custom Linux server"],
      // outsideLink: 'https://github.com/ajn2004/daleegoweb',
      projectShadow: '75, 159, 248',// the rgb value csv will be properly incorporated elsewhere in the code
      projectBackgr: '30, 30, 30',
      projectText: '199, 183, 133',
      outsideLink: null,
    },
    {
      id: 2,
      name: "Molecular Cartography",
      imageUrl: "/spin_bouton.gif",
      shortBlurb: "Charting the location of molecules in live synapses.",
      component: Cartography,
      description: ["In order to understand 'what something does', you have to know where it is. Localization microscopy can help answer these questions.", "Much of my research focused on reconstructing molecular positions in living neurons.", "Here I was able measure and reconstruct a cell's surface, as well as the location of the synaptic vesicles in 3D.","Tech Stack: MATLAB AI/CV ML, regression, clustering, non-linear low dimensional embeddings."],
      // outsideLink: 'https://www.nature.com/articles/s43586-021-00038-x',
      projectShadow: '129, 18, 214',
      projectBackgr: '30, 30, 30',
      projectText: '199, 183, 133',
      outsideLink: null,
    },
    {
      id: 3,
      name: "Sourdough Bread",
      imageUrl: "/coverBread.jpg",
      shortBlurb: "Where biophysics and hyperfixation cook up something tasty",
      component: Bread,
      description: ["Before the pandemic I took an interest in baking and food preparation.", "This led to growing my own sourdough starter from scratch and learning the craft of sourdough breadmaking.", "I've taken notes from my work and put together a workbook/instruction manual you can use to start your own bread journey."],
      projectShadow: '216, 162, 120',// the rgb value csv will be properly incorporated elsewhere in the code
      projectBackgr: '30, 30, 30',
      projectText: '231, 212, 201',// the rgb value csv will be properly incorporated elsewhere in the code
      outsideLink: null,
    },
    {
      id: 4,
      name: "Localization Microscopy",
      imageUrl: "/scopeCover.jpg",
      shortBlurb: "Pinpointing molecules in a nanoscope.",
      component: Localization,
      description: ["Localization microscopy captures the image of individual molecules in a movie like the one shown here.", "We can utilize AI and computer vision to determine the position of each molecule on the screen. Once we analyze the whole video, we can look at all the molecules at once.", "These molecules are on the surface of a neuron, I used data sets like these to recreate the 3D models shown elsewhere on this site.","Tech Stack: Photonics, Experimental Design, CV/ML, Automation"],
      projectShadow: '0, 218, 24',// the rgb value csv will be properly incorporated elsewhere in the code
      projectBackgr: '30, 30, 30',
      projectText: '230, 130, 210',// the rgb value csv will be properly incorporated elsewhere in the code
      outsideLink: null,
    },
 {
      id: 5,
      name: "Various Pictures", 
      imageUrl: "/scopeSetup.jpg",
      shortBlurb: "I take a lot of pictures, here are some to click through",
      component: Varipics,
      description: ["Here are some of my pictures I want to share, clicking one will take you to the next."],
      projectShadow: '190, 151, 38',// the rgb value csv will be properly incorporated elsewhere in the code
      projectBackgr: '10, 10, 10',
      projectText: '222, 206, 178',// the rgb value csv will be properly incorporated elsewhere in the code
      outsideLink: null,
    },
   
    // ... more projects
];

export {Daleego, Bread, Localization, Cartography, projects}
