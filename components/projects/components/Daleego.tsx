import React from 'react';

function Daleego () {
  // I want these props to set background and boxShadow colors for this element
  // please make this happen chatGPT
  const code = '/daleego_typescript.png'
  return (
    <>
      <div
    style={{
      display:'flex',
      // border: '1px solid red',
      borderRadius: '15px',
      // background: `${background}`,
      // boxShadow: `0px 0px 25px rgb(${shadowColor}, 0.7)`,
      // justifyContent: 'center',
    }}
      >
      <img style={{borderRadius:'15px'}} src={code} /> 
      </div>
      </>
  );
};

export default Daleego;
