import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const CourseDiscussion = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('discussion');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Anna',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      time: '12:03 PM',
      content: 'Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est laborum labore. Mollit commodo in do dolor ut in mollit est sint esse nostrud ipsum laboris incididunt nulla officia sunt minim. Nisi dolore velit ea occaecat labore minim ea do.',
      images: [],
    },
    {
      id: 2,
      author: 'John',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '08:10 AM',
      content: 'Id ullamco qui tempor consectetur fugiat magna officia eiusmod et fugiat laboris et culpa nostrud non veniam. Excepteur ut labore cillum laborum est id magna dolore.Ipsum sunt culpa esse excepteur voluptate a',
      images: [
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
        'https://images.unsplash.com/photo-1541462608143-67571c6738dd',
      ],
    },
    {
      id: 3,
      author: 'Klara Weaver',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '08:20 AM',
      content: 'Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est laborum labore. Mollit commodo in do dolor ut in mollit est sint esse.',
      images: [],
    },
    {
      id: 4,
      author: 'Lisa',
      avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
      time: '10:50 AM',
      content: 'Ipsum reprehenderit nisi culpa qui commodo aliqua do officia Lorem amet nisi nulla ullamco anim do ea amet eiusmod quis. Voluptate eiusmod ipsum aliqua ad eiusmod dolore pariatur est ullamco Lorem',
      images: [],
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        author: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: newComment,
        images: [],
      },
    ]);
    setNewComment('');
  };

  return (
    <div className="page">
      <Header />
      <div className="course-details-container">
        <div className="course-content">
          <div className="course-header">
            <div className="course-info">
              <div className="course-path">My Courses / In Progress</div>
              <h1 className="course-title">UI Design, A User - Centered Approach</h1>
              <div className="course-meta">
                <span className="instructor">Klara Weaver</span>
                <div className="rating">
                  <span className="rating-value">4.9</span>
                  <span className="rating-count">(1395 reviews)</span>
                </div>
              </div>
            </div>
            <div className="course-actions">
              <button className="share-button">Share</button>
              <button className="save-button">Save</button>
            </div>
          </div>
          <div className="video-container">
            <div className="video-player">
              <div className="video-placeholder">
                <div className="play-button">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.8"/>
                    <path d="M32 24L20 30V18L32 24Z" fill="#5D5FEF"/>
                  </svg>
                </div>
              </div>
              <div className="video-controls">
                <button className="control-button play">▶</button>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '30%' }}></div>
                  </div>
                  <div className="time">1:45 / 5:30</div>
                </div>
                <div className="right-controls">
                  <button className="control-button">■</button>
                  <button className="control-button">☰</button>
                  <button className="control-button">⟳</button>
                </div>
              </div>
            </div>
            <div className="sessions-container">
              <h3 className="sessions-title">Sessions</h3>
              <div className="sessions-progress">3/12 Completed</div>
              <div className="session-list">
                <div className="session-item completed"><div className="session-number">01</div><div className="session-info"><div className="session-name">Consectetur adipiscing elit</div><div className="session-status completed">✓</div></div></div>
                <div className="session-item completed"><div className="session-number">02</div><div className="session-info"><div className="session-name">Mollit voluptate adipisicing</div><div className="session-status completed">✓</div></div></div>
                <div className="session-item completed"><div className="session-number">03</div><div className="session-info"><div className="session-name">Officia pariatur Lorem sit</div><div className="session-status completed">✓</div></div></div>
                <div className="session-item active"><div className="session-number">04</div><div className="session-info"><div className="session-name">Avouptate adipisicing</div><div className="session-status active">▶</div></div></div>
                <div className="session-item"><div className="session-number">05</div><div className="session-info"><div className="session-name">Exercitation elit incididunt esse</div></div></div>
                <div className="session-item"><div className="session-number">06</div><div className="session-info"><div className="session-name">Deserunt pariatur elusm</div></div></div>
              </div>
            </div>
          </div>
          <div className="course-tabs">
            <div className="tabs-header">
              <button className={`tab-button ${tab === 'summary' ? 'active' : ''}`} onClick={() => setTab('summary')}>Summary</button>
              <button className={`tab-button ${tab === 'discussion' ? 'active' : ''}`} onClick={() => setTab('discussion')}>Discussion (50)</button>
              <button className={`tab-button ${tab === 'resources' ? 'active' : ''}`} onClick={() => setTab('resources')}>Resources & documents</button>
              <button className={`tab-button ${tab === 'transcript' ? 'active' : ''}`} onClick={() => setTab('transcript')}>Transcript</button>
            </div>
            <div className="tab-content">
              {tab === 'discussion' && (
                <div className="discussion-content">
                  <div className="comment-form-container">
                    <div className="comment-form-header">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="user-avatar" />
                      <div className="comment-input-container">
                        <form onSubmit={handleCommentSubmit}>
                          <input
                            type="text"
                            placeholder="Leave a public comment"
                            className="comment-input"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                          />
                        </form>
                      </div>
                      <button className="emoji-button">😊</button>
                      <button className="attachment-button">📎</button>
                    </div>
                  </div>
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="comment">
                        <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
                        <div className="comment-content">
                          <div className="comment-header">
                            <div className="comment-author">{comment.author}</div>
                            <div className="comment-time">{comment.time}</div>
                          </div>
                          <div className="comment-text">{comment.content}</div>
                          {comment.images && comment.images.length > 0 && (
                            <div className="comment-images">
                              {comment.images.map((img, idx) => (
                                <img key={idx} src={img} alt="Comment attachment" className="comment-image" />
                              ))}
                            </div>
                          )}
                          <div className="comment-actions">
                            <button className="comment-action-button">Like</button>
                            <button className="comment-action-button">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="load-more-button">Show more discussion (47)</button>
                  </div>
                </div>
              )}
              {tab === 'summary' && <div className="summary-content"><p>Course summary content goes here...</p></div>}
              {tab === 'resources' && <div className="resources-content"><p>Resources and documents content goes here...</p></div>}
              {tab === 'transcript' && <div className="tutorial-content"><p>Transcript content goes here...</p></div>}
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="promo-card">
            <div className="promo-tag">30% OFF</div>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="Promo" className="promo-image" />
            <div className="promo-content">
              <h3 className="promo-title">Unlock Creativity</h3>
              <p className="promo-text">Ut sit aute non mollit consequat consequat conse</p>
              <button className="promo-button">View more</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDiscussion; 