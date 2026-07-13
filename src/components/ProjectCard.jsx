import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { cardHover, staggerContainer, staggerItem } from '../lib/animations';

const ProjectCard = ({ project, featured = false }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };

  // Cursor-following glow: writes the pointer position into CSS vars that
  // the .card-glow::before radial-gradient in globals.css reads.
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="card project-card glow-on-hover card-glow"
      style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
      onClick={handleViewDetails}
      onMouseMove={handleMouseMove}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <img
        src={project.coverImage || project.image}
        alt={project.title}
        className="project-cover"
        style={featured ? { height: '340px' } : undefined}
        loading="lazy"
      />
      <div style={{ padding: '22px', position: 'relative', zIndex: 1 }}>
        <h3 style={{ marginBottom: '10px', fontSize: featured ? '1.35rem' : '1.1rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', minHeight: '42px' }}>
          {project.description.substring(0, featured ? 170 : 90)}...
        </p>

        <motion.div
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0' }}
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.technologies.slice(0, featured ? 5 : 3).map((tech, i) => (
            <motion.span key={i} variants={staggerItem} className="skill-badge" style={{ fontSize: '0.72rem' }}>
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
            className="mono link-underline"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-blue)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
            }}
          >
            View project <FaArrowRight size={11} />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="View source on GitHub"
              style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
