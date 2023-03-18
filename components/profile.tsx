// This is the component to deal with the profile section of my personal website
import styles from '../styles/Home.module.css'

interface proProps {
  name: string;
  bioname: string;
  string1: string;
  string2: string;
  string3: string;
  pic_file: string;
}

const Profile = (props: proProps) => {
  // decalre a bunch of constants for easy modulation
//  let biofile = props.pic_file;
//  let bioname = 'Andrew Nelson PhD';
//  let biostring1 = "Hello, I'm Andrew!"
//  let biostring2 = "I'm a physicist who enjoys building digital tools."
//  let biostring3 = "Welcome to this personal project where I attempt to organize and communicate to you, some of what we're excited about on this website, Daleego.com!"
  let x = 'scale(1,1)'; // not great variable choice but I"m the only coder here
			// x swaps performs a mirror swap to change the profiles between me and desiree
  let border_color = '0px 0px 15px rgb(250, 250, 51, 0.9)'
  if(props.name == 'desiree'){
    x = 'scale(-1,1)';
    border_color = '0px 0px 15px rgb(244, 140, 186, 0.9)'

  };
  
  return(
    <div id={props.name}>
      <div id='profile' className={styles.profile} style={{transform:x,}}>
        <div id={props.name} className={styles.bioname} style={{transform:x}}>
          <u>{props.bioname}</u>
	</div>
	
	<div id='bioframe' className={styles.bioframe} style={{transform:x, boxShadow:border_color}}>
	  <img id='biopic' className={styles.biopic} src = {props.pic_file}></img>
	</div>
        <div id='bio' className={styles.bio} style={{transform:x, boxShadow:border_color}}>
         <div id='biotext' className={styles.biotext}>
	    <p>{props.string1}</p>
	    <p>{props.string2}</p>
	    <p>{props.string3}</p>
	  </div>
	</div>
      </div>
    </div>)
}

export default Profile
