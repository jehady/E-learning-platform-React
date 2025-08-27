import React, { useState } from 'react';

/**
 * CourseGallery Component
 * Displays course images with thumbnail navigation
 * 
 * @param {Object} props - Component props
 * @param {string} props.mainImage - Main course image URL
 * @param {Array<string>} props.thumbnails - Array of thumbnail image URLs
 * @returns {JSX.Element} Course gallery component
 */
const CourseGallery = ({ mainImage, thumbnails }) => {
  const [currentImage, setCurrentImage] = useState(mainImage);

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="cd-gallery-section">
      <div className="cd-gallery-main">
        <img src={currentImage} alt="Course" className="cd-gallery-main-img" />
      </div>
      <div className="cd-gallery-thumbs">
        {thumbnails.map((thumb, index) => (
          <img 
            key={index}
            src={thumb} 
            alt={`thumb${index + 1}`} 
            onClick={() => handleThumbnailClick(thumb)}
            className={currentImage === thumb ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGallery;