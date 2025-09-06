import React from 'react';
import Newsletter from './Newsletter';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <div className="footer-logo">
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="24" rx="2" fill="#5D5FEF" />
                <rect x="10" width="8" height="24" rx="2" fill="#F8C51B" />
                <rect x="20" width="8" height="24" rx="2" fill="#F97316" />
                <rect x="30" width="8" height="24" rx="2" fill="#16A34A" />
              </svg>
              <span className="footer-logo-text">Logo</span>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Product</h3>
            <a href="#" className="footer-link">Features</a>
            <a href="#" className="footer-link">Pricing</a>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Resources</h3>
            <Link to="/blog" className="footer-link">Blog</Link>
            <Link to="/FAQPage" className="footer-link">FAQ</Link>
            <Link to="/webinars" className="footer-link">Webinars</Link>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Company</h3>
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Join us</a>
          </div>
          
          <Newsletter />
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="language-selector">
              <span>English</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="footer-copyright">
            © 2023 Brand, Inc. Privacy · Terms · Sitemap
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3334 5.00004C17.7501 5.25004 17.0834 5.41671 16.4167 5.50004C17.0834 5.08337 17.5834 4.41671 17.8334 3.66671C17.1667 4.08337 16.4167 4.33337 15.6667 4.50004C15.0001 3.83337 14.0834 3.41671 13.0834 3.41671C11.1667 3.41671 9.66675 4.91671 9.66675 6.75004C9.66675 7.00004 9.66675 7.25004 9.75008 7.50004C6.91675 7.33337 4.33341 6.00004 2.58341 4.00004C2.33341 4.50004 2.16675 5.08337 2.16675 5.66671C2.16675 6.75004 2.75008 7.75004 3.58341 8.33337C3.08341 8.33337 2.58341 8.16671 2.16675 8.00004C2.16675 8.00004 2.16675 8.00004 2.16675 8.08337C2.16675 9.75004 3.33341 11.0834 4.83341 11.3334C4.58341 11.4167 4.33341 11.4167 4.08341 11.4167C3.91675 11.4167 3.75008 11.4167 3.58341 11.3334C3.91675 12.6667 5.16675 13.6667 6.58341 13.6667C5.41675 14.5834 3.91675 15.0834 2.33341 15.0834C2.08341 15.0834 1.91675 15.0834 1.66675 15.0834C3.08341 16.0834 4.75008 16.5834 6.50008 16.5834C13.0834 16.5834 16.6667 11.4167 16.6667 6.91671C16.6667 6.75004 16.6667 6.66671 16.6667 6.50004C17.3334 6.08337 17.8334 5.50004 18.3334 5.00004Z" fill="#666666"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66675 8.33337V11.6667H9.16675V17.5H12.5001V11.6667H15.0001L15.8334 8.33337H12.5001V6.66671C12.5001 6.16671 12.5001 5.83337 13.3334 5.83337H15.8334V2.50004C15.4167 2.41671 14.2501 2.33337 13.3334 2.33337C11.0834 2.33337 9.16675 3.90004 9.16675 6.66671V8.33337H6.66675Z" fill="#666666"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1667 2.5H5.83341C4.00008 2.5 2.50008 4 2.50008 5.83333V14.1667C2.50008 16 4.00008 17.5 5.83341 17.5H14.1667C16.0001 17.5 17.5001 16 17.5001 14.1667V5.83333C17.5001 4 16.0001 2.5 14.1667 2.5ZM10.0001 13.3333C8.25008 13.3333 6.66675 11.75 6.66675 10C6.66675 8.25 8.25008 6.66667 10.0001 6.66667C11.7501 6.66667 13.3334 8.25 13.3334 10C13.3334 11.75 11.7501 13.3333 10.0001 13.3333ZM14.1667 6.66667C13.5834 6.66667 13.3334 6.41667 13.3334 5.83333C13.3334 5.25 13.5834 5 14.1667 5C14.7501 5 15.0001 5.25 15.0001 5.83333C15.0001 6.41667 14.7501 6.66667 14.1667 6.66667Z" fill="#666666"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5001 4.16671C16.8334 4.58337 16.1667 4.83337 15.4167 5.00004C14.8334 4.33337 13.9167 4.00004 13.0001 4.00004C11.0834 4.00004 9.58341 5.50004 9.58341 7.33337C9.58341 7.58337 9.58341 7.83337 9.66675 8.08337C6.75008 7.91671 4.16675 6.58337 2.50008 4.58337C2.25008 5.08337 2.08341 5.58337 2.08341 6.16671C2.08341 7.25004 2.66675 8.25004 3.50008 8.83337C3.00008 8.83337 2.50008 8.66671 2.08341 8.50004V8.58337C2.08341 10.25 3.25008 11.5834 4.83341 11.8334C4.58341 11.9167 4.25008 11.9167 4.00008 11.9167C3.83341 11.9167 3.66675 11.9167 3.50008 11.8334C3.83341 13.1667 5.08341 14.1667 6.58341 14.1667C5.41675 15.0834 3.91675 15.5834 2.33341 15.5834C2.08341 15.5834 1.83341 15.5834 1.66675 15.5C3.16675 16.5 5.00008 17 6.83341 17C13.0001 17 16.5001 11.9167 16.5001 7.41671V7.00004C17.1667 6.58337 17.6667 6.00004 18.0834 5.33337C17.5001 5.58337 16.9167 5.75004 16.3334 5.83337C17.0001 5.41671 17.4167 4.83337 17.5001 4.16671Z" fill="#666666"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.0834 4.50008 17.5001 8.33341 18.1667V12.5001H6.66675V10.0001H8.33341V7.91675C8.33341 6.33341 9.66675 5.00008 11.2501 5.00008H13.3334V7.50008H11.6667C11.2501 7.50008 10.8334 7.91675 10.8334 8.33342V10.0001H13.3334V12.5001H10.8334V18.3334C15.0001 17.9167 18.3334 14.3334 18.3334 10.0001Z" fill="#666666"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;