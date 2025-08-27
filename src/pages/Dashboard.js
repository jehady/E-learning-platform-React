import React from 'react';
import './Dashboard.css';

const orders = [
  { name: 'Elizabeth Lee', course: 'AvatarSystems', value: '$359', date: '10/07/2023', status: 'New', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Carlos Garcia', course: 'SmoozeShift', value: '$747', date: '24/07/2023', status: 'New', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Elizabeth Bailey', course: 'Prime Time Telecom', value: '$564', date: '08/08/2023', status: 'In-progress', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Ryan Brown', course: 'OmniTech Corporation', value: '$541', date: '31/08/2023', status: 'In-progress', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Ryan Young', course: 'DataStream Inc.', value: '$769', date: '01/05/2023', status: 'Completed', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { name: 'Hailey Adams', course: 'FlowRush', value: '$922', date: '10/06/2023', status: 'Completed', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
];

const Dashboard = () => (
  <div className="dashboard-root">
    <aside className="dashboard-sidebar">
      <div className="dashboard-logo-row">
        <span className="dashboard-logo-svg"> {/* SVG logo here if needed */} </span>
        <span className="dashboard-logo-text">Logo</span>
      </div>
      <nav className="dashboard-sidebar-nav">
        <a className="dashboard-sidebar-link active">Dashboard</a>
        <a className="dashboard-sidebar-link">Teachers</a>
        <a className="dashboard-sidebar-link">Student</a>
        <a className="dashboard-sidebar-link">send notifications</a>
        <a className="dashboard-sidebar-link">Integrations</a>
      </nav>
      <div className="dashboard-sidebar-promo">
        <div className="dashboard-promo-illustration"> {/* Illustration placeholder */} </div>
        <div className="dashboard-promo-text">V2.0 is available</div>
        <button className="dashboard-promo-btn">Try now</button>
      </div>
      <footer className="dashboard-sidebar-footer">
        Made with <a href="https://yasily.com" target="_blank" rel="noopener noreferrer">Yasily</a>
      </footer>
    </aside>
    <main className="dashboard-main">
      <div className="dashboard-header-row">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="dashboard-actions">
          <span className="dashboard-icon">🔔</span>
          <span className="dashboard-icon">?</span>
          <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="User" className="dashboard-avatar" />
        </div>
      </div>
      <div className="dashboard-cards-row">
        <div className="dashboard-card dashboard-card-transactions">
          <div className="dashboard-card-label">over all transaction</div>
          <div className="dashboard-card-value">$92,405</div>
          <div className="dashboard-card-change up">▲ 5.39% period of change</div>
        </div>
        <div className="dashboard-card dashboard-card-profit">
          <div className="dashboard-card-label">Profit</div>
          <div className="dashboard-card-value">$32,218</div>
          <div className="dashboard-card-change up">▲ 5.39% period of change</div>
        </div>
        <div className="dashboard-card dashboard-card-courses">
          <div className="dashboard-card-label">Courses you supervised</div>
          <div className="dashboard-card-value">298</div>
          <div className="dashboard-card-change up">▲ 6.84% period of change</div>
        </div>
      </div>
      <div className="dashboard-table-section">
        <div className="dashboard-table-header-row">
          <h2 className="dashboard-table-title">Recent orders</h2>
          <div className="dashboard-table-actions">
            <button className="dashboard-table-btn">Import</button>
            <button className="dashboard-table-btn">Export</button>
          </div>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Teacher NAME</th>
              <th>Course name</th>
              <th>ORDER VALUE</th>
              <th>ORDER DATE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.name + order.course}>
                <td><input type="checkbox" /></td>
                <td className="dashboard-table-teachercell">
                  <img src={order.avatar} alt={order.name} className="dashboard-table-avatar" />
                  {order.name}
                </td>
                <td>{order.course}</td>
                <td>{order.value}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`dashboard-status dashboard-status-${order.status.toLowerCase().replace(/ /g, '-')}`}>{order.status}</span>
                </td>
                <td><span className="dashboard-table-menu">✏️</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dashboard-table-footer">
          <span>63 results</span>
          <div className="dashboard-pagination">
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

export default Dashboard; 