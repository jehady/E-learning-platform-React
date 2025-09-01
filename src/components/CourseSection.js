import React from 'react';
import CourseCard from './CourseCard';

const SkeletonCard = () => (
  <div className="course-card-modern skeleton">
    <div className="course-card-img-wrap skeleton-box" />
    <div className="course-card-info">
      <div className="skeleton-line" style={{ width: '40%' }} />
      <div className="skeleton-line" style={{ width: '80%' }} />
      <div className="skeleton-line" style={{ width: '60%' }} />
      <div className="skeleton-line" style={{ width: '30%' }} />
    </div>
  </div>
);

const CourseSection = ({ title, courses, viewAllLink, loading=false }) => {
  return (
    <section className="course-section-modern">
      <div className="course-section-header">
        <h2 className="course-section-title">{title}</h2>
        <a href={viewAllLink} className="course-section-view-all">
          View all
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#5D5FEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="course-cards-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
      </div>
    </section>
  );
};

export default CourseSection;