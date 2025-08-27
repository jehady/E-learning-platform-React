import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './UserGuides.css';

const guides = [
  {
    id: 1,
    title: 'Getting Started with the Platform',
    description: 'A step-by-step guide to help you get started quickly.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
  },
  {
    id: 2,
    title: 'How to Enroll in a Course',
    description: 'Learn how to find and enroll in courses that interest you.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
  },
  {
    id: 3,
    title: 'Using the Discussion Forums',
    description: 'Tips and tricks for making the most of our community forums.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42'
  }
];

const UserGuides = () => (
  <div className="guides-page">
    <Header />
    <main className="guides-main">
      <h1 className="guides-title">User Guides</h1>
      <div className="guides-list-grid">
        {guides.map(guide => (
          <div className="guide-card-modern" key={guide.id}>
            <img src={guide.image} alt={guide.title} className="guide-card-img-modern" />
            <div className="guide-card-content-modern">
              <h2 className="guide-card-title-modern">{guide.title}</h2>
              <p className="guide-card-desc-modern">{guide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default UserGuides; 