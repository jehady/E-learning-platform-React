import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './InstructorProfile.css';
import CreateCourseModal from '../components/CreateCourseModal';
import AddVideoModal from '../components/AddVideoModal';
import { apiService, API_BASE_URL } from '../utils/api';

function withBase(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
}

// Small helper to normalize apiService responses that wrap data under `data`
const unwrap = (res) => (res && Object.prototype.hasOwnProperty.call(res, 'data') ? res.data : res);

const InstructorProfile = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams();
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [instructorData, setInstructorData] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [deleteInput, setDeleteInput] = useState("");
const [deleteContext, setDeleteContext] = useState(null); 





  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
  const isTeacher = userRoles.includes('teacher');
  const isOwnProfile =
    userData.id && (instructorId ? userData.id.toString() === instructorId : true);

  // Fetch profile + promo codes (unwrap both)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [profileRes, promoRes] = await Promise.all([
          apiService.get('/api/my_profile'),
          apiService.get('/api/my_promo_codes'),
        ]);

        if (!mounted) return;

        const profile = unwrap(profileRes); // { id, username, ... }
        setInstructorData(profile || null);

        const codesMaybeWrapped = unwrap(promoRes); // should be an array
        const codesArray = Array.isArray(codesMaybeWrapped) ? codesMaybeWrapped : unwrap({ data: codesMaybeWrapped?.data || [] });
        setPromoCodes(Array.isArray(codesArray) ? codesArray : []);
      } catch (err) {
        console.error('Error fetching instructor profile or promo codes:', err);
        setInstructorData(null);
        setPromoCodes([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [instructorId]);

  const handleCreateCourse = (courseFormData) => {
    setCourseData(courseFormData);
    setShowCreateCourseModal(false);
    setShowAddVideoModal(true);
  };

  const handleAddVideo = (videoData) => {
    setVideos((prev) => [...prev, videoData]);
  };

  const handleFinishCourse = () => {
    setShowAddVideoModal(false);
    alert('Course created successfully with ' + videos.length + ' videos!');
    setCourseData(null);
    setVideos([]);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert('Promo code copied: ' + code);
  };

  if (loading) return <div>Loading...</div>;
  if (!instructorData) return <div>Failed to load instructor profile.</div>;

  const {
    id: userId,
    username,
    email,
    total_students,
    student_who_rates,
    total_rate,
    profile_details,
    courses = [],
    academic_certificates = [],
  } = instructorData || {};

  const firstName = profile_details?.first_name || '';
  const lastName = profile_details?.last_name || '';
  const displayName = (firstName || lastName) ? `${firstName} ${lastName}` : username;
  const profilePhoto =
    withBase(profile_details?.profile_photo) || 'https://via.placeholder.com/80';

  return (
    <div className="profile-page">
      <main className="profile-main">
        <div className="profile-breadcrumb">Home / Instructor Profile</div>

        <div className="profile-content-row">
          {/* LEFT MAIN SECTION */}
          <section className="profile-main-section">
            <div className="profile-info-card">
              <img src={profilePhoto} alt={displayName} className="profile-avatar" />
              <div className="profile-info-details">
                <div className="profile-info-header">
                  <h1 className="profile-name">{displayName}</h1>
                  <div className="profile-title">Instructor</div>
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
                {displayName} is an instructor on our platform. They currently have
                {` ${total_students || 0}`} students and a total rating of{' '}
                {total_rate || 0}.
              </p>
              <div className="profile-stats-row">
                <div className="profile-stat">
                  <span className="profile-stat-label">Rating</span>
                  <span className="profile-stat-value">⭐ {total_rate || 0}</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-label">Reviews</span>
                  <span className="profile-stat-value">
                    {student_who_rates || 0}
                  </span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-label">Students</span>
                  <span className="profile-stat-value">
                    {total_students || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-courses-section">
              <div className="profile-courses-header-row">
                <h2>Courses</h2>
              </div>
              <div className="profile-courses-list">
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <div
  className="profile-course-card"
  key={course.id}
  onClick={() => navigate(`/discussion/${course.id}`)}
  style={{ cursor: "pointer" }} // makes it clear it's clickable
>
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
      <h3 className="profile-course-title">{course.course_name}</h3>
      <span className="profile-course-price">
        {course.is_paid ? `$${course.price}` : "Free"}
      </span>
    </div>
    <div className="profile-course-rating-row">
      <span className="profile-course-rating">★ {course.rating}</span>
      <span>{course.status}</span>
      <span> · {course.students_count ?? 0} students</span>
    </div>
    <p className="profile-course-desc">{course.description}</p>

    {/* Edit Button — stopPropagation so card click doesn’t trigger */}
    {isOwnProfile && (
      <button
        className="profile-course-edit-btn"
        onClick={(e) => {
          e.stopPropagation(); // 🚀 Prevents card click
          setEditCourse(course);
        }}
      >
        Edit
      </button>
    )}
  </div>
</div>


                  ))
                ) : (
                  <p>No courses created yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="profile-sidebar-section">

            {isOwnProfile && (
              <>
                <button
                  className="profile-sidebar-edit"
                  onClick={() => navigate('/EditProfilePage')}
                >
                  Edit Profile
                </button>
                <button
                  className="profile-sidebar-edit"
                  onClick={() => navigate('/CreateCourse')}
                >
                  Create Course
                </button>
              </>
            )}

            <div className="profile-sidebar-ratingcard">
              <div className="profile-sidebar-rating-main">⭐ {total_rate || 0}</div>
              <div className="profile-sidebar-ratingcount">
                {student_who_rates || 0} Reviews
              </div>
            </div>

            <div className="profile-sidebar-certificates">
              <div className="profile-sidebar-label">Certificates</div>
              <div className="profile-sidebar-value">
                {academic_certificates && academic_certificates.length > 0 ? (
                  <ul>
                    {academic_certificates.map((cert) => (
                      <li key={cert.id}>{cert.description}</li>
                    ))}
                  </ul>
                ) : (
                  'No certificates uploaded'
                )}
              </div>
            </div>

            {/* Promo Codes */}
            <div className="profile-sidebar-profilelink">
              <div className="profile-sidebar-label">Promo Codes</div>
              {promoCodes.length > 0 ? (
                promoCodes.map((code) => (
                  <div key={code.id} className="profile-sidebar-promocode">
                    <div className="promocode-row">
                      <input
                        className="profile-sidebar-linkinput"
                        value={code.promo_code}
                        readOnly
                      />
                      <button
                        className="profile-sidebar-copybtn"
                        onClick={() => handleCopy(code.promo_code)}
                      >
                        Copy
                      </button>
                    </div>
                    <div className="promocode-details">
                      <span>Discount: {code.discount_percentage}%</span>
                      <span>Usage limit: {code.usage_limit || 'Unlimited'}</span>
                      <span>Expires: {code.expires_in ?? 'No expiry'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No promo codes found.</p>
              )}
            </div>
          </aside>
        </div>
      </main>
     {editCourse && (
  <div className="edit-widget-overlay">
    <div className="edit-widget">
      <h2>What do you want to edit?</h2>

      <div className="edit-widget-actions">
        <button
          className="edit-btn update"
          onClick={() => navigate(`/EditCoursePage/${editCourse.id}`)}
        >
          Edit Course Details
        </button>
        <button
          className="edit-btn update"
          onClick={() => navigate(`/Edit-Exam/${editCourse.id}`)}
        >
          Edit Exam 
        </button>
        <button
          className="edit-btn update"
          onClick={() => navigate(`/add-videos/${editCourse.id}`)}
        >
          Add Video
        </button>
        <button
          className="edit-btn update"
          onClick={() => navigate(`/add-exam/${editCourse.id}`)}
        >
          Add Exam
        </button>
        <button
  className="edit-btn delete"
  onClick={() => {
    setDeleteContext({ type: "course", id: editCourse.id });
    setDeleteInput("");
  }}
>
  Delete Exam
</button>
       <button
  className="edit-btn delete"
  onClick={() => {
    setDeleteContext({ type: "course", id: editCourse.id });
    setDeleteInput("");
  }}
>
  Delete Course
</button>


       <button
  className="edit-btn delete"
  onClick={() => {
    setDeleteContext({ type: "requirement", id: editCourse.id });
    setDeleteInput("");
  }}
>
  Delete Course Requirement
</button>


      </div>

      <button className="edit-btn cancel" onClick={() => setEditCourse(null)}>
        Cancel
      </button>
    </div>
  </div>
)}
{deleteContext && (
  <div className="edit-widget-overlay">
    <div className="edit-widget">
      <h2>Are you sure you want to delete?</h2>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        Type <strong>Delete</strong> below to confirm.
      </p>

      <input
        type="text"
        value={deleteInput}
        onChange={(e) => setDeleteInput(e.target.value)}
        placeholder="Type Delete"
        className="delete-confirm-input"
      />

      <div className="edit-widget-actions" style={{ marginTop: "20px" }}>
        <button
          className="edit-btn cancel"
          onClick={() => setDeleteContext(null)}
        >
          Cancel
        </button>
        <button
          className="edit-btn delete"
          disabled={deleteInput !== "Delete"}
          onClick={async () => {
            try {
              if (deleteContext.type === "course") {
                await apiService.post(`/api/deleteCourses/${deleteContext.id}`);
              } else if (deleteContext.type === "requirement") {
                await apiService.post(`/api/delete_requirement/${deleteContext.id}`);
              }

              alert("Deleted successfully!");
              setDeleteContext(null);
              setEditCourse(null);

              // reload to reflect changes
              window.location.reload();
            } catch (err) {
              alert(err.message || "Failed to delete.");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
{deleteContext && (
  <div className="edit-widget-overlay">
    <div className="edit-widget">
      <h2>Are you sure you want to delete?</h2>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        Type <strong>Delete</strong> below to confirm.
      </p>

      <input
        type="text"
        value={deleteInput}
        onChange={(e) => setDeleteInput(e.target.value)}
        placeholder="Type Delete"
        className="delete-confirm-input"
      />

      <div className="edit-widget-actions" style={{ marginTop: "20px" }}>
        <button
          className="edit-btn cancel"
          onClick={() => setDeleteContext(null)}
        >
          Cancel
        </button>
        <button
          className="edit-btn delete"
          disabled={deleteInput !== "Delete"}
          onClick={async () => {
            try {
              if (deleteContext.type === "course") {
                await apiService.delete(`/api/deleteCourses/${deleteContext.id}`);
              } else if (deleteContext.type === "requirement") {
                await apiService.delete(`/api/delete_requirement/${deleteContext.id}`);
              }

              alert("Deleted successfully!");
              setDeleteContext(null);
              setEditCourse(null);

              // reload to reflect changes
              window.location.reload();
            } catch (err) {
              alert(err.message || "Failed to delete.");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}




      {showCreateCourseModal && (
        <CreateCourseModal
          onClose={() => setShowCreateCourseModal(false)}
          onSubmit={handleCreateCourse}
        />
      )}

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
