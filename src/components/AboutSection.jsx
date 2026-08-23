import React from 'react';
import { motion } from 'framer-motion';
import { fadeLeft, fadeRight, revealProps } from '../lib/animations';
import ScrollRevealText from './ScrollRevealText';
import profilePhoto from '../assets/images/profile.jpg';

const ABOUT_TEXT =
  "I'm a Computer Science undergraduate with a 3.94 CGPA, building full-stack " +
  'products end to end — from a hybrid-architecture mental health platform for ' +
  'students to a CNN-based tool that screens retinal scans for disease. I work ' +
  'comfortably across React, Node.js, Firebase and SQL, and I care as much about ' +
  'shipping something that actually works under real data as I do about the code ' +
  "behind it. Outside of building, I've led media and publicity teams across two " +
  'student organizations, which taught me how to communicate technical work to ' +
  'people who did not build it.';

const STATS = [
  { value: '3.94', suffix: '', label: 'CGPA' },
  { value: '5', suffix: '+', label: 'Projects' },
];

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.p variants={fadeLeft} className="section-eyebrow" {...revealProps}>
          about
        </motion.p>

        <div className="about-grid">
          <motion.div variants={fadeLeft} {...revealProps} className="about-photo-col">
            <div className="about-photo-frame">
              <img src={profilePhoto} alt="Haris Suresh" className="about-photo" />
            </div>
          </motion.div>

          <motion.div variants={fadeRight} {...revealProps} className="about-text-col">
            <ScrollRevealText text={ABOUT_TEXT} className="about-text" />

            <motion.div
              className="about-stats"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  className="about-stat"
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                >
                  <span className="about-stat-value">
                    {s.value}
                    {s.suffix && <span className="about-stat-suffix">{s.suffix}</span>}
                  </span>
                  <span className="about-stat-label mono">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
