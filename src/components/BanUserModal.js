import React, { useState } from 'react';
import { FaTimes, FaBan, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const BanUserModal = ({ isOpen, onClose, user, userType, onBanSuccess }) => {
  const [reason, setReason] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: '#ffe6e6',
              color: '#ff4757',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaBan />
            </div>
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#222',
                margin: '0 0 4px 0'
              }}>
                Ban {userType}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: '0'
              }}>
                Are you sure you want to ban this {userType.toLowerCase()}?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              color: '#b0b3c7',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* User Info */}
        <div style={{
          background: '#f8f9fb',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%'
            }}
          />
          <div>
            <div style={{
              fontWeight: '600',
              fontSize: '16px',
              color: '#222',
              marginBottom: '4px'
            }}>
              {user.name}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              {user.email}
            </div>
          </div>
        </div>

        {/* Form */}
        
          <form
  onSubmit={(e) => {
    e.preventDefault(); // prevent page reload
    if (!reason || !expiryDate) {
      setError("Please provide a reason and expiry date");
      return;
    }
    setError("");
    onBanSuccess(reason, expiryDate); // call parent handler
  }}
>

          {error && (
            <div style={{
              background: '#ffe6e6',
              color: '#ff4757',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              borderLeft: '4px solid #ff4757'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#4a5568',
              fontSize: '14px'
            }}>
              Reason for Ban *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for banning this user..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#4a5568',
              fontSize: '14px'
            }}>
              Ban Expiry Date *
            </label>
            <div style={{ position: 'relative' }}>
              <FaCalendarAlt style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#b0b3c7'
              }} />
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#f5f6ff',
                color: '#5d5fef',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#ffb3b3' : '#ff4757',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Banning...
                </>
              ) : (
                <>
                  <FaBan />
                  Ban {userType}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BanUserModal; 