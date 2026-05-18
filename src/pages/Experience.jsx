import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaVideo, FaTimes } from 'react-icons/fa';
import mpte1 from '../assets/images/experience/mpte/STPM.jpg';
import mpte2 from '../assets/images/experience/mpte/STPM2.jpg';
import dscutem1 from '../assets/images/experience/dscutem/DiscoveringAI.png';

const Experience = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  const openLightbox = (images, index) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setCurrentImage(images[index]);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    setCurrentImages([]);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < currentImages.length) {
      setCurrentIndex(nextIndex);
      setCurrentImage(currentImages[nextIndex]);
    }
  };

  const prevImage = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setCurrentImage(currentImages[prevIndex]);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
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

  const experiences = [
    {
      title: 'Media & Publicity Team Lead',
      organization: 'DSC UTeM',
      period: '2023 - Present',
      responsibilities: [
        'Handled content publishing and engagement for the club social media accounts',
        'Strategic social media planning and execution across multiple platforms',
        'Team leadership and project management for media initiatives',
        'Cross-club collaboration for tech events and workshops',
        'Content strategy development and analytics tracking'
      ],
      images: [
        dscutem1
      ],
      icon: <FaUsers size={50} color="var(--accent-pink)" />
    },
    {
      title: 'Media Lead',
      organization: 'Student Representative Council KTEPJ',
      period: '2021 - 2023',
      responsibilities: [
        'Managed the college social media platforms, including Instagram, Facebook, and TikTok',
        'Created engaging video and multimedia content for events and promotions',
        'Produced event coverage content to improve student engagement and communication',
        'Collaborated with event organizers to provide real-time media coverage',
        'Managed audience interaction by responding to inquiries and engaging with the online community'
      ],
      images: [
        mpte1,
        mpte2
      ],
      icon: <FaVideo size={50} color="var(--accent-pink)" />
    }
  ];

  return (
    <>
      <section style={{ paddingTop: '120px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">My <span className="glow-text">Journey</span></h1>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px', color: 'var(--text-secondary)' }}>
              A comprehensive overview of my leadership roles.
            </p>
          </motion.div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ marginBottom: '80px' }}
            >
              <div className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                  {exp.icon}
                  <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{exp.title}</h2>
                    <h3 style={{ color: 'var(--accent-pink)', marginBottom: '5px' }}>{exp.organization}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{exp.period}</p>
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Key Responsibilities</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative', color: 'var(--text-secondary)' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent-pink)' }}>▹</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.images && exp.images.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: '15px', color: 'var(--accent-pink)' }}>Gallery</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                      {exp.images.map((img, i) => (
                        <img 
                          key={i}
                          src={img} 
                          alt={`Experience ${index + 1} - ${i + 1}`}
                          style={{ 
                            width: '100%', 
                            height: '200px', 
                            objectFit: 'cover', 
                            borderRadius: '10px',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          onClick={() => openLightbox(exp.images, i)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
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