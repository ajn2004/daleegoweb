import { React, useState, useEffect } from 'react';
import { variPics } from './pictures';
import styles from '@/styles/Home.module.css';

const fadeTime = 750;

function Varipics() {
  const [currPic, setCurrPic] = useState<number>(Math.floor(Math.random()*variPics.length));
  const [nextPic, setNextPic] = useState<number>((currPic + 1) % variPics.length);
  const [fade, setFade] = useState<boolean>(false);
  
  const handleClick = () =>{
    setFade(true);
    setTimeout(() => {
      setCurrPic(nextPic);
      setNextPic((nextPic + 1) % variPics.length);
      setFade(false)
    }, fadeTime);
  }
  return (
    <div
    style={{
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      // border: '1px solid red',
      // height: '100%',
      // width: '100%',
    }}
      >
      <img
    onClick={handleClick}
    style={{
      borderRadius: '20px',
      maxHeight: '75%',
      // width: '40vw',
      height: 'auto',
      position: 'absolute',
      boxShadow: '0px 0px 25px rgb(178, 234, 253, 0.8)',
      opacity: fade ? 0 : 1,
      transition: `opacity ${fadeTime / 1000.0}s`,
    }}
    src={'/pics/'.concat(variPics[currPic])}
      />

      </div>
  );
}

export default Varipics;

