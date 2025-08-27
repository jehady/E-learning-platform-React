import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaWallet, FaCreditCard, FaHistory, FaPlus, 
  FaDownload, FaArrowUp, FaArrowDown 
} from 'react-icons/fa';
import './WalletPage.css';

const WalletPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddFunds, setShowAddFunds] = useState(false);

  const walletData = {
    balance: 250.75,
    currency: 'USD',
    transactions: [
      {
        id: 1,
        type: 'purchase',
        description: 'UI/UX Design Course',
        amount: -49.99,
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'refund',
        description: 'Course Refund - JavaScript Basics',
        amount: 29.99,
        date: '2024-01-10',
        status: 'completed'
      },
      {
        id: 3,
        type: 'deposit',
        description: 'Wallet Top-up',
        amount: 100.00,
        date: '2024-01-05',
        status: 'completed'
      }
    ]
  };

  const handleAddFunds = (amount) => {
    console.log('Adding funds:', amount);
    setShowAddFunds(false);
  };

  return (
    <div className="wallet-page">
      <div className="wallet-header">
        <h1 className="page-title">
          <FaWallet /> My Wallet
        </h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddFunds(true)}
        >
          <FaPlus /> Add Funds
        </button>
      </div>

      <div className="wallet-overview">
        <div className="balance-card">
          <div className="balance-header">
            <h2>Current Balance</h2>
            <div className="balance-actions">
              <button className="icon-btn">
                <FaDownload />
              </button>
            </div>
          </div>
          <div className="balance-amount">
            ${walletData.balance.toFixed(2)}
            <span className="currency">{walletData.currency}</span>
          </div>
          <div className="balance-change">
            <span className="change-positive">+$25.50 this month</span>
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon income">
              <FaArrowDown />
            </div>
            <div className="stat-info">
              <h3>Total Spent</h3>
              <p className="stat-value">$324.50</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon expense">
              <FaArrowUp />
            </div>
            <div className="stat-info">
              <h3>Refunds</h3>
              <p className="stat-value">$29.99</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wallet-content">
        <div className="wallet-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <FaHistory /> Transactions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payment-methods' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment-methods')}
          >
            <FaCreditCard /> Payment Methods
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'transactions' && (
            <div className="transactions-section">
              <div className="transactions-header">
                <h3>Recent Transactions</h3>
                <div className="transaction-filters">
                  <select className="filter-select">
                    <option value="all">All Types</option>
                    <option value="purchase">Purchases</option>
                    <option value="refund">Refunds</option>
                    <option value="deposit">Deposits</option>
                  </select>
                </div>
              </div>
              
              <div className="transactions-list">
                {walletData.transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-icon">
                      {transaction.type === 'purchase' && <FaArrowUp className="expense" />}
                      {transaction.type === 'refund' && <FaArrowDown className="income" />}
                      {transaction.type === 'deposit' && <FaArrowDown className="income" />}
                    </div>
                    <div className="transaction-details">
                      <h4>{transaction.description}</h4>
                      <p className="transaction-date">{transaction.date}</p>
                    </div>
                    <div className="transaction-amount">
                      <span className={transaction.amount > 0 ? 'positive' : 'negative'}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      <span className="transaction-status">{transaction.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payment-methods' && (
            <div className="payment-methods-section">
              <div className="payment-methods-header">
                <h3>Payment Methods</h3>
                <button className="btn btn-primary">
                  <FaPlus /> Add Payment Method
                </button>
              </div>
              
              <div className="payment-methods-list">
                <div className="payment-method-item">
                  <div className="payment-method-icon">
                    <FaCreditCard />
                  </div>
                  <div className="payment-method-details">
                    <h4>Visa ending in 4242</h4>
                    <p>Expires 12/25</p>
                  </div>
                  <div className="payment-method-actions">
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddFunds && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Funds</h2>
              <button className="modal-close" onClick={() => setShowAddFunds(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="amount-options">
                {[25, 50, 100, 200].map(amount => (
                  <button 
                    key={amount}
                    className="amount-btn"
                    onClick={() => handleAddFunds(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="custom-amount">
                <label>Custom Amount</label>
                <input type="number" placeholder="Enter amount" className="amount-input" />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddFunds(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;