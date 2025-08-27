import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Modal.css';
import { FaToggleOn, FaToggleOff, FaChevronDown, FaImage, FaUpload } from 'react-icons/fa';

const CreateCourseModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    course_name: '',
    description: '',
    is_paid: false,
    price: '',
    start_date: '',
    end_date: '',
    requirements: [''],
    category_id: '',
    poster: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [posterPreview, setPosterPreview] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      
      // Create preview for poster image
      if (name === 'poster' && file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPosterPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleTogglePaid = () => {
    setFormData({
      ...formData,
      is_paid: !formData.is_paid,
      // Reset price if switching to free
      price: !formData.is_paid ? '' : formData.price
    });
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: updatedRequirements
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/getAllCategory');
        if (response.data && response.data.data) {
            console.log(response.data);
          setCategories(response.data.data);
        
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category_id: category.id
    });
    setShowCategoryDropdown(false);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      const updatedRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        requirements: updatedRequirements
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (formData.is_paid && (!formData.price || parseFloat(formData.price) <= 0)) {
        setError('Please enter a valid price for a paid course');
        setLoading(false);
        return;
      }

      // Validate category selection
      if (!formData.category_id) {
        setError('Please select a course category');
        setLoading(false);
        return;
      }

      // Filter out empty requirements
      const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
      if (filteredRequirements.length === 0) {
        setError('Please add at least one course requirement');
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'requirements') {
          // Add requirements as array
          filteredRequirements.forEach(req => formDataToSend.append('requirements[]', req));
        } else if (key === 'price') {
          // Add price only if course is paid
          if (formData.is_paid) {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, null);
          }
        } else if (key === 'poster') {
          // Only append poster if it exists
          if (formData.poster) {
            formDataToSend.append(key, formData[key]);
          }
        } else if (key === 'is_paid') {
          // Send is_paid as 1 for paid, 0 for free
          formDataToSend.append('is_paid', formData.is_paid ? 1 : 0);
        } else if (key !== 'category_id') {
          // Add all other fields except category_id (we'll add it separately)
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add token to the request data
      const token = localStorage.getItem('token');
      if (token) {
        formDataToSend.append('token', token);
      }
      
      // Ensure category_id is included in the request
      if (selectedCategory) {
        formDataToSend.append('category_id', selectedCategory.id);
      }
      
      console.log('Submitting course data');
      
      // In a production environment, this would be a real API call
      const response = await api.post('/api/createCourse', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const responseData = response.data.data;
      console.log(responseData);
      
      // For now, simulate the API response
      const simulatedResponse = {
        course_name: formData.course_name,
        description: formData.description,
        is_paid: formData.is_paid,
        price: formData.is_paid ? formData.price : null,
        start_date: formData.start_date,
        end_date: formData.end_date,
        requirements: filteredRequirements,
        category_id: selectedCategory ? selectedCategory.id : '',
        poster_url: posterPreview || '',
        id: 'course-' + Date.now(),
        created_at: new Date().toISOString()
      };
      
      onSubmit(simulatedResponse);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
      console.error('Error creating course:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Course</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="modal-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="course_name">Course Name</label>
            <input
              type="text"
              id="course_name"
              name="course_name"
              value={formData.course_name}
              onChange={handleChange}
              placeholder="Enter course name"
              required
              className="modern-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your course content and objectives"
              required
              rows="4"
              className="modern-textarea"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="poster">Course Poster Image</label>
            <div className="file-upload-container">
              {posterPreview ? (
                <div className="poster-preview-container">
                  <img src={posterPreview} alt="Course poster preview" className="poster-preview" />
                  <button 
                    type="button" 
                    className="change-poster-btn"
                    onClick={() => document.getElementById('poster').click()}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder" onClick={() => document.getElementById('poster').click()}>
                  <FaImage className="upload-icon" />
                  <span>Click to upload course poster</span>
                </div>
              )}
              <input
                type="file"
                id="poster"
                name="poster"
                onChange={handleChange}
                accept="image/*"
                className="file-input"
                style={{ display: 'none' }}
              />
            </div>
          </div>
          
          <div className="form-group toggle-group">
            <label>Course Type</label>
            <div className="toggle-container" onClick={handleTogglePaid}>
              <span className={!formData.is_paid ? 'active-option' : ''}>Free</span>
              {formData.is_paid ? 
                <FaToggleOn className="toggle-icon active" /> : 
                <FaToggleOff className="toggle-icon" />
              }
              <span className={formData.is_paid ? 'active-option' : ''}>Paid</span>
            </div>
          </div>
          
          <div className="form-group">
            <label>Course Category</label>
            <div className="category-dropdown">
              <button 
                type="button" 
                className="category-button" 
                onClick={toggleCategoryDropdown}
              >
                {selectedCategory ? selectedCategory.category_name : 'Select Category'}
                <FaChevronDown />
              </button>
              
              {showCategoryDropdown && (
                <div className="category-list">
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <div 
                        key={category.id} 
                        className="category-item" 
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category.category_name}
                      </div>
                    ))
                  ) : (
                    <div className="category-item">Loading categories...</div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {formData.is_paid && (
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter course price"
                min="0.01"
                step="0.01"
                required={formData.is_paid}
                className="modern-input"
              />
            </div>
          )}
          
          <div className="form-group date-group">
            <div className="date-field">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="modern-input"
              />
            </div>
            
            <div className="date-field">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="modern-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Course Requirements</label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="requirement-item">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  placeholder={`Requirement ${index + 1}`}
                  className="modern-input"
                />
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeRequirement(index)}
                  disabled={formData.requirements.length <= 1}
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className="modal-button modal-button-secondary"
              onClick={addRequirement}
            >
              + Add Requirement
            </button>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="modal-button modal-button-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-button modal-button-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;