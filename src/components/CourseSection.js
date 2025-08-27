import React from 'react';
import CourseCard from './CourseCard';

const CourseSection = ({ title, courses, viewAllLink }) => {
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
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;