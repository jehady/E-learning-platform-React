import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import CourseCard from '../../components/CourseCard';
import { FaFilter, FaSearch, FaSort } from 'react-icons/fa';
import './CourseBrowser.css';

const CourseBrowser = () => {
  const { hasAnyRole } = useAuth();
  const { t } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    level: '',
    rating: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with API calls
  const mockCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      category: 'Programming',
      level: 'Beginner',
      price: 99,
      rating: 4.8,
      ratingCount: 1234,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      instructor: 'John Doe',
      duration: '40 hours',
      tag: 'Bestseller'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      level: 'Intermediate',
      price: 79,
      rating: 4.9,
      ratingCount: 856,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
      instructor: 'Jane Smith',
      duration: '25 hours',
      tag: 'Hot'
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      category: 'Marketing',
      level: 'Advanced',
      price: 129,
      rating: 4.7,
      ratingCount: 642,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      instructor: 'Mike Johnson',
      duration: '30 hours'
    }
  ];

  const mockCategories = [
    { id: 1, name: 'Programming', count: 45 },
    { id: 2, name: 'Design', count: 32 },
    { id: 3, name: 'Marketing', count: 28 },
    { id: 4, name: 'Business', count: 19 },
    { id: 5, name: 'Photography', count: 15 }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredCourses = courses.filter(course => {
    return (
      (!filters.category || course.category === filters.category) &&
      (!filters.level || course.level === filters.level) &&
      (!filters.search || course.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="course-browser">
      <div className="course-browser-header">
        <h1 className="page-title">Browse Courses</h1>
        <div className="course-browser-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search courses..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="course-browser-content">
        <aside className="course-filters">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                />
                <span>All Categories</span>
              </label>
              {categories.map(category => (
                <label key={category.id} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={category.name}
                    checked={filters.category === category.name}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  />
                  <span>{category.name} ({category.count})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Level</h3>
            <div className="filter-options">
              {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <label key={level} className="filter-option">
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    checked={filters.level === level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="filter-options">
              {['Free', '$0-$50', '$50-$100', '$100+'].map(range => (
                <label key={range} className="filter-option">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range}
                    checked={filters.priceRange === range}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  />
                  <span>{range}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="course-results">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading courses...</p>
            </div>
          ) : (
            <>
              <div className="results-header">
                <p>{filteredCourses.length} courses found</p>
              </div>
              <div className="courses-grid">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseBrowser;