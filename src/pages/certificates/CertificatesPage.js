import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaCertificate, FaDownload, FaShare, FaEye, 
  FaCalendar, FaUser, FaAward 
} from 'react-icons/fa';
import './CertificatesPage.css';

const CertificatesPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      id: 1,
      courseName: 'Complete Web Development Bootcamp',
      instructor: 'John Doe',
      completionDate: '2024-01-15',
      grade: 'A+',
      score: 95,
      certificateUrl: '/certificates/cert-1.pdf',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      duration: '40 hours'
    },
    {
      id: 2,
      courseName: 'UI/UX Design Masterclass',
      instructor: 'Jane Smith',
      completionDate: '2023-12-20',
      grade: 'A',
      score: 88,
      certificateUrl: '/certificates/cert-2.pdf',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      duration: '25 hours'
    },
    {
      id: 3,
      courseName: 'Digital Marketing Strategy',
      instructor: 'Mike Johnson',
      completionDate: '2023-11-10',
      grade: 'B+',
      score: 82,
      certificateUrl: '/certificates/cert-3.pdf',
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      duration: '30 hours'
    }
  ];

  const handleDownload = (certificate) => {
    // Simulate download
    console.log('Downloading certificate:', certificate.id);
    // In real implementation, this would trigger a download
  };

  const handleShare = (certificate) => {
    // Simulate sharing
    console.log('Sharing certificate:', certificate.id);
    // In real implementation, this would open share options
  };

  const handleView = (certificate) => {
    setSelectedCertificate(certificate);
  };

  return (
    <div className="certificates-page">
      <div className="certificates-header">
        <h1 className="page-title">
          <FaCertificate /> My Certificates
        </h1>
        <div className="certificates-stats">
          <div className="stat-item">
            <span className="stat-value">{certificates.length}</span>
            <span className="stat-label">Total Certificates</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length)}%
            </span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </div>

      <div className="certificates-grid">
        {certificates.map(certificate => (
          <div key={certificate.id} className="certificate-card">
            <div className="certificate-header">
              <div className="certificate-icon">
                <FaAward />
              </div>
              <div className="certificate-grade">
                <span className="grade">{certificate.grade}</span>
                <span className="score">{certificate.score}%</span>
              </div>
            </div>
            
            <div className="certificate-content">
              <h3 className="certificate-course">{certificate.courseName}</h3>
              <div className="certificate-meta">
                <div className="meta-item">
                  <FaUser />
                  <span>{certificate.instructor}</span>
                </div>
                <div className="meta-item">
                  <FaCalendar />
                  <span>{certificate.completionDate}</span>
                </div>
                <div className="meta-item">
                  <FaClock />
                  <span>{certificate.duration}</span>
                </div>
              </div>
              
              <div className="certificate-skills">
                <h4>Skills Acquired:</h4>
                <div className="skills-tags">
                  {certificate.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="certificate-actions">
              <button 
                className="action-btn view-btn"
                onClick={() => handleView(certificate)}
              >
                <FaEye /> View
              </button>
              <button 
                className="action-btn download-btn"
                onClick={() => handleDownload(certificate)}
              >
                <FaDownload /> Download
              </button>
              <button 
                className="action-btn share-btn"
                onClick={() => handleShare(certificate)}
              >
                <FaShare /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="empty-state">
          <FaCertificate className="empty-icon" />
          <h2>No Certificates Yet</h2>
          <p>Complete courses to earn certificates and showcase your achievements.</p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      )}

      {selectedCertificate && (
        <div className="modal-overlay" onClick={() => setSelectedCertificate(null)}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Certificate Preview</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedCertificate(null)}
              >
                ×
              </button>
            </div>
            <div className="certificate-preview">
              <div className="certificate-template">
                <div className="cert-header">
                  <h1>Certificate of Completion</h1>
                  <div className="cert-logo">🎓</div>
                </div>
                <div className="cert-body">
                  <p className="cert-text">This is to certify that</p>
                  <h2 className="cert-name">{user?.name}</h2>
                  <p className="cert-text">has successfully completed</p>
                  <h3 className="cert-course">{selectedCertificate.courseName}</h3>
                  <div className="cert-details">
                    <div className="cert-detail">
                      <span>Instructor:</span>
                      <span>{selectedCertificate.instructor}</span>
                    </div>
                    <div className="cert-detail">
                      <span>Completion Date:</span>
                      <span>{selectedCertificate.completionDate}</span>
                    </div>
                    <div className="cert-detail">
                      <span>Final Grade:</span>
                      <span>{selectedCertificate.grade} ({selectedCertificate.score}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleDownload(selectedCertificate)}
              >
                <FaDownload /> Download PDF
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => handleShare(selectedCertificate)}
              >
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;