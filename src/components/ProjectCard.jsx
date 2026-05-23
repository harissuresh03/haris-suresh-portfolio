import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="flip-card" style={{ height: '450px' }}>
      <div className="flip-card-inner">
        {/* Front of card */}
        <div className="flip-card-front card" style={{ padding: '0', overflow: 'hidden' }}>
          <img 
            src={project.coverImage || project.image} 
            alt={project.title}
            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {project.description.substring(0, 80)}...
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '15px' }}>
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="skill-badge" style={{ fontSize: '0.7rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="flip-card-back">
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Project Details</h3>
            <button onClick={handleViewDetails} className="btn-primary" style={{ marginBottom: '10px', width: '100%' }}>
              View Details
            </button>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'block', textAlign: 'center' }}>
                <FaGithub /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;