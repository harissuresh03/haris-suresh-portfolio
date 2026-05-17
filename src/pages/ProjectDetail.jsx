// src/pages/ProjectDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { projects } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  console.log('Project ID from URL:', id); // Debug: Check what ID is coming from URL
  console.log('All projects:', projects); // Debug: Check if projects are loaded
  
  const project = projects.find(p => p.id === parseInt(id));
  
  console.log('Found project:', project); // Debug: Check if project is found

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px' }}>
        <h2>Project not found</h2>
        <p>Project with ID {id} does not exist.</p>
        <button onClick={() => navigate('/projects')} className="btn-primary" style={{ marginTop: '20px' }}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <section style={{ paddingTop: '120px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigate('/projects')} 
            className="btn-secondary" 
            style={{ 
              marginBottom: '30px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <FaArrowLeft /> Back to Projects
          </button>

          <div className="card" style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{project.title}</h1>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
              <div style={{ background: 'rgba(255, 45, 117, 0.2)', padding: '8px 16px', borderRadius: '20px' }}>
                <strong>Platform:</strong> {project.platform}
              </div>
              <div style={{ background: 'rgba(255, 45, 117, 0.2)', padding: '8px 16px', borderRadius: '20px' }}>
                <strong>Languages:</strong> {project.languages}
              </div>
            </div>

            <h2 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Description</h2>
            <p style={{ marginBottom: '30px', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              {project.description}
            </p>

            <h2 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Technologies Used</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
              {project.technologies.map((tech, i) => (
                <span key={i} className="skill-badge" style={{ fontSize: '1rem', padding: '8px 20px' }}>
                  {tech}
                </span>
              ))}
            </div>

            <h2 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Key Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
              {project.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCheck style={{ color: 'var(--accent-pink)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                </div>
              ))}
            </div>

            {project.images && project.images.length > 0 && (
              <>
                <h2 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Screenshots</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                  {project.images.map((img, i) => (
                    <img 
                      key={i}
                      src={img} 
                      alt={`${project.title} screenshot ${i + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '250px', 
                        objectFit: 'cover', 
                        borderRadius: '15px',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ))}
                </div>
              </>
            )}

            <div style={{ textAlign: 'center' }}>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', textDecoration: 'none' }}
              >
                <FaGithub size={24} /> View on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;