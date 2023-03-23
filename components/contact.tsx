// component to deal with the profile section of my personal website
import styles from '../styles/Home.module.css'


function Contact() {
  // 
  
  return(
    <div id='contact' className={styles.contact}>
      <h1> Want to get in touch with us?</h1>
      <div className={styles.contact_wrap}>
        <div className={styles.contact_card}>
      <h2> Andrew Card </h2>
        </div>
        <div className={styles.contact_card}>
          <h2> Desiree Card </h2>
        </div>
      </div> 
    </div>
  )
}

export default Contact
