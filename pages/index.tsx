import Head from 'next/head';
import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import NavBar from '@/components/NavBar';
import About from '@/components/about';
import Projects from '@/components/projects/';
import Contact from '@/components/contact';
// import {Project} from '@/components/projects/';

export default function Home() {
  const background = './roosevelt_island.jpg';
 
  return (
    <>
      <Head>
        <title>Daleego Innovations</title>
        <meta name="description" content="personal website of Andrew Nelson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/guild_icon.png" />
      </Head>
      <main id='main' className = {styles.main}>
      {<NavBar />}
        <div className={styles.backsplash}
          style={{
            backgroundImage: `url(${background})`,
	    height:'100vh',
	    width:'100%',
	    backgroundSize:'cover'}}
        ></div>
      <div style={{height:'100vh',width:'100%', background:'white', zIndex:'0'}}></div>
      <div
    style={{
      fontSize: '3rem',
      textAlign: 'center',
      // boxShadow: '0px 0px 25px rgb(100,200, 100, 0.5)',
    }}>Welcome to Daleego.com</div>
      <About />
      <div
    style={{
      fontSize: '2rem',
      textAlign: 'center',
      marginTop: '2rem',
      // boxShadow: '0px 0px 25px rgb(100,200, 100, 0.5)',
    }}>Here is a short gallery of some personal projects.</div>
      <div id='projects' className ={styles.projects}>
      <Projects />
      </div>
      <Contact />
      </main>
    </>
  )
}
