import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './StudyPage.css';

const sessions = [
  'Consectetur adipisicing elit',
  'Mollit voluptate adipisicing',
  'Officia pariatur Lorem sit',
  'Avoluptate adipisicing',
  'Exercitation elit incididunt esse',
  'Deserunt pariatur eiusmod',
];

const StudyPage = () => {
  return (
    <div className="study-page">
      <Header />
      <main className="sp-main">
        <nav className="sp-breadcrumbs">
          <Link to="/my-courses">My Courses</Link> <span>/</span> <span className="sp-in-progress">In Progress</span>
        </nav>
        <div className="sp-top-section">
          <div className="sp-video-section">
            <h1 className="sp-title">UI Design, A User - Centered Approach</h1>
            <div className="sp-meta">
              <span className="sp-instructor">Klara Weaver</span>
              <span className="sp-rating">4.9 <span className="sp-reviews">(1395 reviews)</span></span>
            </div>
            <div className="sp-video-player">
              <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167" alt="Course Video" />
              <div className="sp-video-overlay">
                <button className="sp-play-btn">▶</button>
              </div>
            </div>
            <div className="sp-tabs">
              <button className="active">Summary</button>
              <button>Discussion (50)</button>
              <button>Resources & documents</button>
              <button>Transcript</button>
            </div>
          </div>
          <aside className="sp-sessions-section">
            <div className="sp-sessions-header">
              <span>Sessions</span>
              <span className="sp-sessions-progress">3/12 Completed</span>
            </div>
            <ul className="sp-sessions-list">
              {sessions.map((s, i) => (
                <li key={i} className={i === 3 ? 'active' : i < 3 ? 'completed' : ''}>
                  <span className="sp-session-index">0{(i+1)}</span>
                  <span className="sp-session-title">{s}</span>
                  {i < 3 && <span className="sp-session-check">✔</span>}
                  {i === 3 && <span className="sp-session-current"></span>}
                </li>
              ))}
            </ul>
            <button className="sp-save-btn">Save</button>
            <button className="sp-share-btn">Share</button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyPage; 