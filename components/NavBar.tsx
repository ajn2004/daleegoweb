import React, { useState, useEffect } from 'react';
import styles from "@/styles/Home.module.css";

function NavBar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['main', 'about','projects', 'contact'];

      for (let section of sections.reverse()) {
        const element = document.getElementById(section);
	if (element){
        const rect = element.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom >= 0) {
	    // element.scrollIntoView({behavior: 'smooth'});
            setActive(section);
            break;
          }
	  setActive('contact');
	};
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (section: string) =>{
    const element = document.getElementById(section);
    element?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  const getClassNames = (section) => {
    return active === section ? styles.active : '';
  };
  
  return (
    <div className={styles.navwrap}>
      <div className={styles.navbar}>
      <a onClick={() => handleClick('main')} className={getClassNames('main')}>Home</a>
      <a onClick={() => handleClick('about')} className={getClassNames('about')}>About Us</a>
      <a onClick={() => handleClick('projects')} className={getClassNames('projects')}>Projects</a>
      <a onClick={() => handleClick('contact')} className={getClassNames('contact')}>Contact Us</a>
      </div>
    </div>
  );
}

export default NavBar;
