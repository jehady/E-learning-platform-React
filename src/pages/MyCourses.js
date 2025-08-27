import React from 'react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'UI Design, A User Approach',
      instructor: 'Klara Weaver',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
    },
    {
      id: 2,
      title: 'Set Up a Design System',
      instructor: 'Klara Weaver',
      image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a',
    },
    {
      id: 3,
      title: 'Storytelling: Creative Food Art',
      instructor: 'Ansley',
      image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65',
    }
  ];

  const topCourses = [
    {
      id: 1,
      rank: 1,
      title: 'UI Design By',
      instructor: 'Klara Weaver'
    },
    {
      id: 2,
      rank: 2,
      title: 'Design System by',
      instructor: 'Klara Weaver'
    },
    {
      id: 3,
      rank: 3,
      title: 'Storytelling: by',
      instructor: 'Klara Weaver'
    }
  ];

  return (
    <div className="page">
      
      <div className="my-courses-container">
        <h1 className="page-title">MY COURSES</h1>
        
        <div className="courses-container">
          <div className="enrolled-courses">
            {courses.map(course => (
              <div key={course.id} className="enrolled-course-card">
                <img src={course.image} alt={course.title} className="course-image" />
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-instructor">{course.instructor}</p>
                  <div className="course-actions">
                    <Link to={`/course/${course.id}`} className="course-action-btn">Study</Link>
                    <Link to={`/course/${course.id}/discussion`} className="course-action-btn secondary">Discussion</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="top-courses-sidebar">
            <div className="top-courses-card">
              <div className="top-courses-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="#5D5FEF" strokeWidth="1.5"/>
                  <path d="M8 7H16" stroke="#5D5FEF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 12H16" stroke="#5D5FEF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 17H16" stroke="#5D5FEF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="top-courses-title">Top Courses</h3>
              
              <div className="top-courses-list">
                {topCourses.map(course => (
                  <div key={course.id} className="top-course-item">
                    <div className="course-rank">{course.rank}#</div>
                    <div className="course-info">
                      <div className="course-title">{course.title}</div>
                      <div className="course-instructor">{course.instructor}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/top-students" className="see-top-link">See Top Student</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;