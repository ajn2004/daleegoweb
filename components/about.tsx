import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Profile from './profile';

function About() {
  return(
    <div id='about' className={styles.about}>
      <Profile
    name='Andrew'
    bioname='Andrew Nelson PhD'
    string1="Hey there, I'm Andrew"
    string2="I am a physicist who enjoys tackling complex challenges."
    string3="I'm excited to share a little of what We've been working on with you."
    pic_file='./andrew_cats_cropped.png'
    />
      <Profile
    name='desiree'
    bioname='Desiree Nelson'
    string1="Hey there, I'm Desiree"
    string2="I am a solutions architect who enjoys learning by doing."
    string3="Please look around Daleego and get to know more about what we're up to!"
    pic_file='./desiree_icon.png'
    />
      </div>
  );
}

export default About
