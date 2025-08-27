import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Promotions = () => {
  return (
    <div className="page">
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Promotions</h1>
        <p>Special offers and discounts will be displayed here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Promotions;