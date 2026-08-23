import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import { EASE } from '../lib/animations';
import { CursorTarget } from './CustomCursor';

const LINKEDIN_URL = 'https://www.linkedin.com/in/haris-suresh-3b1693360/';
const RESUME_URL = '/Haris_Suresh_Resume.pdf';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-inner">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Static glossy display word — no hover interaction by design */}
          <motion.p variants={item} className="hero-greeting" aria-hidden="false">
            hello
          </motion.p>

          <motion.h1 variants={item} className="hero-name">
            <CursorTarget as="span" label="Hi" className="hero-name-target">
              I&rsquo;m Haris Suresh
            </CursorTarget>
          </motion.h1>

          <motion.p variants={item} className="hero-role">
            Software Developer
          </motion.p>

          <motion.div variants={item} className="hero-availability">
            <span className="hero-availability-dot" />
            Available for Internship
          </motion.div>

          <motion.div variants={item} className="hero-cta-row">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <FaLinkedin size={16} /> Connect with me
            </a>
            <a
              href={RESUME_URL}
              download="Haris_Suresh_Resume.pdf"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <FaFileDownload size={14} /> View Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        className="hero-scroll-cue"
        aria-label="Scroll to about section"
        onClick={() => document.getElementById('services-ticker')?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaArrowDown />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;