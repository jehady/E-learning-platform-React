import React, { useState } from 'react';
import CourseSection from './CourseSection';

/**
 * CourseTabs Component
 * Displays tabbed content for course details
 * 
 * @param {Object} props - Component props
 * @param {Array} props.relatedCourses - Array of related courses
 * @returns {JSX.Element} Course tabs component
 */
const CourseTabs = ({ relatedCourses = [] }) => {
  const [activeTab, setActiveTab] = useState('description');

  // Sample data for reviews
  const reviews = [
    { name: 'Jay Rutherford', time: '12:00 PM', text: 'Veniam mollit et veniam et officia nisi minim fugiat minim consequat dolor pariatur', rating: 4.5 },
    { name: 'Jevon Raynor', time: '12:00 PM', text: 'Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est', rating: 4.5 },
    { name: 'Annie Haley', time: '12:00 PM', text: 'Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint laborum', rating: 4.5 },
    { name: 'Emily Rowey', time: '12:00 PM', text: 'Deserunt minim incididunt cillum nostrud do voluptate excepteur', rating: 4.5 }
  ];

  return (
    <div className="cd-tabs-section">
      <div className="cd-tabs">
        <button 
          className={activeTab === 'description' ? 'active' : ''} 
          onClick={() => setActiveTab('description')}
        >
          Class description
        </button>
        <button 
          className={activeTab === 'benefits' ? 'active' : ''} 
          onClick={() => setActiveTab('benefits')}
        >
          Benefits
        </button>
        <button 
          className={activeTab === 'reviews' ? 'active' : ''} 
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (99)
        </button>
        <button 
          className={activeTab === 'related' ? 'active' : ''} 
          onClick={() => setActiveTab('related')}
        >
          Related courses
        </button>
      </div>
      
      <div className="cd-tab-content">
        {activeTab === 'description' && (
          <div className="cd-description">
            <h3>Class description</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lorem aliquam sed lacinia quis. Nibh dictumst vulputate odio pellentesque ut quis ac, sit ipsum. Sit rhoncus velit in sed massa arcu sit eu. Vitae et vitae eget lorem non dui. Sollicitudin ut in adipiscing dui.</p>
            <p>Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar non rutrum risus dui, risus. Purus massa velit iaculis tincidunt tortor, risus scelerisque risus. In at lorem pellentesque orci ac enim dictum dignissim in. Aenean pulvinar dictum ullamcorper. Vel tor, tortor massa metus purus metus. Maecenas mollis in velit auctor cursus scelerisque eget. Nibh faucibus purus elementum ultrices elementum, urna.</p>
          </div>
        )}
        
        {activeTab === 'benefits' && (
          <div className="cd-benefits">
            <ul className="cd-benefit-list">
              <li>14 hours on-demand video</li>
              <li>Full lifetime access</li>
              <li>Native teacher</li>
              <li>Certificate of complete</li>
              <li>100% free document</li>
              <li>24/7 support</li>
            </ul>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="cd-reviews">
            <div className="cd-reviews-header">★ 4.5 (99 reviews)</div>
            <div className="cd-reviews-list">
              {reviews.map((review, index) => (
                <div className="cd-review-item" key={index}>
                  <div className="cd-review-author">{review.name}</div>
                  <div className="cd-review-time">Rated {review.time}</div>
                  <div className="cd-review-text">{review.text}</div>
                </div>
              ))}
            </div>
            <button className="cd-show-all-reviews">Show all reviews</button>
          </div>
        )}
        
        {activeTab === 'related' && (
          <div className="cd-related">
            <CourseSection 
              title="Related courses" 
              courses={relatedCourses} 
              viewAllLink="#" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTabs;