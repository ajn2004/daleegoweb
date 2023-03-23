import Head from 'next/head';
import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import NavBar from '@/components/NavBar';
import About from '@/components/about';
import Projects from '@/components/projects/';
import Contact from '@/components/contact';
import {Project} from '@/components/project';

export default function Home() {
  const background = './roosevelt_island.jpg';
 
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
  
  return (
    <>
      <Head>
        <title>Daleego Innovations</title>
        <meta name="description" content="personal website of Andrew and Desiree Nelson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/guild_icon.png" />
      </Head>
      <main id='main' className = {styles.main}>
      <NavBar />
        <div className={styles.backsplash}
      style={{ backgroundImage: `url(${background})`,
	       height:'100vh',
	       width:'100vw',
	       backgroundSize:'cover'}}>
          
      </div>
      <div style={{height:'100vh',width:'100vw', background:'white', zIndex:'0'}}></div>
      <About />
      <div id='projects' className ={styles.projects}>
        <Projects projects = {projects}/>
      </div>
      <Contact />
      </main>
    </>
  )
}
