import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Support = () => {
  return (
    <div className="page">
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Support</h1>
        <p>Help and support resources will be available here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Support;