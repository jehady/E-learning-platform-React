import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';

const orderCourses = [
  { id: 1, title: 'UI Design, A User Approach', instructor: 'Klara Weaver', price: 49, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, title: 'Set Up a Design System', instructor: 'Klara Weaver', price: 79, image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167' },
  { id: 3, title: 'Storytelling: Creative Food Art', instructor: 'Ansley', price: 35, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c' },
];

const recommendations = [
  { id: 4, title: 'Principles of Great UI Design System', category: 'UI/UX Design', rating: 4.5, ratingCount: 123, price: 39, image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e' },
  { id: 5, title: 'Prototype for Your First Mobile Application', category: 'UI/UX Design', rating: 4.8, ratingCount: 1223, price: 49, image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167', tag: 'Best seller' },
  { id: 6, title: 'Skills in Branding and Fashion Marketing', category: 'Marketing', rating: 4.5, ratingCount: 123, price: 39, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9' },
  { id: 7, title: 'Create Emotional & Trendy Typography', category: 'Graphic Design', rating: 4.8, ratingCount: 3933, price: 37, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
];

function StripePaymentForm({ total }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    // Simulate backend call for PaymentIntent (to be replaced with real backend call)
    alert('Payment submitted! (Stripe logic goes here)');
  };

  return (
    <form className="checkout-stripe-form" onSubmit={handleSubmit}>
      <div className="checkout-stripe-label">Card details</div>
      <div className="checkout-stripe-cardbox">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#222',
              '::placeholder': { color: '#888' },
              fontFamily: 'inherit',
              backgroundColor: '#ecebfc',
              padding: '12px 10px',
            },
            invalid: { color: '#e74c3c' },
          },
        }} />
      </div>
      <button className="checkout-proceed-btn" type="submit" disabled={!stripe}>Proceed to payment</button>
    </form>
  );
}

const Checkout = () => {
  const [voucher, setVoucher] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const subtotal = orderCourses.reduce((sum, c) => sum + c.price, 0);
  const discount = voucherApplied ? 15 : 0;
  const fee = 0;
  const total = subtotal - discount + fee;

  return (
    <div className="checkout-page">
      <main className="checkout-main">
        <div className="checkout-content-row">
          <section className="checkout-order-summary">
            <h2>Order summary</h2>
            <div className="checkout-courses-list">
              {orderCourses.map(course => (
                <div className="checkout-course-item" key={course.id}>
                  <img src={course.image} alt={course.title} className="checkout-course-img" />
                  <div className="checkout-course-info">
                    <div className="checkout-course-title">{course.title}</div>
                    <div className="checkout-course-instructor">{course.instructor}</div>
                  </div>
                  <div className="checkout-course-price">${course.price}</div>
                  <button className="checkout-remove-btn" title="Remove">🗑️</button>
                </div>
              ))}
            </div>
          </section>
          <aside className="checkout-payment-section">
            <h2>Payment method</h2>
            <div className="checkout-payment-method">
              <span className="checkout-payment-card">💳 Mastercard <span className="checkout-card-number">**** 5967</span></span>
              <button className="checkout-change-method">Change payment methods</button>
            </div>
            <div className="checkout-voucher-row">
              <input type="text" placeholder="$15 OFF" className="checkout-voucher-input" value={voucher} onChange={e => setVoucher(e.target.value)} />
              <button className="checkout-voucher-apply" onClick={() => setVoucherApplied(true)} disabled={voucherApplied || voucher !== '15 OFF'}>Apply</button>
            </div>
            {voucherApplied && <div className="checkout-voucher-badge">$15 OFF</div>}
            <div className="checkout-summary-box">
              <div className="checkout-summary-row"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="checkout-summary-row"><span>Discount</span><span>-${discount}</span></div>
              <div className="checkout-summary-row"><span>Fee</span><span>${fee}</span></div>
              <div className="checkout-summary-row checkout-summary-total"><span>Total</span><span>${total}</span></div>
            </div>
            <Elements stripe={loadStripe('pk_test_51PuxZWRxQ4DKuc0tpTzSu1sax7XtUriD3bkQmZCJTkx1Md65ZFBoijdl3DnW9YoMX9WqOLkSQXTtjdKjQPFSDQiJ0084XDagDn')}>
              <StripePaymentForm total={total} />
            </Elements>
          </aside>
        </div>
        <section className="checkout-recommend">
          <div className="checkout-recommend-header">
            <span>You might also like</span>
            <Link to="#" className="checkout-recommend-viewall">View all</Link>
          </div>
          <div className="checkout-recommend-list">
            {recommendations.map(rec => (
              <div className="checkout-recommend-card" key={rec.id}>
                <img src={rec.image} alt={rec.title} className="checkout-recommend-img" />
                <div className="checkout-recommend-info">
                  <div className="checkout-recommend-category">{rec.category}</div>
                  <div className="checkout-recommend-title">{rec.title}</div>
                  <div className="checkout-recommend-meta">
                    <span className="checkout-recommend-rating">★ {rec.rating} <span className="checkout-recommend-count">({rec.ratingCount})</span></span>
                    <span className="checkout-recommend-price">${rec.price}</span>
                  </div>
                  {rec.tag && <span className="checkout-recommend-tag">{rec.tag}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Checkout; 