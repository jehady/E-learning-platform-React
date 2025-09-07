import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService, API_BASE_URL } from '../utils/api';
import { FaComment, FaDeleteLeft } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';

import { FaStar } from "react-icons/fa"; // star icons




// --- Helper to prepend base URL if relative path ---
function withBase(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
}

// --- Fetch video/image blob with ngrok headers ---
async function fetchWithNgrokHeaders(url) {
  try {
    const res = await fetch(url, {
      headers: { 'ngrok-skip-browser-warning': '1' },
    });
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Failed to fetch media:', url, err);
    return url;
  }
}

// --- Normalize course response ---
function normalizeCourse(res) {
  const root = res?.data ?? res;
  if (!root) return null;
  if (root.course_details) return root.course_details;
  if (root.id && (root.course_name || root.description)) return root;
  return null;
}

// --- Normalize videos response ---
function normalizeVideos(res) {
  const root = res?.data ?? res;
  if (Array.isArray(root)) return root;
  if (Array.isArray(root?.data)) return root.data;
  return [];
}

const CourseDiscussion = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const navigate = useNavigate();

  const [tab, setTab] = useState('discussion');
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [attendancePrompt, setAttendancePrompt] = useState(null); 
  
const [showRatingModal, setShowRatingModal] = useState(false);
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);
const [submitting, setSubmitting] = useState(false);

  // === Fetch exam when tab = Exam ===
  useEffect(() => {
    if (tab === 'Exam') {
      apiService
        .get(`/api/show_exam/${id}`)
        .then((res) => setExam(res.data || res))
        .catch((err) => console.error('Failed to fetch exam:', err));
    }
  }, [tab, id]);

  // === Load course + videos ===
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError('');

        const [courseRes, videosRes] = await Promise.all([
          apiService.get(`/api/getCourseDetails/${id}`),
          apiService.get(`/api/show_videos_by_course/${id}`),
        ]);

        const courseData = normalizeCourse(courseRes);
        console.log(courseData);
        const videosData = normalizeVideos(videosRes);

        if (!courseData) throw new Error('Could not parse course_details');

        if (!cancelled) {
          setCourse({ ...courseData, poster: withBase(courseData.poster)  });

          const normalizedVideos = videosData.map((v) => ({
            ...v,
            url: withBase(v.url),
            poster: withBase(v.poster),
          }));

          setVideos(normalizedVideos);

          if (normalizedVideos[0]) handleVideoSelect(normalizedVideos[0]);
        }
      } catch (e) {
        if (!cancelled) {
          console.error('load() error:', e);
          setError(e?.message || 'Failed to load course');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // === Attendance register ===
  const handleAttendanceRegister = async (videoId, nextVideo) => {
    try {
      await apiService.post('/api/attendance_register', { video_id: videoId });
      

      if (nextVideo) {
        handleVideoSelect(nextVideo);
      }
    } catch (err) {
      console.error('Failed to register attendance:', err);
      alert('Failed to register attendance.');
    }
  };

  // === Select video + fetch its comments ===
  const handleVideoSelect = async (v) => {
    const url = withBase(v.url);
    const poster = withBase(v.poster);

    const videoBlobUrl = await fetchWithNgrokHeaders(url);
    const posterBlobUrl = await fetchWithNgrokHeaders(poster);

    const selected = { ...v, url: videoBlobUrl, poster: posterBlobUrl };
    setSelectedVideo(selected);

    // Fetch comments for this video
    try {
      const res = await apiService.get(`/api/GetAllComments/${v.id}`);
      setComments(res.data || []);
    } catch (err) {
      console.error('Failed to load comments:', err);
      setComments([]);
    }
  };

  // === Post a new comment ===
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedVideo) return;

    try {
      await apiService.post('/api/CreateComment', {
        comment: newComment,
        video_id: selectedVideo.id,
      });

      // Reload comments
      const res = await apiService.get(`/api/GetAllComments/${selectedVideo.id}`);
      setComments(res.data || []);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
      alert('Failed to post comment.');
    }
  };

  if (loading)
    return (
      <div className="page">
        
        <div style={{ padding: 20 }}>Loading course…</div>
        <Footer />
      </div>
    );
  if (error || !course)
    return (
      <div className="page">
        
        <div style={{ padding: 20, color: 'red' }}>{error || 'Course not found'}</div>
        <Footer />
      </div>
    );

  return (
    <div className="page">
      <Header />
      <div className="course-details-container">
        <div className="course-content">
          {/* === Course Header === */}
          <div className="course-header">
            <div className="course-info">
              <div className="course-path">My Courses / In Progress</div>
              <h1 className="course-title">{course?.[0].course_name}</h1>
              <div className="course-meta">
                <span className="instructor">{ course?.[1].
teacher_name|| 'Unknown Instructor'}</span>
                <div className="rating">
                  <span className="rating-value">{course?.[0].rating ?? 0}</span>
                  <span className="rating-count">({course?.[0].rating_count ?? 0} reviews)</span>
                </div>
              </div>
            </div>
            <div className="course-actions">
              <button className="share-button">Share</button>
              <button
  className="save-button"
  onClick={() => setShowRatingModal(true)}
>
  Rate This Course
</button>

            </div>
          </div>

          {/* === Video Section === */}
          <div className="video-container">
            <div className="video-player">
              {selectedVideo ? (
                <video
  key={selectedVideo.id}
  src={selectedVideo.url}
  poster={selectedVideo.poster}
  controls
  className="video-element rounded-2xl shadow-lg"
  width="100%"
  autoPlay
  onEnded={() => {
    if (course?.[0].is_paid == 0) {
      console.log(selectedVideo.id);
      const currentIndex = videos.findIndex((v) => v.id === selectedVideo.id);
      const nextVideo = videos[currentIndex + 1];
      setAttendancePrompt({ videoId: selectedVideo.id, nextVideo });
    }
    else{
      console.log(course);
    }
  }}
/>
              ) : (
                <div className="video-placeholder">No videos available</div>
              )}
            </div>
            {attendancePrompt && attendancePrompt.videoId === selectedVideo.id && (
  <div className="mt-4 flex justify-center">
    <button
      onClick={() => handleAttendanceRegister(attendancePrompt.videoId, attendancePrompt.nextVideo)}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                 text-white font-semibold rounded-xl shadow-md hover:scale-10 transition-all"
    >
      ✅ Mark Attendance & Play Next
    </button>
  </div>
)}

            <div className="sessions-container">
              <h3 className="sessions-title">Sessions</h3>
              <div className="sessions-progress">{`0/${videos.length} Completed`}</div>
              <div className="session-list">
                {videos.map((v, idx) => (
                  <button
                    key={v.id ?? idx}
                    className={`session-item ${selectedVideo?.id === v.id ? 'active' : ''}`}
                    onClick={() => handleVideoSelect(v)}
                  >
                    <div className="session-number">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="session-info">
                      <div className="session-name">{v.title}</div>
                      <div className="session-duration">{v.duration}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* === Tabs Section === */}
          <div className="course-tabs">
            <div className="tabs-header">
              <button className={`tab-button ${tab === 'summary' ? 'active' : ''}`} onClick={() => setTab('summary')}>
                Summary
              </button>
              <button className={`tab-button ${tab === 'discussion' ? 'active' : ''}`} onClick={() => setTab('discussion')}>
                Discussion ({comments.length})
              </button>
              <button className={`tab-button ${tab === 'Reviews' ? 'active' : ''}`} onClick={() => setTab('Reviews')}>
                Reviews 
              </button>
              {selectedVideo?.id === videos[videos.length - 1]?.id && (
                <button className={`tab-button ${tab === 'Exam' ? 'active' : ''}`} onClick={() => setTab('Exam')}>
                  Exam
                </button>
              )}
            </div>

            <div className="tab-content">
              {tab === 'discussion' && (
                <div className="discussion-content">
                  <div className="comment-form-container">
                    <div className="comment-form-header">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="User"
                        className="user-avatar"
                      />
                      <div className="comment-input-container">
                        <form onSubmit={handleCommentSubmit}>
                          <input
                            type="text"
                            placeholder="Leave a public comment"
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                        </form>
                     
                      </div>
                    
                    </div>
                  </div>
                  <div className="comments-list">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="comment">
                          <img
                            src={comment.user?.avatar || 'https://randomuser.me/api/portraits/men/2.jpg'}
                            alt={comment.user?.username || 'User'}
                            className="comment-avatar"
                          />
                          <div className="comment-content">
                            <div className="comment-header">
                              <div className="comment-author">{comment.username || 'Anonymous'}</div>
                              <div className="comment-time">
                                {new Date(comment.created_at).toLocaleString()}
                              </div>
                     </div>
                            
                           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <div className="comment-text">{comment.comment}</div>
  <button
    onClick={async () => {
      if (!window.confirm("Are you sure you want to delete this comment?")) return;
      try {
        await apiService.delete(`/api/DeleteComment/${selectedVideo.id}/${comment.id}`);
        setComments((prev) => prev.filter((c) => c.id !== comment.id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete comment.");
      }
    }}
    style={{
      alignItems:"flex-end",
      background: "none",
      border: "none",
      color: "#ff4757",
      cursor: "pointer",
      fontSize: 18,
      padding: "6px",
      borderRadius: "6px",
      transition: "0.2s ease-in-out",
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#ffe6e6")}
    onMouseOut={(e) => (e.currentTarget.style.background = "none")}
  >
    <FaTrash />
  </button>
</div>


                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No comments yet. Be the first to comment!</p>
                    )}
                  </div>
                </div>
              )}
              {tab === 'summary' && (
                <div className="summary-content">
                  <p>{course?.[0].description || 'No summary available.'}</p>
                </div>
              )}
              {tab === 'Reviews' && (
                <div className="resources-content">
                  <p>Reviews and documents content goes here...</p>
                </div>
              )}
              {tab === 'Exam' && (
                <div className="exam-content">
                  {exam ? (
                    <>
                      <h2>{exam.title}</h2>
                      <p>{exam.description}</p>
                      <button
                        onClick={() => navigate(`/exam/${id}`)}
                        className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                      >
                        Start Exam
                      </button>
                    </>
                  ) : (
                    <p>Loading exam...</p>
                  )}
                </div>
              )}

              {showRatingModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 shadow-lg w-96 text-center">
      <h2 className="text-xl font-bold mb-4">Rate This Course</h2>
      
      {/* Stars */}
      <div className="flex justify-center space-x-2 mb-4">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={starValue}
              size={32}
              className={`cursor-pointer transition ${
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(rating)}
            />
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowRatingModal(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!rating) return alert("Please select a rating!");
            try {
              setSubmitting(true);
              await apiService.post(`/api/courses/${id}/Addrate`, { rate: rating });
              setShowRatingModal(false);
            } catch (err) {
              console.error("Rating failed:", err);
              alert("Failed to submit rating.");
            } finally {
              setSubmitting(false);
            }
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  </div>
)}

            </div>
          </div>
        </div>

        {/* === Sidebar === */}
        <div className="sidebar">
          <div className="promo-card">
            <div className="promo-tag">30% OFF</div>
            <img src={course.poster} alt={course.course_name} className="promo-image" />
            <div className="promo-content">
              <h3 className="promo-title">Unlock Creativity</h3>
              <p className="promo-text">{course.short_description || 'Keep learning and growing!'}</p>
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
