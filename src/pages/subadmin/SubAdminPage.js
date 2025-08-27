import React from 'react';

const sidebarItems = [
  { icon: '📊', label: 'Dashboard', path: '/subadmin', active: true },
  { icon: '👩‍🏫', label: 'Teachers', path: '/teachers' },
  { icon: '🎓', label: 'Students', path: '/students' },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '🔗', label: 'Integrations', path: '/integrations' },
];

const overviewCards = [
  {
    title: 'over all transaction',
    value: '$92,405',
    change: '+5.39%',
    icon: '🛒',
    bg: '#f5f6ff',
    color: '#5d5fef',
  },
  {
    title: 'Profit',
    value: '$32,218',
    change: '+5.39%',
    icon: '💵',
    bg: '#fff6f3',
    color: '#ff8a65',
  },
  {
    title: 'Courses you supervised',
    value: '298',
    change: '+6.84%',
    icon: '📚',
    bg: '#f5faff',
    color: '#5d5fef',
  },
];

const orders = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Elizabeth Lee',
    course: 'AvatarSystems',
    value: '$359',
    date: '10/07/2023',
    status: 'New',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    name: 'Carlos Garcia',
    course: 'SmoozeShift',
    value: '$747',
    date: '24/07/2023',
    status: 'New',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Elizabeth Bailey',
    course: 'Prime Time Telecom',
    value: '$564',
    date: '08/08/2023',
    status: 'In-progress',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Ryan Brown',
    course: 'OmniTech Corporation',
    value: '$541',
    date: '31/08/2023',
    status: 'In-progress',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Ryan Young',
    course: 'DataStream Inc.',
    value: '$769',
    date: '01/05/2023',
    status: 'Completed',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    name: 'Hailey Adams',
    course: 'FlowRush',
    value: '$922',
    date: '10/06/2023',
    status: 'Completed',
  },
];

const statusColors = {
  'New': { bg: '#eaf1ff', color: '#5d5fef' },
  'In-progress': { bg: '#fff6e5', color: '#ffb020' },
  'Completed': { bg: '#e6f9f0', color: '#34c759' },
};

const SubAdminPage = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
    {/* Sidebar */}
    <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #f0f1f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ padding: '32px 0 24px 32px', fontWeight: 700, fontSize: 24, color: '#5d5fef', letterSpacing: 1 }}>Logo</div>
        <nav>
          {sidebarItems.map((item, i) => (
            <div key={item.label} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px 32px', 
              background: item.active ? '#f5f6ff' : 'none', 
              color: item.active ? '#5d5fef' : '#222', 
              borderRadius: 8, 
              margin: '0 16px', 
              fontWeight: 500, 
              cursor: 'pointer' 
            }}>
              <span style={{ fontSize: 18, marginRight: 16 }}>{item.icon}</span> {item.label}
            </div>
          ))}
        </nav>
      </div>
      {/* Banner */}
      <div style={{ background: '#fff6f3', margin: 16, borderRadius: 12, padding: 20, textAlign: 'center' }}>
        <div style={{ marginBottom: 12 }}>
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none"><rect width="60" height="40" rx="8" fill="#f5f6ff"/></svg>
        </div>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>V2.0 is available</div>
        <button style={{ background: '#fff', border: '1px solid #5d5fef', color: '#5d5fef', borderRadius: 8, padding: '6px 18px', fontWeight: 500, cursor: 'pointer' }}>Try now</button>
      </div>
      <div style={{ fontSize: 12, color: '#b0b3c7', textAlign: 'center', marginBottom: 12 }}>Made with <span style={{ color: '#5d5fef' }}>Yisily</span></div>
    </aside>

    {/* Main Content */}
    <main style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>Dashboard</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <input placeholder="Search..." style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, width: 220 }} />
          <span style={{ fontSize: 22, color: '#b0b3c7', cursor: 'pointer' }}>🔔</span>
          <span style={{ fontSize: 22, color: '#b0b3c7', cursor: 'pointer' }}>?</span>
          <img src="https://randomuser.me/api/portraits/men/99.jpg" alt="profile" style={{ width: 36, height: 36, borderRadius: '50%' }} />
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 40 }}>
        {overviewCards.map(card => (
          <div key={card.title} style={{ flex: 1, background: card.bg, borderRadius: 16, padding: '32px 28px', boxShadow: '0 2px 8px rgba(93,95,239,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, color: '#222', fontSize: 16 }}>{card.title}</div>
              <span style={{ fontSize: 22, color: card.color }}>{card.icon}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#222' }}>{card.value}</div>
            <div style={{ color: '#34c759', fontSize: 14, marginTop: 6 }}>{card.change} period of change</div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(93,95,239,0.04)', padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>Recent orders</div>
          <div>
            <button style={{ border: '1px solid #e5e7eb', background: '#f5f6ff', color: '#5d5fef', borderRadius: 8, padding: '6px 18px', marginRight: 8, fontWeight: 500, cursor: 'pointer' }}>Import</button>
            <button style={{ border: '1px solid #e5e7eb', background: '#f5f6ff', color: '#5d5fef', borderRadius: 8, padding: '6px 18px', fontWeight: 500, cursor: 'pointer' }}>Export</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
          <thead>
            <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 600 }}>
              <th style={{ padding: '12px 8px' }}></th>
              <th style={{ padding: '12px 8px' }}>Teacher NAME</th>
              <th style={{ padding: '12px 8px' }}>Course name</th>
              <th style={{ padding: '12px 8px' }}>ORDER VALUE</th>
              <th style={{ padding: '12px 8px' }}>ORDER DATE</th>
              <th style={{ padding: '12px 8px' }}>STATUS</th>
              <th style={{ padding: '12px 8px' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.name} style={{ borderTop: idx === 0 ? 'none' : '1px solid #f0f1f3' }}>
                <td style={{ padding: '12px 8px' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={order.avatar} alt={order.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{order.name}</span>
                </td>
                <td style={{ padding: '12px 8px' }}>{order.course}</td>
                <td style={{ padding: '12px 8px' }}>{order.value}</td>
                <td style={{ padding: '12px 8px' }}>{order.date}</td>
                <td style={{ padding: '12px 8px' }}>
                  <span style={{ background: statusColors[order.status].bg, color: statusColors[order.status].color, borderRadius: 8, padding: '4px 14px', fontWeight: 500, fontSize: 14 }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '12px 8px' }}><span style={{ color: '#b0b3c7', fontSize: 18, cursor: 'pointer' }}>✏️</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
          <div style={{ color: '#b0b3c7', fontSize: 14 }}>63 results</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,2,3,4,'...',10,11].map((n, i) => (
              <button key={i} style={{ background: n===1 ? '#5d5fef' : '#f5f6ff', color: n===1 ? '#fff' : '#5d5fef', border: 'none', borderRadius: 8, width: 32, height: 32, fontWeight: 600, cursor: 'pointer' }}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default SubAdminPage; 