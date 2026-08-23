import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealProps } from '../lib/animations';
import { experience } from '../data/experienceData';
import Timeline from './Timeline';

const ExperienceSection = () => {
  const items = experience.map((e) => ({
    title: e.role,
    subtitle: `${e.org} · ${e.type}`,
    period: e.period,
    points: e.points,
  }));

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealProps}>
          <p className="section-eyebrow">experience</p>
          <h2 className="section-title">Where I&rsquo;ve worked &amp; led</h2>
        </motion.div>

        <Timeline items={items} />
      </div>
    </section>
  );
};

export default ExperienceSection;
