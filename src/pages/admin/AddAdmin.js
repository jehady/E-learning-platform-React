import React, { useState } from 'react';

const specializations = ['Math', 'Science', 'English', 'History'];
const privileges = ['Super Admin', 'Editor', 'Viewer'];
const ages = Array.from({ length: 50 }, (_, i) => 20 + i);

const AddAdmin = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    specialization: '',
    age: '',
    privilege: '',
    about: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
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
        <div style={{ width: '100%', maxWidth: 900, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>Admin</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <input placeholder="Search..." style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, width: 220 }} />
            <span style={{ fontSize: 22, color: '#b0b3c7', cursor: 'pointer' }}>🔔</span>
            <span style={{ fontSize: 22, color: '#b0b3c7', cursor: 'pointer' }}>?</span>
            <img src="https://randomuser.me/api/portraits/men/99.jpg" alt="profile" style={{ width: 36, height: 36, borderRadius: '50%' }} />
          </div>
        </div>
        {/* Form Card */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(93,95,239,0.04)', padding: 40, width: '100%', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Create Admin account</div>
          <div style={{ color: '#6b7280', fontSize: 16, marginBottom: 32 }}>please fill the field under</div>
          <form>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, fontSize: 15 }}>First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Input text" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, fontSize: 15 }}>Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Input text" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, fontSize: 15 }}>Email</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Input text" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, fontSize: 15 }}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Input text" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }} />
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, fontSize: 15 }}>Specialization</label>
                <select name="specialization" value={form.specialization} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }}>
                  <option value="">Input text</option>
                  {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, fontSize: 15 }}>Age</label>
                <select name="age" value={form.age} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }}>
                  <option value="">Input text</option>
                  {ages.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, fontSize: 15 }}>privileg</label>
                <select name="privilege" value={form.privilege} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15 }}>
                  <option value="">Input text</option>
                  {privileges.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, fontSize: 15 }}>More about him</label>
              <textarea name="about" value={form.about} onChange={handleChange} placeholder="Input text" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginTop: 6, fontSize: 15, minHeight: 70, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <button type="button" style={{ background: '#5d5fef', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Add CV</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
              <button type="button" style={{ background: '#fff', color: '#5d5fef', border: 'none', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ background: '#5d5fef', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Create</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAdmin; 