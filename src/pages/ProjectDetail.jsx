// src/pages/ProjectDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowLeft, FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects } from '../data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Screenshot showcase state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const project = projects.find((p) => p.id === parseInt(id));

  const getImageSrc = (img) => (typeof img === 'object' ? img.src : img);
  const getImageCaption = (img) => (typeof img === 'object' ? img.caption : '');

  const images = project?.images || [];
  const hasMultipleImages = images.length > 1;

  const nextSlide = () => {
    if (!hasMultipleImages) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    if (!hasMultipleImages) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
  setLightboxOpen(false);
  document.body.style.overflow = 'auto';
}, []);

const nextImage = useCallback(() => {
  setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
}, [images.length]);

const prevImage = useCallback(() => {
  setCurrentIndex((i) => Math.max(i - 1, 0));
}, []);

  // Keyboard navigation for the lightbox
  useEffect(() => {
  if (!lightboxOpen) return;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      default:
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Reset the showcase whenever a different project is opened
  useEffect(() => {
    setCurrentSlide(0);
    setDirection(0);
  }, [id]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 400 : -400, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 32 } },
    exit: (dir) => ({ x: dir > 0 ? -400 : 400, opacity: 0, transition: { duration: 0.25 } }),
  };

  // Swipe support: a drag gesture on the showcase frame advances the slide
  const handleDragEnd = (e, info) => {
    if (!hasMultipleImages) return;
    if (info.offset.x < -60) nextSlide();
    else if (info.offset.x > 60) prevSlide();
  };

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '160px 20px 120px' }}>
        <h2>Project not found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Project with ID {id} does not exist.</p>
        <button onClick={() => navigate('/projects')} className="btn-primary" style={{ marginTop: '24px' }}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <>
      <section style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        <div className="container">
          <motion.button
            onClick={() => navigate('/projects')}
            className="btn-secondary"
            style={{
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
            }}
            whileHover={{ x: -3 }}
          >
            <FaArrowLeft /> Back to Projects
          </motion.button>

          {/* ---- Hero ---- */}
          <div className="detail-section">
            <p className="detail-eyebrow">{project.platform}</p>
            <h1 style={{ fontSize: '2.6rem', marginBottom: '18px', lineHeight: 1.15, maxWidth: '820px' }}>
              {project.title}
            </h1>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {project.technologies.map((tech, i) => (
                <span key={i} className="skill-badge">{tech}</span>
              ))}
            </div>
          </div>

          {/* ---- Overview ---- */}
          <div className="detail-section card" style={{ padding: '36px' }}>
            <p className="detail-eyebrow">overview</p>
            <p style={{ lineHeight: '1.85', fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '820px' }}>
              {project.description}
            </p>
          </div>

          {/* ---- Features ---- */}
          <div className="detail-section">
            <p className="detail-eyebrow">key_features</p>
            <h2 style={{ marginBottom: '22px', fontSize: '1.5rem' }}>What it does</h2>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}
            >
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="card glow-on-hover"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '18px 20px' }}
                >
                  <FaCheck style={{ color: 'var(--accent-green)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Screenshot Showcase ---- */}
          {images.length > 0 && (
            <div className="detail-section">
              <p className="detail-eyebrow">screenshot_showcase</p>
              <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>A closer look</h2>

              <div className="shot-viewer">
                <div className="shot-frame">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={currentSlide}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag={hasMultipleImages ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
                      onClick={() => openLightbox(currentSlide)}
                    >
                      <img
                        src={getImageSrc(images[currentSlide])}
                        alt={`${project.title} screenshot ${currentSlide + 1}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {hasMultipleImages && (
                    <>
                      <button className="shot-nav-btn prev" onClick={(e) => { e.stopPropagation(); prevSlide(); }} aria-label="Previous screenshot">
                        <FaChevronLeft />
                      </button>
                      <button className="shot-nav-btn next" onClick={(e) => { e.stopPropagation(); nextSlide(); }} aria-label="Next screenshot">
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {getImageCaption(images[currentSlide]) && (
                  <div className="shot-caption">{getImageCaption(images[currentSlide])}</div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="shot-thumbs">
                  {images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className={`shot-thumb ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(idx)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <img src={getImageSrc(img)} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                    </motion.div>
                  ))}
                </div>
              )}

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                click or swipe to browse · click image to view full size
              </p>
            </div>
          )}

          {/* ---- CTA ---- */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', textDecoration: 'none' }}
            >
              <FaGithub size={20} /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ---- Lightbox ---- */}
      <AnimatePresence>
        {lightboxOpen && images[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              style={{
                position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none',
                color: 'white', fontSize: '2rem', cursor: 'pointer', zIndex: 10000,
              }}
            >
              <FaTimes />
            </button>

            {images.length > 1 && currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                aria-label="Previous"
                style={{
                  position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: 'white', fontSize: '1.6rem', cursor: 'pointer', padding: '12px 18px', borderRadius: '50%', zIndex: 10000,
                }}
              >
                <FaChevronLeft />
              </button>
            )}

            {images.length > 1 && currentIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                aria-label="Next"
                style={{
                  position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: 'white', fontSize: '1.6rem', cursor: 'pointer', padding: '12px 18px', borderRadius: '50%', zIndex: 10000,
                }}
              >
                <FaChevronRight />
              </button>
            )}

            {images.length > 1 && (
              <div style={{
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                color: 'white', background: 'rgba(0,0,0,0.7)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', zIndex: 10000,
              }}>
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {getImageCaption(images[currentIndex]) && (
              <div style={{
                position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
                color: 'white', background: 'rgba(0,0,0,0.7)', padding: '8px 20px', borderRadius: '20px',
                fontSize: '0.9rem', zIndex: 10000, maxWidth: '80%', textAlign: 'center',
              }}>
                {getImageCaption(images[currentIndex])}
              </div>
            )}

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={getImageSrc(images[currentIndex])}
              alt="Screenshot view"
              style={{ maxWidth: '90%', maxHeight: '85%', objectFit: 'contain', borderRadius: '10px', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;