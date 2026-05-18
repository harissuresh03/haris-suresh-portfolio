import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/harissuresh03" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/haris-suresh-3b1693360/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:harissuresh03@gmail.com">
            <FaEnvelope />
          </a>
        </div>
        <p>&copy; 2024 Haris Suresh. All rights reserved.</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>
          <FaPhone style={{ marginRight: '5px' }} /> +60 12-998 8727 | 
          <FaEnvelope style={{ marginLeft: '10px', marginRight: '5px' }} /> harissuresh03@gmail.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;