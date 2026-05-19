// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { projects } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  
  console.log('Project ID from URL:', id);
  console.log('All projects:', projects);
  
  const project = projects.find(p => p.id === parseInt(id));
  
  console.log('Found project:', project);

  // Open lightbox with clicked image
  const openLightbox = (images, index) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setCurrentImage(images[index]);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    setCurrentImages([]);
    document.body.style.overflow = 'auto';
  };

  // Next image
  const nextImage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < currentImages.length) {
      setCurrentIndex(nextIndex);
      setCurrentImage(currentImages[nextIndex]);
    }
  };

  // Previous image
  const prevImage = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setCurrentImage(currentImages[prevIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
      const nextIndex = currentIndex + 1;
      if (nextIndex < currentImages.length) {
        setCurrentIndex(nextIndex);
        setCurrentImage(currentImages[nextIndex]);
      }
    }
    if (e.key === 'ArrowLeft') {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        setCurrentIndex(prevIndex);
        setCurrentImage(currentImages[prevIndex]);
      }
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [lightboxOpen, currentIndex, currentImages]);

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
    <>
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
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => openLightbox(project.images, i)}
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

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 10000,
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaTimes />
          </button>

          {/* Previous button */}
          {currentImages.length > 1 && currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '10px 20px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                zIndex: 10000
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              ←
            </button>
          )}

          {/* Next button */}
          {currentImages.length > 1 && currentIndex < currentImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '10px 20px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                zIndex: 10000
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              →
            </button>
          )}

          {/* Image counter */}
          {currentImages.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                zIndex: 10000
              }}
            >
              {currentIndex + 1} / {currentImages.length}
            </div>
          )}

          {/* Main image */}
          <img
            src={currentImage}
            alt="Screenshot view"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '10px',
              cursor: 'default'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;