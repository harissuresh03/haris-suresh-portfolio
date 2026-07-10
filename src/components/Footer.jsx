import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/harissuresh03" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/haris-suresh-3b1693360/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:harissuresh03@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <p className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
          © 2026 Haris Suresh — built with React
        </p>
        <p className="mono" style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          harissuresh03@gmail.com · +60 12-998 8727
        </p>
      </div>
    </footer>
  );
};

export default Footer;