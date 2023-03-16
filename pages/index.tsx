import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/NavBar';
import About from '@/components/about';

export default function Home() {
  const background = './roosevelt_island.jpg';
  return (
    <>
      <Head>
        <title>Daleego Innovations</title>
        <meta name="description" content="personal website of Andrew and Desiree Nelson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id='main' className = {styles.main}>
      <NavBar />
        <div className={styles.backsplash}
      style={{ backgroundImage: `url(${background})`,
	       height:'100vh',
	       width:'100vw',
	       backgroundSize:'cover'}}>
          
      </div>
      <div style={{height:'100vh'}}></div>
      <div id='profile'>words about us</div>
      <About />
      <div id='projects'>links and pictures</div>
      <div id='contact'>say hello</div>
      </main>
    </>
  )
}
