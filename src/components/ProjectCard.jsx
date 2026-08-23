import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import { usePixelTransition } from './PixelTransition';

// iOS App Store-inspired card: big cover art up top acting like an app
// icon/hero, title + platform as the "app name / subtitle" row, and a
// shared layoutId on the cover so it morphs into the detail page's hero
// image (Framer Motion resolves layoutId matches across route changes).
// Deliberately static otherwise — no lift/scale/glow hover effect, and no
// custom-cursor label on hover per the brief.
const ProjectCard = ({ project, featured = false }) => {
  const navigate = useNavigate();
  const goToProject = usePixelTransition();

  const handleViewDetails = () => {
    goToProject(`/project/${project.id}`, navigate);
  };

  return (
    <div className="card project-card appstore-card" onClick={handleViewDetails}>
      <motion.div className="appstore-cover" layoutId={`project-cover-${project.id}`}>
        <img
          src={project.coverImage || project.image}
          alt={project.title}
          className="project-cover"
          style={featured ? { height: '380px' } : undefined}
          loading="lazy"
        />
        <span className="appstore-platform-chip mono">{project.category || project.platform}</span>
      </motion.div>

      <div className="appstore-body">
        <h3 style={{ marginBottom: '12px', fontSize: featured ? '1.55rem' : '1.3rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', minHeight: '48px' }}>
          {project.description.substring(0, featured ? 200 : 130)}...
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '18px 0' }}>
          {project.technologies.slice(0, featured ? 5 : 4).map((tech, i) => (
            <span key={i} className="skill-badge" style={{ fontSize: '0.78rem' }}>
              {tech}
            </span>
          ))}
        </div>

        <div className="appstore-footer">
          <button
            onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
            className="mono link-underline"
            style={{
              background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '6px', padding: 0,
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
              className="appstore-github-link"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;