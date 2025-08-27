import React from 'react';

/**
 * InstructorCard Component
 * Displays instructor information and actions
 * 
 * @param {Object} props - Component props
 * @param {string} props.avatar - Instructor avatar URL
 * @param {string} props.name - Instructor name
 * @param {string} props.role - Instructor role
 * @param {Function} props.onFollow - Follow button click handler
 * @returns {JSX.Element} Instructor card component
 */
const InstructorCard = ({ avatar, name, role, onFollow }) => {
  return (
    <div className="cd-instructor-card">
      <img src={avatar} alt={name} className="cd-instructor-avatar" />
      <div className="cd-instructor-info">
        <div className="cd-instructor-name">{name}</div>
        <div className="cd-instructor-role">{role}</div>
      </div>
      <button className="cd-instructor-follow" onClick={onFollow}>
        Follow
      </button>
    </div>
  );
};

export default InstructorCard;