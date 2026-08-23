import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealProps } from '../lib/animations';
import { education } from '../data/educationData';
import Timeline from './Timeline';

const AcademicsSection = () => {
  const items = education.map((e) => ({
    title: e.school,
    subtitle: e.credential,
    period: e.period,
    detail: e.detail,
  }));

  return (
    <section id="academics" className="academics-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealProps}>
          <p className="section-eyebrow">academics</p>
          <h2 className="section-title">Education</h2>
        </motion.div>

        <Timeline items={items} />
      </div>
    </section>
  );
};

export default AcademicsSection;
