import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log('Navigating to project:', project.id);
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card project-card"
    >
      <div style={{ overflow: 'hidden', borderRadius: '15px', marginBottom: '20px' }}>
        <img 
          src={project.coverImage || project.image || 'https://via.placeholder.com/400x250?text=Project+Cover'} 
          alt={project.title}
          className="project-cover"
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
      </div>
      <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>{project.title}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>{project.description.substring(0, 100)}...</p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {project.technologies.slice(0, 3).map((tech, i) => (
          <span key={i} className="skill-badge" style={{ fontSize: '0.8rem' }}>
            {tech}
          </span>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
        <button 
          onClick={handleViewDetails} 
          className="btn-secondary" 
          style={{ 
            padding: '10px 24px', 
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
        >
          View Details
        </button>
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary" 
            style={{ 
              padding: '10px 24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            <FaGithub /> GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;