import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaBook, FaUsers, FaDollarSign, FaEye,
  FaPlus, FaChartLine, FaStar, FaComments, FaEdit
} from 'react-icons/fa';
import './TrainerDashboard.css';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const dashboardStats = {
    totalCourses: 12,
    totalStudents: 1247,
    totalRevenue: 15420,
    averageRating: 4.8,
    pendingApprovals: 3,
    newMessages: 8
  };

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      students: 156,
      revenue: 2340,
      rating: 4.9,
      status: 'published',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      students: 89,
      revenue: 1780,
      rating: 4.7,
      status: 'pending',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'JavaScript for Beginners',
      students: 234,
      revenue: 3510,
      rating: 4.8,
      status: 'published',
      lastUpdated: '2024-01-10'
    }
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      course: 'Advanced React Development',
      progress: 75,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      course: 'JavaScript for Beginners',
      progress: 45,
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Carol Davis',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      course: 'UI/UX Design Fundamentals',
      progress: 90,
      lastActive: '3 hours ago'
    }
  ];

  return (
    <div className="trainer-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Trainer Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, {user?.name}!</p>
        </div>
        <div className="header-actions">
          <Link to="/trainer/create-course" className="btn btn-primary">
            <FaPlus /> Create New Course
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon courses">
            <FaBook />
          </div>
          <div className="stat-content">
            <h3>Total Courses</h3>
            <p className="stat-value">{dashboardStats.totalCourses}</p>
            <span className="stat-change positive">+2 this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon students">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-value">{dashboardStats.totalStudents.toLocaleString()}</p>
            <span className="stat-change positive">+156 this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">${dashboardStats.totalRevenue.toLocaleString()}</p>
            <span className="stat-change positive">+12% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rating">
            <FaStar />
          </div>
          <div className="stat-content">
            <h3>Average Rating</h3>
            <p className="stat-value">{dashboardStats.averageRating}/5</p>
            <span className="stat-change positive">+0.2 this month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="section-card">
            <div className="section-header">
              <h2>Recent Courses</h2>
              <Link to="/trainer/courses" className="view-all-link">
                View All <FaEye />
              </Link>
            </div>
            
            <div className="courses-list">
              {recentCourses.map(course => (
                <div key={course.id} className="course-item">
                  <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-meta">
                      <span className="course-students">
                        <FaUsers /> {course.students} students
                      </span>
                      <span className="course-revenue">
                        <FaDollarSign /> ${course.revenue}
                      </span>
                      <span className="course-rating">
                        <FaStar /> {course.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="course-status">
                    <span className={`status-badge ${course.status}`}>
                      {course.status}
                    </span>
                    <span className="last-updated">
                      Updated {course.lastUpdated}
                    </span>
                  </div>
                  
                  <div className="course-actions">
                    <Link to={`/trainer/courses/${course.id}`} className="action-btn">
                      <FaEye />
                    </Link>
                    <Link to={`/trainer/courses/${course.id}/edit`} className="action-btn">
                      <FaEdit />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h2>Performance Analytics</h2>
              <select className="time-filter">
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="analytics-chart">
              <div className="chart-placeholder">
                <FaChartLine className="chart-icon" />
                <p>Revenue & Enrollment Trends</p>
                <div className="chart-bars">
                  {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                    <div 
                      key={index}
                      className="chart-bar"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="section-card">
            <div className="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <Link to="/trainer/create-course" className="quick-action-btn">
                <FaPlus /> Create Course
              </Link>
              <Link to="/trainer/messages" className="quick-action-btn">
                <FaComments /> Messages ({dashboardStats.newMessages})
              </Link>
              <Link to="/trainer/insights" className="quick-action-btn">
                <FaChartLine /> View Insights
              </Link>
            </div>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3>Recent Students</h3>
            </div>
            <div className="students-list">
              {recentStudents.map(student => (
                <div key={student.id} className="student-item">
                  <img src={student.avatar} alt={student.name} className="student-avatar" />
                  <div className="student-info">
                    <h4 className="student-name">{student.name}</h4>
                    <p className="student-course">{student.course}</p>
                    <div className="student-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{student.progress}%</span>
                    </div>
                    <span className="student-activity">{student.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3>Pending Approvals</h3>
            </div>
            <div className="pending-items">
              <div className="pending-item">
                <div className="pending-icon">
                  <FaBook />
                </div>
                <div className="pending-info">
                  <p>Course: "Python Basics"</p>
                  <span>Waiting for approval</span>
                </div>
              </div>
              <div className="pending-item">
                <div className="pending-icon">
                  <FaUsers />
                </div>
                <div className="pending-info">
                  <p>New student enrollments</p>
                  <span>5 pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;