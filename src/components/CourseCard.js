import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const location = useLocation();

  // Decide where to go based on current page
  const isMyCoursesPage = location.pathname.startsWith('/my-courses');
  const linkTo = isMyCoursesPage
    ? `/discussion/${course.id}`   // enrolled → CourseDiscussion
    : `/course/${course.id}`;      // general → CourseDetails

  return (
    <Link to={linkTo} className="course-card-modern">
      <div className="course-card-img-wrap">
        <img
          src={course.image}
          alt={course.title}
          className="course-card-img"
          loading="lazy"
        />
        {course.tag && (
          <span className={`course-card-tag tag-${course.tag.toLowerCase()}`}>
            {course.tag}
          </span>
        )}
      </div>
      <div className="course-card-info">
        <div className="course-card-category">{course.category}</div>
        <h3 className="course-card-title">{course.title}</h3>
        <div className="course-card-rating">
          <span className="course-card-stars">★</span>
          <span className="course-card-rating-value">{course.rating}</span>
          <span className="course-card-rating-count">({course.ratingCount})</span>
        </div>
        <div className="course-card-price">${course.price}</div>
      </div>
    </Link>
  );
};

export default CourseCard;
