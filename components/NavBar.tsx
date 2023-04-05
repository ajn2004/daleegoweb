import React, { useState, useEffect } from 'react';
import styles from "@/styles/Home.module.css";

function NavBar() {
  const [active, setActive] = useState('');
  const [isActive, setIsActive] = useState(false);

  const largeFont = '2rem';
  const smallFont = '1rem';

  const handleClick = (section: string) =>{
    const element = document.getElementById(section);
    element?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  const getClassNames = (section: string) => {
    return active === section ? styles.active : '';
  };
  const handleMouseEnter = () =>{
    setIsActive(true);
  }
  const handleMouseLeave = () =>{
    setIsActive(false);
  }
  return (
    <div
    className={styles.navwrap}
    style={{
      width: isActive?'15%':'5%',
      transition: 'width 0.5s',
    }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
      >
      <div
    className={styles.navbar}

      >
      <a
    onClick={() => handleClick('main')}
    className={getClassNames('main')}
    style={{
      fontSize: isActive?largeFont:smallFont,
      transition: 'font-size 0.5s',
    }}
      >Home</a>
      <a
    onClick={() => handleClick('about')}
    className={getClassNames('about')}
    style={{
      fontSize: isActive?largeFont:smallFont,
      transition: 'font-size 0.5s',
    }}>About</a>
      <a
    onClick={() => handleClick('projects')}
    className={getClassNames('projects')}
    style={{
      fontSize: isActive?largeFont:smallFont,
      transition: 'font-size 0.5s',
    }}>Projects</a>
      <a
    onClick={() => handleClick('contact')}
    className={getClassNames('contact')}
    style={{
      fontSize: isActive?largeFont:smallFont,
      transition: 'font-size 0.5s',
    }}>Contact Me</a>
      </div>
    </div>
  );
}

export default NavBar;
