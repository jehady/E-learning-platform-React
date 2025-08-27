import React from 'react';

/**
 * CourseInfoBox Component
 * Displays course information and purchase options
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Course title
 * @param {number} props.rating - Course rating
 * @param {string} props.lessons - Number of lessons
 * @param {string} props.documentStatus - Document status
 * @param {number} props.price - Course price
 * @param {Function} props.onBuy - Buy button click handler
 * @param {Function} props.onAddToCart - Add to cart button click handler
 * @returns {JSX.Element} Course info box component
 */
const CourseInfoBox = ({ 
  title, 
  rating, 
  lessons, 
  documentStatus, 
  price, 
  onBuy, 
  onAddToCart 
}) => {
  return (
    <div className="cd-course-info-box">
      <div className="cd-course-title">{title}</div>
      <div className="cd-course-rating">★ {rating}</div>
      <div className="cd-course-meta">Course ({lessons} lessons)</div>
      <div className="cd-course-meta">
        Document <span className="cd-course-free">{documentStatus}</span>
      </div>
      <div className="cd-course-meta">0</div>
      <div className="cd-course-price-row">
        <div className="cd-course-total">
          Total <span className="cd-course-price">${price}</span>
        </div>
      </div>
      <button className="cd-course-buy" onClick={onBuy}>
        Buy now
      </button>
      <button className="cd-course-cart" onClick={onAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default CourseInfoBox;