import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import BackToTop from './BackToTop';

const socialIconVariants = {
  rest: { y: 0, scale: 1, rotate: 0 },
  hover: { y: -4, scale: 1.12, rotate: -6, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <motion.a
            href="https://github.com/harissuresh03"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            variants={socialIconVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.92 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/haris-suresh-3b1693360/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            variants={socialIconVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.92 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:harissuresh03@gmail.com"
            aria-label="Email"
            variants={socialIconVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.92 }}
          >
            <FaEnvelope />
          </motion.a>
        </div>
        <p className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
          © 2026 Haris Suresh — built with React
        </p>
        <p className="mono" style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          harissuresh03@gmail.com · +60 12-998 8727
        </p>
      </div>

      <BackToTop />
    </footer>
  );
};

export default Footer;
