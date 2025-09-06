// PendingCoursesPage.js — normalized like MyCourses

import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { apiService, API_BASE_URL } from '../../utils/api';

const sidebarItems = [
  { icon: '📊', label: 'Dashboard', path: '/subadmin' },
  { icon: '👩‍🏫', label: 'Teachers', path: '/teachers' },
  { icon: '🎓', label: 'Students', path: '/students' },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '🔗', label: 'Pending Courses', path: '/PendingCoursesPage' },
];

// Helper to prepend base URL for relative media paths
const withBase = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url}`;
};

const PendingCoursesPage = () => {
  // ✅ store a compact, normalized array (same approach as MyCourses)
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');

      const payload = await apiService.get('/api/pending-courses');
      console.log(payload);

      // ✅ unwrap defensively (mirrors MyCourses)
      const rawCourses = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data?.data)
            ? payload.data.data
            : [];

      // ✅ normalize to compact shape
      const compact = rawCourses.map((c) => ({
        id: Number(c?.id),
        title: c?.course_name ?? 'Untitled',
        price: c?.is_paid ? Number(c?.price ?? 0) : 0,
        teacher:
          c?.teacher_name?.teacher_name ||
          c?.teacher_name ||
          c?.instructor_name ||
          (c?.user_id != null ? `Instructor #${c.user_id}` : 'Instructor'),
        rating:
          typeof c?.rating === 'number'
            ? c.rating
            : Number.isFinite(Number(c?.rating))
              ? Number(c?.rating)
              : 0,
        status: c?.status ?? 'pending_approval',
        poster: c?.poster || '',
      }));

      const sortedById = compact
        .filter((c) => Number.isFinite(c.id))
        .sort((a, b) => a.id - b.id);

      setAll(sortedById);

      if (sortedById.length === 0) setError('No pending courses found.');
    } catch (err) {
      setError(err?.message || 'Failed to fetch pending courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (courseId, newStatus) => {
    if (newStatus === 'pending_approval') return; // no-op
    try {
      await apiService.post(`/api/approve-course/${courseId}`, { status: 'approved' });
      await fetchCourses(); // reload to reflect change
    } catch (err) {
      console.error('Failed to update course status:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ compute UI fields at render (don’t store UI shape)
  const uiRows = useMemo(
    () =>
      all.map((c) => ({
        ...c,
        posterUrl: withBase(c.poster),
        priceLabel: c.price > 0 ? `$${c.price.toLocaleString()}` : 'Free',
        ratingLabel: (c.rating ?? 0).toFixed(1),
      })),
    [all]
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #f0f1f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ padding: '32px 0 24px 32px', fontWeight: 700, fontSize: 24, color: '#5d5fef', letterSpacing: 1 }}>Logo</div>
          <nav>
            {sidebarItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 32px',
                  background: isActive ? '#f5f6ff' : 'none',
                  color: isActive ? '#5d5fef' : '#222',
                  borderRadius: 8,
                  margin: '0 16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                })}
              >
                <span style={{ fontSize: 18, marginRight: 16 }}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div style={{ fontSize: 12, color: '#b0b3c7', textAlign: 'center', marginBottom: 12 }}>
          Made with <span style={{ color: '#5d5fef' }}>Yisily</span>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>Pending Courses</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(93,95,239,0.04)', padding: 24 }}>
          {loading ? (
            <div>Loading pending courses...</div>
          ) : error ? (
            <div style={{ color: '#e11d48' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ color: '#6b7280', textAlign: 'left', fontWeight: 600 }}>
                  <th style={{ padding: '12px 8px' }}>Poster</th>
                  <th style={{ padding: '12px 8px' }}>Course Name</th>
                  <th style={{ padding: '12px 8px' }}>Teacher</th>
                  <th style={{ padding: '12px 8px' }}>Price</th>
                  <th style={{ padding: '12px 8px' }}>Rating</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                  <th style={{ padding: '12px 8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {uiRows.map((c, idx) => (
                  <tr key={c.id} style={{ borderTop: idx === 0 ? 'none' : '1px solid #f0f1f3' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <img
                        src={c.posterUrl}
                        alt={c.title}
                        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px', fontWeight: 600 }}>{c.title}</td>
                    <td style={{ padding: '12px 8px' }}>{c.teacher}</td>
                    <td style={{ padding: '12px 8px' }}>{c.priceLabel}</td>
                    <td style={{ padding: '12px 8px' }}>{c.ratingLabel}</td>
                    <td style={{ padding: '12px 8px', color: c.status === 'pending_approval' ? '#ffb020' : '#10b981', fontWeight: 600 }}>
                      {c.status}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <select
                        defaultValue={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb' }}
                      >
                        <option value="pending_approval">Keep Pending</option>
                        <option value="approved">Publish</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default PendingCoursesPage;
