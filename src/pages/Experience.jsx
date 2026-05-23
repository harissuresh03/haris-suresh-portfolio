import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaVideo, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import mpte1 from '../assets/images/experience/mpte/STPM.jpg';
import mpte2 from '../assets/images/experience/mpte/STPM2.jpg';
import dscutem1 from '../assets/images/experience/dscutem/DiscoveringAI.png';
import dscutem2 from '../assets/images/experience/dscutem/SocietyDay.jpeg';

const Experience = () => {
  // Carousel state for each experience
  const [carouselStates, setCarouselStates] = useState({});
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentCaption, setCurrentCaption] = useState('');

  // Image captions - wrapped in useMemo to prevent re-creation
  const imageCaptions = useMemo(() => ({
    [dscutem1]: 'Discovering AI Event',
    [dscutem2]: 'Society Day Event',
    [mpte1]: 'Appreciation Award Receiving Ceremony',
    [mpte2]: 'Official Appointment Ceremony as Media Lead'
  }), []);

  // Experiences - wrapped in useMemo to prevent re-creation on every render
  const experiences = useMemo(() => [
    {
      id: 1,
      title: 'Media & Publicity Team Lead',
      organization: 'Developer Student Club UTeM',
      period: '2023 - Present',
      description: 'Leading media and publicity initiatives for DSC UTeM, managing social media presence across multiple platforms, and coordinating with tech clubs for events.',
      responsibilities: [
        'Handled content publishing and engagement for the club social media accounts',
        'Strategic social media planning and execution across multiple platforms',
        'Team leadership and project management for media initiatives',
        'Cross-club collaboration for tech events and workshops',
        'Content strategy development and analytics tracking'
      ],
      images: [dscutem1, dscutem2],
      icon: <FaUsers size={40} color="var(--accent-pink)" />
    },
    {
      id: 2,
      title: 'Media Lead',
      organization: 'Student Representative Council KTEPJ',
      period: '2021 - 2023',
      description: 'Managed all social media and multimedia content for the Student Representative Council, creating engaging content for college events and communications.',
      responsibilities: [
        'Managed the college social media platforms, including Instagram, Facebook, and TikTok',
        'Created engaging video and multimedia content for events and promotions',
        'Produced event coverage content to improve student engagement and communication',
        'Collaborated with event organizers to provide real-time media coverage',
        'Managed audience interaction by responding to inquiries and engaging with the online community'
      ],
      images: [mpte1, mpte2],
      icon: <FaVideo size={40} color="var(--accent-pink)" />
    }
  ], []);

  // Initialize carousel states - now experiences is stable
  useEffect(() => {
    const initialStates = {};
    experiences.forEach(exp => {
      initialStates[exp.id] = { currentSlide: 0, direction: 0 };
    });
    setCarouselStates(initialStates);
  }, [experiences]);

  // Carousel navigation functions
  const nextSlide = (expId, imagesLength) => {
    setCarouselStates(prev => ({
      ...prev,
      [expId]: {
        currentSlide: (prev[expId]?.currentSlide + 1) % imagesLength,
        direction: 1
      }
    }));
  };

  const prevSlide = (expId, imagesLength) => {
    setCarouselStates(prev => ({
      ...prev,
      [expId]: {
        currentSlide: (prev[expId]?.currentSlide - 1 + imagesLength) % imagesLength,
        direction: -1
      }
    }));
  };

  const goToSlide = (expId, index) => {
    setCarouselStates(prev => ({
      ...prev,
      [expId]: {
        currentSlide: index,
        direction: index > (prev[expId]?.currentSlide || 0) ? 1 : -1
      }
    }));
  };

  // Open lightbox
  const openLightbox = (images, index, caption) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setCurrentImage(images[index]);
    setCurrentCaption(caption || imageCaptions[images[index]] || 'Gallery Image');
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

  // Next/Prev in lightbox
  const nextImage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < currentImages.length) {
      setCurrentIndex(nextIndex);
      setCurrentImage(currentImages[nextIndex]);
      setCurrentCaption(imageCaptions[currentImages[nextIndex]] || 'Gallery Image');
    }
  };

  const prevImage = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setCurrentImage(currentImages[prevIndex]);
      setCurrentCaption(imageCaptions[currentImages[prevIndex]] || 'Gallery Image');
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
            setCurrentCaption(imageCaptions[currentImages[nextIndex]] || 'Gallery Image');
          }
        }
        if (e.key === 'ArrowLeft') {
          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
            setCurrentImage(currentImages[prevIndex]);
            setCurrentCaption(imageCaptions[currentImages[prevIndex]] || 'Gallery Image');
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex, currentImages, imageCaptions]);

  // Carousel animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <>
      <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h1 className="section-title">My Professional <span className="glow-text">Journey</span></h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              A timeline of my leadership roles, responsibilities, and growth
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3px',
              height: '100%',
              background: 'linear-gradient(180deg, var(--accent-pink), var(--accent-purple), var(--accent-cyan))',
              borderRadius: '3px'
            }} />

            {experiences.map((exp, index) => {
              const carouselState = carouselStates[exp.id] || { currentSlide: 0, direction: 0 };
              const hasMultipleImages = exp.images.length > 1;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{
                    display: 'flex',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    marginBottom: '60px',
                    position: 'relative'
                  }}
                >
                  {/* Timeline Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '20px',
                    background: 'var(--accent-pink)',
                    borderRadius: '50%',
                    border: '3px solid var(--bg-primary)',
                    zIndex: 2,
                    boxShadow: '0 0 0 4px rgba(255, 45, 117, 0.3)'
                  }} />

                  {/* Content Card */}
                  <div style={{
                    width: 'calc(50% - 40px)',
                    marginLeft: isEven ? '0' : 'auto',
                    marginRight: isEven ? 'auto' : '0'
                  }}>
                    <div className="card glow-on-hover" style={{ padding: '25px' }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                        <div style={{
                          background: 'rgba(255, 45, 117, 0.2)',
                          padding: '10px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 style={{ marginBottom: '5px' }}>{exp.title}</h3>
                          <p style={{ color: 'var(--accent-pink)', fontSize: '0.9rem' }}>{exp.period}</p>
                        </div>
                      </div>

                      {/* Organization */}
                      <p style={{ 
                        color: 'var(--accent-cyan)', 
                        fontWeight: '500',
                        marginBottom: '15px',
                        fontSize: '0.95rem'
                      }}>
                        {exp.organization}
                      </p>

                      {/* Description */}
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
                        {exp.description}
                      </p>

                      {/* Responsibilities */}
                      <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginBottom: '12px', color: 'var(--accent-pink)', fontSize: '1rem' }}>Key Responsibilities</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {exp.responsibilities.slice(0, 3).map((resp, i) => (
                            <li key={i} style={{ 
                              marginBottom: '8px', 
                              paddingLeft: '20px', 
                              position: 'relative', 
                              color: 'var(--text-secondary)',
                              fontSize: '0.9rem'
                            }}>
                              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-pink)' }}>▹</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Carousel Gallery */}
                      {exp.images && exp.images.length > 0 && (
                        <div>
                          <h4 style={{ marginBottom: '12px', color: 'var(--accent-pink)', fontSize: '1rem' }}>Gallery</h4>
                          
                          {/* Main Carousel */}
                          <div style={{ 
                            position: 'relative', 
                            borderRadius: '12px', 
                            overflow: 'hidden',
                            background: 'rgba(0,0,0,0.3)',
                            marginBottom: '10px'
                          }}>
                            <AnimatePresence custom={carouselState.direction} mode="wait">
                              <motion.div
                                key={carouselState.currentSlide}
                                custom={carouselState.direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                style={{ cursor: 'pointer' }}
                                onClick={() => openLightbox(exp.images, carouselState.currentSlide, imageCaptions[exp.images[carouselState.currentSlide]])}
                              >
                                <img
                                  src={exp.images[carouselState.currentSlide]}
                                  alt={`Gallery ${carouselState.currentSlide + 1}`}
                                  style={{
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover',
                                    borderRadius: '12px'
                                  }}
                                />
                              </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {hasMultipleImages && (
                              <>
                                <button
                                  onClick={(e) => { e.stopPropagation(); prevSlide(exp.id, exp.images.length); }}
                                  style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    padding: '8px 12px',
                                    borderRadius: '50%',
                                    transition: 'all 0.3s ease',
                                    zIndex: 10
                                  }}
                                >
                                  <FaChevronLeft />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); nextSlide(exp.id, exp.images.length); }}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    padding: '8px 12px',
                                    borderRadius: '50%',
                                    transition: 'all 0.3s ease',
                                    zIndex: 10
                                  }}
                                >
                                  <FaChevronRight />
                                </button>
                              </>
                            )}
                          </div>

                          {/* Thumbnails */}
                          {hasMultipleImages && (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
                              {exp.images.map((img, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => goToSlide(exp.id, idx)}
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: carouselState.currentSlide === idx ? '2px solid var(--accent-pink)' : '2px solid transparent',
                                    opacity: carouselState.currentSlide === idx ? 1 : 0.5,
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  <img
                                    src={img}
                                    alt={`Thumb ${idx + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '8px' }}>
                            Click image to enlarge
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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

          {currentCaption && (
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
              {currentCaption}
            </div>
          )}

          <img
            src={currentImage}
            alt="Gallery view"
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

export default Experience;