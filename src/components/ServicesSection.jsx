import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, revealProps } from '../lib/animations';
import { services } from '../data/servicesData';

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealProps}>
          <p className="section-eyebrow">services</p>
          <h2 className="section-title">What I can Offer</h2>
          <p className="section-subtitle" style={{ maxWidth: 620 }}>
            Focused on shipping working software, not just prototypes.
          </p>
        </motion.div>

        <motion.div className="services-grid" variants={staggerContainer(0.08)} {...revealProps}>
          {services.map((s) => (
            <motion.div key={s.index} variants={staggerItem} className="service-card">
              <span className="service-index mono">{s.index}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
              <div className="service-tags">
                {s.tags.map((tag) => (
                  <span key={tag} className="skill-badge">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
