import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Webinars.css';

const webinars = [
  {
    id: 1,
    title: 'Live Q&A: UI/UX Trends 2024',
    date: 'July 10, 2024',
    host: 'Jane Doe',
    description: 'Join us for a live Q&A session on the latest trends in UI/UX design.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
  },
  {
    id: 2,
    title: 'Building Your First Design System',
    date: 'August 2, 2024',
    host: 'John Smith',
    description: 'A practical webinar on how to create and maintain a design system.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
  },
  {
    id: 3,
    title: 'Portfolio Review Workshop',
    date: 'September 15, 2024',
    host: 'Emily Clark',
    description: 'Get feedback on your portfolio from industry experts.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167'
  }
];

const Webinars = () => (
  <div className="webinars-page">
    <Header />
    <main className="webinars-main">
      <h1 className="webinars-title">Webinars</h1>
      <div className="webinars-list-grid">
        {webinars.map(webinar => (
          <div className="webinar-card-modern" key={webinar.id}>
            <img src={webinar.image} alt={webinar.title} className="webinar-card-img-modern" />
            <div className="webinar-card-content-modern">
              <h2 className="webinar-card-title-modern">{webinar.title}</h2>
              <div className="webinar-card-meta-modern">{webinar.date} · Host: {webinar.host}</div>
              <p className="webinar-card-desc-modern">{webinar.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Webinars; 