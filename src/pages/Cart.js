import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PuxZWRxQ4DKuc0tpTzSu1sax7XtUriD3bkQmZCJTkx1Md65ZFBoijdl3DnW9YoMX9WqOLkSQXTtjdKjQPFSDQiJ0084XDagDn');

const cartCourses = [
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

function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    alert('Payment submitted! (Stripe logic goes here)');
  };

  return (
    <form className="cart-stripe-form" onSubmit={handleSubmit}>
      <div className="cart-stripe-label">Card details</div>
      <div className="cart-stripe-cardbox">
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
      <button className="cart-proceed-btn" type="submit" disabled={!stripe}>Proceed to payment</button>
    </form>
  );
}

const Cart = () => {
  const isEmpty = cartCourses.length === 0;
  const subtotal = cartCourses.reduce((sum, c) => sum + c.price, 0);
  const discount = 15;
  const fee = 0;
  const total = subtotal - discount + fee;

  return (
    <div className="cart-page">
      <main className="cart-main">
        {isEmpty ? (
          <div className="cart-empty-state">
            <img src="https://assets10.lottiefiles.com/packages/lf20_jzv1zqtk.json" alt="Empty cart" className="cart-empty-illustration" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven’t added any courses yet. Start exploring and add your favorite courses to your cart!</p>
            <Link to="/" className="cart-empty-btn">Browse courses</Link>
          </div>
        ) : (
          <div className="cart-content">
            <section className="cart-summary">
              <h2>Order summary</h2>
              <div className="cart-courses-list">
                {cartCourses.map(course => (
                  <div className="cart-course-item" key={course.id}>
                    <img src={course.image} alt={course.title} className="cart-course-img" />
                    <div className="cart-course-info">
                      <div className="cart-course-title">{course.title}</div>
                      <div className="cart-course-instructor">{course.instructor}</div>
                    </div>
                    <div className="cart-course-price">${course.price}</div>
                    <button className="cart-remove-btn" title="Remove">🗑️</button>
                  </div>
                ))}
              </div>
            </section>
            <aside className="cart-payment-section">
              <h2>Payment method</h2>
              <div className="cart-payment-method">
                <span className="cart-payment-card">💳 Mastercard <span className="cart-card-number">**** 5967</span></span>
                <button className="cart-change-method">Change payment methods</button>
              </div>
              <div className="cart-voucher-row">
                <input type="text" placeholder="$15 OFF" className="cart-voucher-input" />
                <button className="cart-voucher-apply">Apply</button>
              </div>
              <div className="cart-voucher-badge">$15 OFF</div>
              <div className="cart-summary-box">
                <div className="cart-summary-row"><span>Subtotal</span><span>${subtotal}</span></div>
                <div className="cart-summary-row"><span>Discount</span><span>-${discount}</span></div>
                <div className="cart-summary-row"><span>Fee</span><span>${fee}</span></div>
                <div className="cart-summary-row cart-summary-total"><span>Total</span><span>${total}</span></div>
              </div>
              <Elements stripe={stripePromise}>
                <StripePaymentForm />
              </Elements>
            </aside>
          </div>
        )}
        <section className="cart-recommend">
          <div className="cart-recommend-header">
            <span>You might also like</span>
            <Link to="#" className="cart-recommend-viewall">View all</Link>
          </div>
          <div className="cart-recommend-list">
            {recommendations.map(rec => (
              <div className="cart-recommend-card" key={rec.id}>
                <img src={rec.image} alt={rec.title} className="cart-recommend-img" />
                <div className="cart-recommend-info">
                  <div className="cart-recommend-category">{rec.category}</div>
                  <div className="cart-recommend-title">{rec.title}</div>
                  <div className="cart-recommend-meta">
                    <span className="cart-recommend-rating">★ {rec.rating} <span className="cart-recommend-count">({rec.ratingCount})</span></span>
                    <span className="cart-recommend-price">${rec.price}</span>
                  </div>
                  {rec.tag && <span className="cart-recommend-tag">{rec.tag}</span>}
                  }
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart; 