import React, { useState } from 'react';
import api from '../utils/api';
import './Modal.css';
import { FaImage, FaUpload } from 'react-icons/fa';

const AddVideoModal = ({ onClose, onAddVideo, onFinish, courseId, videos }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: null,
    video: null,
    course_id: courseId
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posterPreview, setPosterPreview] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
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
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.video) {
      setError('Please select a video file');
      setLoading(false);
      return;
    }

    try {
      // In a production environment, this would be a real API call
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add token to FormData
      const token = localStorage.getItem('token');
      if (token) {
        formDataToSend.append('token', token);
      }
      
      // Use our API utility with multipart/form-data content type
      const response = await api.post('/api/addVideo', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const videoData = response.data.data;
      
      // For now, simulate the API response
      const simulatedResponse = {
        ...formData,
        id: 'video-' + Date.now(),
        poster_url: posterPreview || 'https://via.placeholder.com/150',
        video_url: 'https://example.com/video.mp4',
        created_at: new Date().toISOString()
      };
      
      onAddVideo(simulatedResponse);
      
      // Reset form for next video
      setFormData({
        title: '',
        description: '',
        poster: null,
        video: null,
        course_id: courseId
      });
      setPosterPreview('');
      
      // Reset file inputs
      document.getElementById('poster').value = '';
      document.getElementById('video').value = '';
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload video');
      console.error('Error uploading video:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content video-modal">
        <div className="modal-header">
          <h2>Add Video to Course</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        
        {error && <div className="modal-error">{error}</div>}
        
        <div className="video-list-section">
          <h3 className="section-title">Videos Added ({videos.length})</h3>
          {videos.length > 0 ? (
            <ul className="video-list">
              {videos.map((video, index) => (
                <li key={video.id || index} className="video-item">
                  <div className="video-item-thumbnail">
                    {video.poster_url ? (
                      <img src={video.poster_url} alt={video.title} />
                    ) : (
                      <div className="video-placeholder">
                        <FaImage />
                      </div>
                    )}
                  </div>
                  <div className="video-item-info">
                    <h4>{video.title}</h4>
                    <p>{video.description.substring(0, 50)}{video.description.length > 50 ? '...' : ''}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-videos">
              <FaImage className="empty-icon" />
              <p>No videos added yet. Add your first video below.</p>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Video Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="modern-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the video content"
              className="modern-textarea"
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="poster">Poster Image:</label>
            <div className="file-upload-container">
              {posterPreview ? (
                <div className="poster-preview-container">
                  <img src={posterPreview} alt="Video poster preview" className="poster-preview" />
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
                  <span>Click to upload poster image</span>
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
          
          <div className="form-group">
            <label htmlFor="video">Video File:</label>
            <div className="file-upload-container">
              <div className="upload-placeholder" onClick={() => document.getElementById('video').click()}>
                <FaUpload className="upload-icon" />
                <span>Click to upload video file</span>
                {formData.video && <div className="selected-file">Selected: {formData.video.name}</div>}
              </div>
              <input
                type="file"
                id="video"
                name="video"
                onChange={handleChange}
                accept="video/*"
                required
                className="file-input"
                style={{ display: 'none' }}
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="modal-button modal-button-secondary" onClick={onFinish} disabled={loading || videos.length === 0}>
              Finish Course
            </button>
            <button type="submit" className="modal-button modal-button-primary" disabled={loading}>
              {loading ? 'Uploading...' : 'Add Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoModal;