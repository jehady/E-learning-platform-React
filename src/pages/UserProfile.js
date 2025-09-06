import React, { useEffect, useState } from 'react';
import './InstructorProfile.css';
import { apiService, API_BASE_URL } from '../utils/api';
import Header from '../components/Header';

// Helper to prepend base URL if poster/photo is relative
function withBase(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
}

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .get('/api/my_profile')
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>Failed to load profile.</div>;

  const { profile_details, courses, email, id, username } = userData;
  const firstName = profile_details?.first_name || '';
  const lastName = profile_details?.last_name || '';
  const displayName = (firstName || lastName) ? `${firstName} ${lastName}` : username;
  const profilePhoto = withBase(profile_details?.profile_photo) || 'https://via.placeholder.com/80';

  return (
    <div className="profile-page">
        <Header/>
      <main className="profile-main">
        <div className="profile-breadcrumb">Home / User Profile</div>

        <div className="profile-content-row">
          {/* LEFT MAIN SECTION */}
          <section className="profile-main-section">
            <div className="profile-info-card">
              <img
                src={profilePhoto}
                alt={displayName}
                className="profile-avatar"
              />
              <div className="profile-info-details">
                <div className="profile-info-header">
                  <h1 className="profile-name">{displayName}</h1>
                  <div className="profile-title">Regular User</div>
                </div>
                <div className="profile-location-row">
                  <span>{email}</span>
                  {profile_details?.phone_number && (
                    <> · <span>{profile_details.phone_number}</span></>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-overview-card">
              <h2>Overview</h2>
              <p>
                Welcome {displayName || 'User'}! Here you can track your enrolled
                courses and manage your details.
              </p>
            </div>

            <div className="profile-courses-section">
              <div className="profile-courses-header-row">
                <h2>My Courses</h2>
              </div>
              <div className="profile-courses-list">
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <div className="profile-course-card" key={course.id}>
                      <div className="profile-course-img-wrap">
                        <img
                          src={withBase(course.poster)}
                          alt={course.course_name}
                          className="profile-course-img"
                        />
                        {course.is_paid === 0 && (
                          <span className="profile-course-free">Free</span>
                        )}
                      </div>
                      <div className="profile-course-info">
                        <span className="profile-course-date">
                          {course.start_date} → {course.end_date}
                        </span>
                        <div className="profile-course-title-row">
                          <h3 className="profile-course-title">
                            {course.course_name}
                          </h3>
                          <span className="profile-course-price">
                            ${course.price}
                          </span>
                        </div>
                        <div className="profile-course-rating-row">
                          <span className="profile-course-rating">
                            ★ {course.rating}
                          </span>
                          <span>{course.status}</span>
                        </div>
                        <p className="profile-course-desc">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No courses enrolled yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="profile-sidebar-section">
           

            <div className="profile-sidebar-certificates">
              <div className="profile-sidebar-label">Account Type</div>
              <div className="profile-sidebar-value">User</div>
            </div>

           
          
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
