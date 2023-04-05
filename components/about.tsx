import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Profile from './profile';

function About() {
  return(
    <div id='about' className={styles.about}>
      <Profile
    name='Andrew'
    bioname='Andrew Nelson PhD'
    string1="Hi, I'm Andrew, and with me are Dalton and Diego"
    string2="I am a physicist who enjoys tackling complex challenges and building data-driven solutions."
    string3="Daleego is a play on the cats' names, as well as a platform for me to explore webhosting and project communication."
    pic_file='./andrew_cats_cropped.png'
      />
      </div>
  );
}

export default About
