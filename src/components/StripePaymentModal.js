import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51PuxZWRxQ4DKuc0tpTzSu1sax7XtUriD3bkQmZCJTkx1Md65ZFBoijdl3DnW9YoMX9WqOLkSQXTtjdKjQPFSDQiJ0084XDagDn');

/**
 * StripePaymentForm Component
 * Handles the Stripe payment form
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Close modal handler
 * @param {number} props.price - Payment amount
 * @returns {JSX.Element} Stripe payment form
 */
const StripePaymentForm = ({ onClose, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    // In a real implementation, you would process the payment here
    // For now, we'll just show an alert and close the modal
    alert('Payment submitted! (Stripe logic goes here)');
    onClose();
  };

  return (
    <div className="cd-stripe-modal">
      <button className="cd-stripe-modal-close" onClick={onClose}>×</button>
      <h3>Pay ${price}</h3>
      <form className="cd-stripe-form" onSubmit={handleSubmit}>
        <div className="cd-stripe-label">Card details</div>
        <div className="cd-stripe-cardbox">
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
        <button className="cd-stripe-pay-btn" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

/**
 * StripePaymentModal Component
 * Displays the Stripe payment modal
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.onClose - Close modal handler
 * @param {number} props.price - Payment amount
 * @returns {JSX.Element|null} Stripe payment modal or null
 */
const StripePaymentModal = ({ open, onClose, price }) => {
  if (!open) return null;

  return (
    <div className="cd-stripe-modal-overlay">
      <Elements stripe={stripePromise}>
        <StripePaymentForm onClose={onClose} price={price} />
      </Elements>
    </div>
  );
};

export default StripePaymentModal;