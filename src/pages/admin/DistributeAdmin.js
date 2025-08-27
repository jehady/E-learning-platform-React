import React from 'react';

const courses = [
  {
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    title: 'Create Emotional & Trendy Typography',
    category: 'Graphic Design',
  },
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Create Vector Illustrations for Beginner',
    category: 'Graphic Design',
  },
  {
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'How to Design a Creative Book Cover',
    category: 'Graphic Design',
  },
  {
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    title: 'Create Emotional & Trendy Typography',
    category: 'Graphic Design',
  },
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Create Vector Illustrations for Beginner',
    category: 'Graphic Design',
  },
  {
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'How to Design a Creative Book Cover',
    category: 'Graphic Design',
  },
];

const DistributeAdmin = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
    {/* Sidebar */}
    <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #f0f1f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ padding: '32px 0 24px 32px', fontWeight: 700, fontSize: 24, color: '#5d5fef', letterSpacing: 1 }}>Logo</div>
        <nav>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', color: '#5d5fef', fontWeight: 500 }}>Dashboard</div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', color: '#222', fontWeight: 500 }}>student</div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', color: '#222', fontWeight: 500 }}>Analytics</div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', color: '#222', fontWeight: 500 }}>Messages</div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', color: '#222', fontWeight: 500 }}>Integrations</div>
        </nav>
      </div>
      <div style={{ fontSize: 12, color: '#b0b3c7', textAlign: 'center', marginBottom: 12 }}>Made with <span style={{ color: '#5d5fef' }}>Yisily</span></div>
    </aside>
    {/* Main Content */}
    <main style={{ flex: 1, padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>Admin</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <input placeholder="Search..." style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, width: 220 }} />
          <span style={{ fontSize: 22, color: '#b0b3c7', cursor: 'pointer' }}>🔔</span>
          <span style={{ fontSize: 22, color: '#b0b3c7', cursor: 'pointer' }}>?</span>
          <img src="https://randomuser.me/api/portraits/men/99.jpg" alt="profile" style={{ width: 36, height: 36, borderRadius: '50%' }} />
        </div>
      </div>
      {/* Grid of Cards */}
      <div style={{ width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {courses.map((course, idx) => (
          <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(93,95,239,0.04)', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <img src={course.img} alt={course.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>{course.category}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18 }}>{course.title}</div>
              <button style={{ background: '#5d5fef', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%' }}>+ Add admin</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default DistributeAdmin; 