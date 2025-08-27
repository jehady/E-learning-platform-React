import React from 'react';

const Banner = () => {
  return (
    <div className="banner-modern">
      <div className="banner-container">
        <div className="banner-content">
          <h2 className="banner-title">Digital Illustrations</h2>
          <p className="banner-text">
            Master the art of digital illustration with expert techniques and creative workflows. 
            Learn from industry professionals and bring your ideas to life.
          </p>
          <button className="banner-button">Explore more</button>
        </div>
        <div className="banner-image-container">
          <img 
            src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8" 
            alt="Person working on digital illustrations" 
            className="banner-image" 
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;