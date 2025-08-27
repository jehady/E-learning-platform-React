import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseGallery from '../components/CourseGallery';
import CourseTabs from '../components/CourseTabs';
import InstructorCard from '../components/InstructorCard';
import CourseInfoBox from '../components/CourseInfoBox';
import StripePaymentModal from '../components/StripePaymentModal';
import './CourseDetails.css';

const relatedCourses = [
  {
    id: 1,
    title: 'Digital Poster Design: Best Practices',
    category: 'Graphic Design',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42',
    rating: 4.5,
    ratingCount: '1233',
    price: 99
  },
  {
    id: 2,
    title: 'Build Awesome Color Palette for Your App',
    category: 'UI/UX Design',
    tag: '15% off',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
    rating: 4.5,
    ratingCount: '123',
    price: 49
  },
  {
    id: 3,
    title: 'Principles of Great UI Design System',
    category: 'UI/UX Design',
    tag: '',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
    rating: 4.5,
    ratingCount: '123',
    price: 29
  },
  {
    id: 4,
    title: 'Prototype for Your First Mobile Application',
    category: 'Photography & Video',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    rating: 4.5,
    ratingCount: '123',
    price: 49
  }
];

const CourseDetails = () => {
  const [showStripe, setShowStripe] = useState(false);

  // Handler for following instructor
  const handleFollowInstructor = () => {
    // In a real implementation, this would make an API call
    alert('Following instructor! (API call would go here)');
  };

  // Handler for buying course
  const handleBuyCourse = () => {
    setShowStripe(true);
  };

  // Handler for adding to cart
  const handleAddToCart = () => {
    // In a real implementation, this would make an API call
    alert('Added to cart! (API call would go here)');
  };

  return (
    <div className="course-details-page">
      <main className="cd-main">
        <section className="cd-header">
          <nav className="cd-breadcrumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Design</span> <span>/</span> <span>UI/UX Design</span>
          </nav>
          <h1 className="cd-title">UI Design, A User-Centered Approach</h1>
          <div className="cd-meta">
            <span className="cd-rating">★ 4.5 <span className="cd-reviews">(99 reviews)</span></span>
            <span className="cd-instructor">Klara Weaver</span>
          </div>
        </section>
        
        <section className="cd-content-wrapper">
          <div className="cd-main-content">
            <CourseGallery
              mainImage="https://images.unsplash.com/photo-1511367461989-f85a21fda167"
              thumbnails={[
                "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
                "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"
              ]}
            />
            <CourseTabs relatedCourses={relatedCourses} />
          </div>
          
          <aside className="cd-sidebar">
            <InstructorCard
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
              name="Klara Weaver"
              role="Top teacher"
              onFollow={handleFollowInstructor}
            />
            <CourseInfoBox
              title="UX: Design with a User..."
              rating={4.5}
              lessons="12"
              documentStatus="Free"
              price={49}
              onBuy={handleBuyCourse}
              onAddToCart={handleAddToCart}
            />
          </aside>
        </section>
      </main>
      <StripePaymentModal
        open={showStripe}
        onClose={() => setShowStripe(false)}
        price={49}
      />
    </div>
  );
};

export default CourseDetails;
