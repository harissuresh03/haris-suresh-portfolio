import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import { fadeUp, staggerContainer, staggerItem, revealProps } from '../lib/animations';
import { certifications } from '../data/certificationsData';
import { CursorTarget } from './CustomCursor';
import badgeImage from '../assets/images/badge.jpg';

const CertificationsSection = () => {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealProps}>
          <p className="section-eyebrow">certifications</p>
          <h2 className="section-title">Credentials</h2>
        </motion.div>

        <motion.div variants={staggerContainer(0.08)} {...revealProps} className="cert-grid">
          {certifications.map((c) => (
            <CursorTarget as={motion.div} key={c.name} variants={staggerItem} image={badgeImage} className="certificate-badge">
              <FaCertificate size={22} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.98rem', marginBottom: 4 }}>{c.name}</h4>
                <p className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {c.issuer} · {c.year}
                </p>
                <p className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                  ID: {c.credentialId}
                </p>
              </div>
            </CursorTarget>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
