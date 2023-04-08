import React, { useState, useEffect } from 'react';
import styles from "@/styles/Home.module.css";
import {Link} from 'react-scroll';

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
      <Link
    to="main"
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    className={getClassNames('main')}
    style={{
      fontSize: isActive ? largeFont : smallFont,
      transition: 'font-size 0.5s',
    }}
      >
      Home
    </Link>
      <Link
    to="about"
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    className={getClassNames('about')}
    style={{
      fontSize: isActive ? largeFont : smallFont,
      transition: 'font-size 0.5s',
    }}
      >
      About
    </Link>

     <Link
    to="projects"
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    className={getClassNames('projects')}
    style={{
      fontSize: isActive ? largeFont : smallFont,
      transition: 'font-size 0.5s',
    }}
      >
      Projects
    </Link>

      <Link
    to="contact"
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    className={getClassNames('contact')}
    style={{
      fontSize: isActive ? largeFont : smallFont,
      transition: 'font-size 0.5s',
    }}
      >
      Contact Me
    </Link>

      </div>
    </div>
  );
}

export default NavBar;
