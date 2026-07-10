// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowLeft, FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  
  const project = projects.find(p => p.id === parseInt(id));

  // Get images array (handle both old and new format)
  const getImageSrc = (img) => {
    return typeof img === 'object' ? img.src : img;
  };

  const getImageCaption = (img) => {
    return typeof img === 'object' ? img.caption : '';
  };

  const images = project?.images || [];
  const hasMultipleImages = images.length > 1;

  // Navigation functions for carousel
  const nextSlide = () => {
    if (hasMultipleImages) {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }
  };

  const prevSlide = () => {
    if (hasMultipleImages) {
      setDirection(-1);
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Open lightbox with clicked image
  const openLightbox = (index) => {
    setCurrentImages(images.map(img => getImageSrc(img)));
    setCurrentIndex(index);
    setCurrentImage(getImageSrc(images[index]));
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

  // Next image in lightbox
  const nextImage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < currentImages.length) {
      setCurrentIndex(nextIndex);
      setCurrentImage(currentImages[nextIndex]);
    }
  };

  // Previous image in lightbox
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
    if (lightboxOpen) {
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
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [lightboxOpen, currentIndex, currentImages]);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

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
                <div className="skill-badge" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                  <strong className="mono">Platform:</strong> {project.platform}
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

              {/* Carousel Gallery Section */}
              {images.length > 0 && (
                <>
                  <h2 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Screenshots</h2>
                  
                  <div style={{ marginBottom: '30px' }}>
                    {/* Main Carousel */}
                    <div style={{ 
                      position: 'relative', 
                      borderRadius: '15px', 
                      overflow: 'hidden',
                      background: 'rgba(0,0,0,0.3)'
                    }}>
                      <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                          key={currentSlide}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            position: 'relative'
                          }}
                          onClick={() => openLightbox(currentSlide)}
                        >
                          <img
                            src={getImageSrc(images[currentSlide])}
                            alt={`Screenshot ${currentSlide + 1}`}
                            style={{
                              width: '100%',
                              height: '450px',
                              objectFit: 'contain',
                              background: 'rgba(0,0,0,0.5)'
                            }}
                          />
                          
                          {/* Caption overlay */}
                          {getImageCaption(images[currentSlide]) && (
                            <div style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                              color: 'white',
                              padding: '20px',
                              textAlign: 'center',
                              fontSize: '0.9rem'
                            }}>
                              {getImageCaption(images[currentSlide])}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            style={{
                              position: 'absolute',
                              left: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(0,0,0,0.5)',
                              border: 'none',
                              color: 'white',
                              fontSize: '1.5rem',
                              cursor: 'pointer',
                              padding: '10px 15px',
                              borderRadius: '50%',
                              transition: 'all 0.3s ease',
                              zIndex: 10
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(0,0,0,0.5)',
                              border: 'none',
                              color: 'white',
                              fontSize: '1.5rem',
                              cursor: 'pointer',
                              padding: '10px 15px',
                              borderRadius: '50%',
                              transition: 'all 0.3s ease',
                              zIndex: 10
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                          >
                            <FaChevronRight />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Navigation */}
                    {hasMultipleImages && (
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        marginTop: '15px',
                        flexWrap: 'wrap'
                      }}>
                        {images.map((img, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => goToSlide(idx)}
                            style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              border: idx === currentSlide ? '3px solid var(--accent-pink)' : '2px solid transparent',
                              opacity: idx === currentSlide ? 1 : 0.6,
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <img
                              src={getImageSrc(img)}
                              alt={`Thumbnail ${idx + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Click to enlarge hint */}
                    <p style={{
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      marginTop: '10px'
                    }}>
                      Click on image to view full size
                    </p>
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

      {/* Lightbox Modal (same as before but with caption) */}
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

          {currentImages.length > 1 && currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
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

          {currentImages.length > 1 && currentIndex < currentImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
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

          {currentImages.length > 1 && (
            <div style={{
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
            }}>
              {currentIndex + 1} / {currentImages.length}
            </div>
          )}

          {/* Caption in lightbox */}
          {images[currentIndex] && getImageCaption(images[currentIndex]) && (
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              zIndex: 10000,
              maxWidth: '80%',
              textAlign: 'center'
            }}>
              {getImageCaption(images[currentIndex])}
            </div>
          )}

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