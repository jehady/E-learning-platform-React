import React from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const admins = [
  { name: 'Elizabeth Lee', email: 'AvatarSystems@gmail.com', phone: '+962913214324', date: '10/07/2023', status: 'New', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Carlos Garcia', email: 'SmoozeShift@gmail.com', phone: '+963214321412', date: '24/07/2023', status: 'New', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Elizabeth Bailey', email: 'Telecom@gmail.com', phone: '+923432432374', date: '08/08/2023', status: 'banned', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Ryan Brown', email: 'Omn@gmail.com', phone: '+32489324234', date: '31/08/2023', status: 'banned', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Ryan Young', email: 'DataStrea@gmail.com', phone: '+32423913443', date: '01/05/2023', status: 'Active', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { name: 'Hailey Adams', email: 'FlowRush@gmail.com', phone: '+32423173523', date: '10/06/2023', status: 'Active', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard-root">
      <aside className="admin-sidebar">
        <div className="admin-logo-row">
          <span className="admin-logo-svg"> {/* SVG logo here if needed */} </span>
          <span className="admin-logo-text">Logo</span>
        </div>
        <nav className="admin-sidebar-nav">
          <a className="admin-sidebar-link active">Dashboard</a>
          <a className="admin-sidebar-link">Admin</a>
          <a className="admin-sidebar-link">Analytics</a>
          <a className="admin-sidebar-link">Messages</a>
          <a className="admin-sidebar-link">Integrations</a>
        </nav>
      </aside>
      <main className="admin-dashboard-main">
        <div className="admin-dashboard-header-row">
          <h1 className="admin-dashboard-title">Admin</h1>
          <div className="admin-dashboard-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-dashboard-actions">
            <span className="admin-dashboard-icon">🔔</span>
            <span className="admin-dashboard-icon">?</span>
            <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="User" className="admin-dashboard-avatar" />
          </div>
        </div>
        <div className="admin-dashboard-cards-row">
          <div className="admin-dashboard-card add-admin" onClick={() => navigate('/add-admin')} style={{ cursor: 'pointer' }}>
            <div className="admin-dashboard-card-title">Add Admin</div>
            <div className="admin-dashboard-card-plus">+</div>
          </div>
          <div className="admin-dashboard-card subadmin" onClick={() => navigate('/distribute-admin')} style={{ cursor: 'pointer' }}>subAdmin distribution</div>
          <div className="admin-dashboard-card stats">All statistics</div>
          <div className="admin-dashboard-card chart">
            <div className="admin-dashboard-piechart">
              {/* Placeholder for pie chart */}
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle r="40" cx="50" cy="50" fill="#ecebfc" />
                <path d="M50,10 A40,40 0 1,1 90,50" fill="none" stroke="#5d5fef" strokeWidth="20" />
              </svg>
            </div>
            <div className="admin-dashboard-chart-legend">
              <div><span className="dot new"></span> new <span className="admin-dashboard-chart-num">700</span> <span className="admin-dashboard-chart-pct">70%</span></div>
              <div><span className="dot active"></span> Active <span className="admin-dashboard-chart-num">300</span> <span className="admin-dashboard-chart-pct">30%</span></div>
            </div>
          </div>
        </div>
        <div className="admin-dashboard-table-wrap">
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Admin Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>Register DATE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, idx) => (
                <tr key={admin.email}>
                  <td><input type="checkbox" /></td>
                  <td className="admin-dashboard-admincell">
                    <img src={admin.avatar} alt={admin.name} className="admin-dashboard-adminavatar" />
                    {admin.name}
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.date}</td>
                  <td>
                    <span className={`admin-dashboard-status admin-dashboard-status-${admin.status.toLowerCase()}`}>{admin.status}</span>
                  </td>
                  <td><span className="admin-dashboard-table-menu">⋮</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="admin-dashboard-table-footer">
            <span>63 results</span>
            <div className="admin-dashboard-pagination">
              <span className="active">1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>...</span>
              <span>10</span>
              <span>11</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 