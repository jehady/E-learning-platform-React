import React from 'react';
import CourseSection from '../components/CourseSection';
import Banner from '../components/Banner';

const Home = () => {
  // Sample data for recommended courses
  const recommendedCourses = [
    {
      id: 1,
      title: 'Grow Your Video Editing Skills from Experts',
      category: 'Video',
      tag: 'Best',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728',
      rating: 4.8,
      ratingCount: '1024',
      price: 39
    },
    {
      id: 2,
      title: 'Easy and Creative Food Art Ideas Decoration',
      category: 'Photography',
      tag: '',
      image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65',
      rating: 4.6,
      ratingCount: '1235',
      price: 59
    },
    {
      id: 3,
      title: 'Create Your Own Sustainable Fashion Style',
      category: 'Lifestyle',
      tag: '',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
      rating: 4.9,
      ratingCount: '1025',
      price: 29
    },
    {
      id: 4,
      title: 'Grow Your Skills Fashion Marketing',
      category: 'Marketing',
      tag: 'Hot',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      rating: 4.8,
      ratingCount: '1075',
      price: 39
    }
  ];

  // Sample data for popular courses
  const popularCourses = [
    {
      id: 5,
      title: 'Digital Poster Design: Best Practices',
      category: 'Graphic Design',
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42',
      rating: 4.7,
      ratingCount: '1024',
      price: 39
    },
    {
      id: 6,
      title: 'Create Emotional & Trendy Typography',
      category: 'Graphic Design',
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      rating: 4.3,
      ratingCount: '875',
      price: 59
    },
    {
      id: 7,
      title: 'Create Vector Illustrations for Beginner',
      category: 'Graphic Design',
      tag: '',
      image: 'https://images.unsplash.com/photo-1545670723-196ed0954986',
      rating: 4.8,
      ratingCount: '1025',
      price: 29
    },
    {
      id: 8,
      title: 'How to Design a Creative Book Cover',
      category: 'Graphic Design',
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
      rating: 4.5,
      ratingCount: '1075',
      price: 19
    }
  ];

  // Sample data for trending courses
  const trendingCourses = [
    {
      id: 9,
      title: 'UI Design, a User-Centered Approach',
      category: 'UX/UI Design',
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
      rating: 4.8,
      ratingCount: '1024',
      price: 49
    },
    {
      id: 10,
      title: 'Pick Awesome Color Palette for Your App',
      category: 'UX/UI Design',
      tag: 'Hot',
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960',
      rating: 4.2,
      ratingCount: '875',
      price: 59
    },
    {
      id: 11,
      title: 'Principles of Great UI Design System',
      category: 'UX/UI Design',
      tag: '',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
      rating: 4.9,
      ratingCount: '1025',
      price: 99
    },
    {
      id: 12,
      title: 'Prototype Your First Mobile Application',
      category: 'UX/UI Design',
      tag: 'Hot',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
      rating: 4.3,
      ratingCount: '1075',
      price: 39
    }
  ];

  return (
    <div className="page">
      
      <CourseSection 
        title="Recommended for you" 
        courses={recommendedCourses} 
        viewAllLink="/courses/recommended" 
      />
      
      <Banner />
      
      <CourseSection 
        title="Popular courses" 
        courses={popularCourses} 
        viewAllLink="/courses/popular" 
      />
      
      <CourseSection 
        title="Trending courses" 
        courses={trendingCourses} 
        viewAllLink="/courses/trending" 
      />
    </div>
  );
};

export default Home;