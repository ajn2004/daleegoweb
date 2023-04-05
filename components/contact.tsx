// component to deal with the profile section of my personal website
import styles from '../styles/Home.module.css'


function Contact() {
  // 
  
  return(
    <div id='contact' className={styles.contact}>
      <h1> Want to get in touch with me?</h1>
      <div className={styles.contact_wrap}>
      <div className={styles.contact_card}>
      <a href="mailto:andrewnelsnyc@gmail.com" rel="noopener noreferrer" target="_blank">
      <img src='./email.png' style={{filter: 'grayscale(100%) invert(100%)'}}/></a>
      <a href='https://www.github.com/ajn2004' target="_blank"
    style={{marginLeft: '10px'}}
      ><img src='./GitHub-Mark-Light-32px.png'/></a>
      <a href='https://www.linkedin.com/in/ajnelsnyc/' target="_blank">
      <img src='./LI-In-Bug.png'
    style={{
      maxHeight: '32px',
      marginLeft: '10px',
    }}
      /></a>
      <a href='https://docs.google.com/document/d/e/2PACX-1vQkOGPoioEYRWZNrbkaeha6HIi6HU_MXGTqmVZWO4x05abXIhVq0DArcgpdqopvtSBbo-wGKoTgYNZm/pub' target="_blank">
      <img src='./user.png'
    style={{
      maxHeight: '32px',
      marginLeft: '10px',
      filter: 'grayscale(100%) invert(100%)',
    }}
      /></a>
      </div>
      </div> 
    </div>
  )
}

export default Contact
