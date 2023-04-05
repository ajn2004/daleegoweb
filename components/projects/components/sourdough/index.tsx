import React, {useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

const breadPics = [
  '/coverBread.jpg',
  '/crumbShot.jpg',
  '/secondCrumb.jpg',
  '/niceEar.jpg',
]
const fadeTime = 750;

function Sourdough() {
  const [currBread, setCurrBread] = useState<number>(1);
  const [nextBread, setNextBread] = useState<number>((currBread + 1) % breadPics.length);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    const breadInt = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrBread((currBread + 1) % breadPics.length);
        setFade(false);
      }, fadeTime);
    }, 3000);

    return () => {
      clearInterval(breadInt);
    };
  }, [currBread, nextBread]);

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
	alignItems: 'center',
	left: '4rem',
	// border: '1px solid red',
        // height: '100%',
	// width: '100%',
      }}
    >
      <img
        style={{
          borderRadius: '20px',
          maxHeight: '100%',
          // width: '60vh',
          position: 'absolute',
	  boxShadow: '0px 0px 25px rgb(216, 162, 120, 0.8)',
          opacity: fade ? 0 : 1,
          transition: `opacity ${fadeTime / 1000.0}s`,
        }}
        src={breadPics[currBread]}
      />
    </div>
  );
}

export default Sourdough;

