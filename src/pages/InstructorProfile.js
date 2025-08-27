import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './InstructorProfile.css';
import CreateCourseModal from '../components/CreateCourseModal';
import AddVideoModal from '../components/AddVideoModal';
import api from '../utils/api';

const instructor = {
  name: 'Klara Weaver',
  title: 'Senior UI/UX Designer',
  location: 'New York',
  time: '09:30 AM',
  tags: ['Teacher', 'Designer'],
  overview: 'Adipisicing ipsum commodo cupidatat Lorem ei velit laborum laborum proident. Nulla voluptate deserunt ipsum dolor nostrud dolor eu anim elit aliqua excepteur dolor velit voluptate mollit aliqua no',
  rating: 4.8,
  reviews: '1000+',
  courses: 12,
  students: '1000+',
  certificates: ['Google UX Design Professional'],
  profileLink: 'https://Klara-Design.com',
  courses: [
    {
      id: 1,
      title: 'UI Design, A User-Centered Approach',
      date: 'May 2021',
      rating: 4.8,
      price: 49,
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167',
      description: 'Anim aliqua fugiat consequat minim in sunt aute aliqua labore sint consectetur',
      duration: '14 hours',
      lessons: 12,
      tag: 'Free Document'
    },
    {
      id: 2,
      title: 'How to Set Up a Design System',
      date: 'May 2021',
      rating: 4.8,
      price: 79,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
      description: 'Anim aliqua fugiat consequat minim in sunt aute aliqua labore sint consectetur labore culpa adi',
      duration: '14 hours',
      lessons: 12
    }
  ]
};

const InstructorProfile = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams(); // Get instructor ID from URL params
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [instructorData, setInstructorData] = useState(instructor); // Default data
  
  // Get current user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
  const isTeacher = userRoles.includes('teacher');
  
  // Check if the current user is viewing their own profile
  const isOwnProfile = userData.id && (instructorId ? userData.id.toString() === instructorId : true);
  
  // Fetch instructor data based on instructorId
  useEffect(() => {
    if (instructorId) {
      // In a real app, you would fetch the instructor data from the API
      // For now, we'll use the mock data
      console.log(`Fetching instructor data for ID: ${instructorId}`);
      // Example API call (commented out):
      // api.get(`/api/instructors/${instructorId}`)
      //   .then(response => setInstructorData(response.data.data))
      //   .catch(error => console.error('Error fetching instructor data:', error));
    }
  }, [instructorId]);
  
  const handleEditProfile = () => {
    // In a real app, this would navigate to an edit profile page or open a modal
    console.log('Edit profile clicked');
    alert('Edit profile functionality would be implemented here.');
    // navigate('/edit-profile');
  };
  
  const handleCreateCourse = (courseFormData) => {
    // Store the course data and proceed to video upload
    console.log('Creating course:', courseFormData);
    setCourseData(courseFormData);
    setShowCreateCourseModal(false);
    setShowAddVideoModal(true);
  };
  
  const handleAddVideo = (videoData) => {
    // Add the video to the list of videos for this course
    console.log('Adding video:', videoData);
    setVideos([...videos, videoData]);
  };
  
  const handleFinishCourse = () => {
    // Finalize the course creation process
    console.log('Finishing course with videos:', videos);
    setShowAddVideoModal(false);
    
    // Show success message
    alert('Course created successfully with ' + videos.length + ' videos!');
    
    // Reset state
    setCourseData(null);
    setVideos([]);
    
    // Refresh the page to show the new course (in a real app, you would update the state)
    // window.location.reload();
  };
  
  return (
    <div className="profile-page">
      <main className="profile-main">
        <div className="profile-breadcrumb">Home / UI/UX Design / Teacher's profile</div>
        {isTeacher && isOwnProfile && (
          <div className="teacher-actions">
            <button 
              className="create-course-btn" 
              onClick={() => setShowCreateCourseModal(true)}
            >
              Create New Course
            </button>
          </div>
        )}
        <div className="profile-content-row">
          <section className="profile-main-section">
            <div className="profile-info-card">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt={instructorData.name} className="profile-avatar" />
              <div className="profile-info-details">
                <div className="profile-info-header">
                  <div>
                    <h1 className="profile-name">{instructorData.name}</h1>
                    <div className="profile-title">{instructorData.title}</div>
                    <div className="profile-location-row">
                      <span className="profile-location">{instructorData.location}</span> · <span className="profile-time">{instructorData.time}</span>
                    </div>
                  </div>
                  <span className="profile-top-teacher">Top teacher</span>
                </div>
                <div className="profile-tags-row">
                  {instructorData.tags && instructorData.tags.map((tag, index) => (
                    <span key={index} className={`profile-tag ${tag.toLowerCase() === 'designer' ? 'designer' : ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="profile-overview-card">
              <h2>Overview</h2>
              <p>{instructorData.overview}</p>
              <div className="profile-stats-row">
                <div className="profile-stat"><div className="profile-stat-label">Rating</div><div className="profile-stat-value">{instructorData.rating}</div></div>
                <div className="profile-stat"><div className="profile-stat-label">Reviews</div><div className="profile-stat-value">{instructorData.reviews}</div></div>
                <div className="profile-stat"><div className="profile-stat-label">Courses</div><div className="profile-stat-value">{instructorData.courses.length}</div></div>
                <div className="profile-stat"><div className="profile-stat-label">Students</div><div className="profile-stat-value">{instructorData.students}</div></div>
              </div>
            </div>
            <div className="profile-courses-section">
              <div className="profile-courses-header-row">
                <h2>Courses</h2>
                <div className="profile-courses-sort">Sort by: Newest</div>
              </div>
              <div className="profile-courses-list">
                {instructorData.courses.map(course => (
                  <div className="profile-course-card" key={course.id}>
                    <div className="profile-course-img-wrap">
                      <img src={course.image} alt={course.title} className="profile-course-img" />
                      {course.tag && <span className="profile-course-tag">{course.tag}</span>}
                    </div>
                    <div className="profile-course-info">
                      <div className="profile-course-date">{course.date}</div>
                      <div className="profile-course-title-row">
                        <h3 className="profile-course-title">{course.title}</h3>
                        <span className="profile-course-price">${course.price}</span>
                      </div>
                      <div className="profile-course-rating-row">
                        <span className="profile-course-rating">★ {course.rating}</span>
                        {course.tag && <span className="profile-course-free">Free Document</span>}
                      </div>
                      <p className="profile-course-desc">{course.description}</p>
                      <div className="profile-course-meta-row">
                        <span>{course.duration} / {course.lessons} lessons</span>
                      </div>
                      <div className="profile-course-actions-row">
                        <button className="profile-course-addcart">Add to cart</button>
                        <button className="profile-course-buynow">Buy now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="profile-courses-showall">Show all courses</button>
            </div>
          </section>
          <aside className="profile-sidebar-section">
            {!isOwnProfile && (
              <>
                <button className="profile-sidebar-follow">Follow</button>
                <button className="profile-sidebar-message">Message</button>
              </>
            )}
            {isOwnProfile && isTeacher && (
              <button className="profile-sidebar-edit" onClick={handleEditProfile}>Edit Profile</button>
            )}
            <div className="profile-sidebar-ratingcard">
              <div className="profile-sidebar-rating-main">{instructorData.rating}/5</div>
              <div className="profile-sidebar-stars">★★★★★</div>
              <div className="profile-sidebar-ratingcount">({instructorData.reviews} reviews)</div>
              <div className="profile-sidebar-ratingbars">
                {[5,4,3,2,1].map((star, i) => (
                  <div className="profile-sidebar-ratingbar-row" key={star}>
                    <span>{star}</span>
                    <div className="profile-sidebar-ratingbar"><div className="profile-sidebar-ratingbar-fill" style={{width: `${80-(i*20)}%`}}></div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-sidebar-responsetime">
              <div className="profile-sidebar-label">Response time</div>
              <div className="profile-sidebar-value">Very responsive to messages</div>
            </div>
            <div className="profile-sidebar-certificates">
              <div className="profile-sidebar-label">Certificates</div>
              <div className="profile-sidebar-value">
                {instructorData.certificates && instructorData.certificates.map((cert, index) => (
                  <div key={index}>{cert}</div>
                ))}
              </div>
            </div>
            <div className="profile-sidebar-profilelink">
              <div className="profile-sidebar-label">Profile Link</div>
              <input className="profile-sidebar-linkinput" value={instructorData.profileLink} readOnly />
              <button className="profile-sidebar-copybtn">Copy Link</button>
            </div>
            <div className="profile-sidebar-promo">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Promo" className="profile-sidebar-promo-img" />
              <div className="profile-sidebar-promo-content">
                <div className="profile-sidebar-promo-title">Photography</div>
                <div className="profile-sidebar-promo-desc">Ut sit aute non mollit consequat consequat conse</div>
                <button className="profile-sidebar-promo-btn">View more</button>
              </div>
              <span className="profile-sidebar-promo-badge">30% Off</span>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Course Creation Modal */}
      {showCreateCourseModal && (
        <CreateCourseModal 
          onClose={() => setShowCreateCourseModal(false)} 
          onSubmit={handleCreateCourse} 
        />
      )}
      
      {/* Video Upload Modal */}
      {showAddVideoModal && courseData && (
        <AddVideoModal 
          onClose={() => setShowAddVideoModal(false)} 
          onAddVideo={handleAddVideo} 
          onFinish={handleFinishCourse}
          courseId={courseData.id || 'temp-id'} 
          videos={videos}
        />
      )}
    </div>
  );
};

export default InstructorProfile;