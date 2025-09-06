import React, { useState, useEffect, useCallback } from 'react';
import { FaBan, FaSearch, FaFilter, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import BanUserModal from '../../components/BanUserModal';
import { apiService } from '../../utils/api';
import PromoCodeModal from '../../components/PromoCodeModal'
import { Navigate } from 'react-router-dom';
import AddSupervisorModal from '../../components/AddSupervisorModal';


const Supervisorpage = () => {
    
  const [searchTerm, setSearchTerm] = useState('');
  const [showBanned, setShowBanned] = useState(false);
  const [supervisor, setSupervisor] = useState([]);
  const [loading, setLoading] = useState(false);   // ✅ added
  const [error, setError] = useState(null);        // ✅ added

  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [promoModalOpen, setPromoModalOpen] = useState(false);
const [selectedSupervisor, setSelectedSupervisor] = useState(null);
const [addSupervisorModalOpen, setAddSupervisorModalOpen] = useState(false);

const handlePromoClick = (supervisor) => {
  setSelectedSupervisor(supervisor);
  setPromoModalOpen(true);
};


  
  const fetchSupervisor = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/api/show_all_supervisors");
      console.log("Supervisor API response:", res);

      const supervisorFromApi = Array.isArray(res) ? res : [];

      const mappedSupervisor = supervisorFromApi.map((t) => ({
        id: t.id,
        name: t.username,
        email: t.email,
        avatar: `https://ui-avatars.com/api/?name=${t.username}`,
        status: t.is_approved === 1 ? "Active" : "Banned",
        isBanned: t.is_approved === 0,
      }));

      setSupervisor(mappedSupervisor);
    } catch (err) {
      console.error("Error fetching supervisor:", err);
      setError("Failed to load supervisor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSupervisor();
  }, [fetchSupervisor]);

  const filteredSupervisor = supervisor.filter((supervisor) => {
    const matchesSearch =
      supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBannedFilter = showBanned ? supervisor.isBanned : !supervisor.isBanned;
    return matchesSearch && matchesBannedFilter;
  });

  const handleBanUser = (user) => {
    setSelectedUser(user);
    setBanModalOpen(true);
  };

  const handleBanSuccess = () => {
    fetchSupervisor(); 
  };

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', path: '/subadmin' },
    { icon: '👩‍🏫', label: 'Teachers', path: '/teachers', active: true },
    { icon: '🎓', label: 'Students', path: '/students' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '🔗', label: 'Integrations', path: '/integrations' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8f9fb',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: '#fff',
          borderRight: '1px solid #f0f1f3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              padding: '32px 0 24px 32px',
              fontWeight: 700,
              fontSize: 24,
              color: '#5d5fef',
              letterSpacing: 1,
            }}
          >
            Logo
          </div>
          <nav>
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 32px',
                  background: item.active ? '#f5f6ff' : 'none',
                  color: item.active ? '#5d5fef' : '#222',
                  borderRadius: 8,
                  margin: '0 16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 18, marginRight: 16 }}>{item.icon}</span>{' '}
                {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#b0b3c7',
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Made with <span style={{ color: '#5d5fef' }}>Yisily</span>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>
            Supervisor Management
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setShowBanned(!showBanned)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: showBanned ? '#ff4757' : '#f5f6ff',
                color: showBanned ? '#fff' : '#5d5fef',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <FaBan /> {showBanned ? 'Show Active' : 'Show Banned'}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <FaSearch
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#b0b3c7',
              }}
            />
            <input
              placeholder="Search supervisor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 16,
                outline: 'none',
              }}
            />
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#f5f6ff',
              color: '#5d5fef',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: '12px 16px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <FaFilter /> Filter
          </button>
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(93,95,239,0.04)',
            padding: 32,
          }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>
                  {showBanned ? 'Banned Supervisor' : 'Active Supervisor'} (
                  {filteredSupervisor.length})
                </div>
                <div>
                  <button
                    style={{
                      border: '1px solid #e5e7eb',
                      background: '#f5f6ff',
                      color: '#5d5fef',
                      borderRadius: 8,
                      padding: '8px 16px',
                      marginRight: 8,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Export
                  </button>
                  <button
                    onClick={() => setAddSupervisorModalOpen(true)}
                    style={{
                      border: '1px solid #e5e7eb',
                      background: '#5d5fef',
                      color: '#fff',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Add Supervisor
                  </button>
                </div>
              </div>

              <table
                style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}
              >
                <thead>
                  <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 600 }}>
                    <th style={{ padding: '12px 8px' }}></th>
                    <th style={{ padding: '12px 8px' }}>Supervisor NAME</th>
                    <th style={{ padding: '12px 8px' }}>EMAIL</th>
                    <th style={{ padding: '12px 8px' }}>STATUS</th>
                    <th style={{ padding: '12px 8px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSupervisor.map((supervisor, idx) => (
                    <tr
                      key={supervisor.id}
                      style={{ borderTop: idx === 0 ? 'none' : '1px solid #f0f1f3' }}
                    >
                      <td style={{ padding: '12px 8px' }}>
                        <input type="checkbox" />
                      </td>
                      <td
                        style={{
                          padding: '12px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <img
                          src={supervisor.avatar}
                          alt={supervisor.name}
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        <span style={{ fontWeight: 600 }}>{supervisor.name}</span>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#666' }}>
                        {supervisor.email}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span
                          style={{
                            background: supervisor.isBanned ? '#ffe6e6' : '#e6f9f0',
                            color: supervisor.isBanned ? '#ff4757' : '#34c759',
                            borderRadius: 8,
                            padding: '4px 14px',
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {supervisor.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#5d5fef',
                              cursor: 'pointer',
                              padding: '4px',
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
  onClick={() => handlePromoClick(supervisor)}
  style={{
    background: "none",
    border: "none",
    color: "#ffb020",
    cursor: "pointer",
    padding: "4px",
  }}
>
  <FaEdit />
</button>

                          <button
                            onClick={() => handleBanUser(supervisor)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ff4757',
                              cursor: 'pointer',
                              padding: '4px',
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 24,
                }}
              >
                <div style={{ color: '#b0b3c7', fontSize: 14 }}>
                  {filteredSupervisor.length} results
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, '...', 10, 11].map((n, i) => (
                    <button
                      key={i}
                      style={{
                        background: n === 1 ? '#5d5fef' : '#f5f6ff',
                        color: n === 1 ? '#fff' : '#5d5fef',
                        border: 'none',
                        borderRadius: 8,
                        width: 32,
                        height: 32,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Ban User Modal */}
      {banModalOpen && selectedUser && (
        <BanUserModal
          isOpen={banModalOpen}
          onClose={() => setBanModalOpen(false)}
          user={selectedUser}
          userType="Supervisor"
          onBanSuccess={handleBanSuccess}
        />
      )}
      {promoModalOpen && selectedSupervisor && (
  <PromoCodeModal
    isOpen={promoModalOpen}
    onClose={() => setPromoModalOpen(false)}
    supervisor={selectedSupervisor}
    onSuccess={() => {
      alert("Promo code created successfully!");
    }}
  />
)}

{addSupervisorModalOpen && (
   <AddSupervisorModal
     isOpen={addSupervisorModalOpen}
     onClose={() => setAddSupervisorModalOpen(false)}
     onSuccess={() => {
       alert("Supervisor account created!");
       fetchSupervisor(); // refresh list
     }}
   />
 )}

    </div>
  );
};

export default Supervisorpage;
