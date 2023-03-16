import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from "@/styles/Home.module.css";

function NavBar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['main', 'profile', 'about', 'projects', 'contact'];

      for (let section of sections.reverse()) {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
	console.log(rect)
         if (rect.top <= 0 && rect.bottom >= 0) {
          setActive(section);
          break;
         }
	setActive('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getClassNames = (section) => {
    return active === section ? styles.active : '';
  };

  return (
    <div className={styles.navwrap}>
      <div className={styles.navbar}>
      <a href="#main" className={getClassNames('main')}>Home</a>
        <a href="#profile" className={getClassNames('profile')}>About Us</a>
        <a href="#about" className={getClassNames('about')}>Daleego</a>
        <a href="#projects" className={getClassNames('projects')}>Projects</a>
        <a href="#contact" className={getClassNames('contact')}>Contact Us</a>
      </div>
    </div>
  );
}

export default NavBar;
