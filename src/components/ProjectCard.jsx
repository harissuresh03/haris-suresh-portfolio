import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className="card project-card glow-on-hover"
      style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
      onClick={handleViewDetails}
    >
      <img
        src={project.coverImage || project.image}
        alt={project.title}
        className="project-cover"
      />
      <div style={{ padding: '22px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', minHeight: '42px' }}>
          {project.description.substring(0, 90)}...
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0' }}>
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="skill-badge" style={{ fontSize: '0.72rem' }}>
              {tech}
            </span>
          ))}
        </div>

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
            className="mono"
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
    </div>
  );
};

export default ProjectCard;