import React, { useState, useEffect } from "react";
import './image.css'
import startImage from './images/start.jpg';

const Image = () => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const footerHeight = document.querySelector('.footer').clientHeight;
    const headerHeight = document.querySelector('.head').clientHeight;
    setImageHeight(`calc(100vh - ${footerHeight + headerHeight}px)`);
  }, []);

  return (
    <div className="image-block" style={{ height: imageHeight }}>
      <img src={startImage} alt="Start" />
    </div>
  )
}

export default Image