import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaVideo } from 'react-icons/fa';
import mpte1 from '../assets/images/experience/mpte/STPM.jpg';
import mpte2 from '../assets/images/experience/mpte/STPM2.jpg';
import dscutem1 from '../assets/images/experience/dscutem/DiscoveringAI.png';

const Experience = () => {
  const experiences = [
    {
      title: 'Media Lead',
      organization: 'Student Representative Council KTEJP',
      period: '2023 - Present',
      description: 'Handle all the social media of the club (Instagram, X, Thread, Facebook). Led the media and publicity team, collaborating with external university tech clubs to promote events and increase student engagement.',
      responsibilities: [
        'Strategic social media planning and execution across multiple platforms',
        'Team leadership and project management for media initiatives',
        'Cross-club collaboration for tech events and workshops',
        'Content strategy development and analytics tracking'
      ],
      images: [
        mpte1,
        mpte2
      ],
      icon: <FaUsers size={50} color="var(--accent-pink)" />
    },
    {
      title: 'Social Media Handler',
      organization: 'Kolej Tingkatan Enam Petaling Jaya',
      period: '2021 - 2023',
      description: 'Handled the social media of the college (Instagram, Facebook, TikTok). Developed multimedia content, including videos, for college events to enhance engagement and communication.',
      responsibilities: [
        'Created and managed content calendar for all social platforms',
        'Produced engaging video content',
        'Monitored social media metrics and optimized content strategy',
        'Coordinated with event organizers for real-time coverage',
        'Responded to inquiries and managed community interaction'
      ],
      images: [
        dscutem1
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
            <h1 className="section-title">My Professional <span className="glow-text">Journey</span></h1>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px', color: 'var(--text-secondary)' }}>
              A comprehensive overview of my leadership roles and the impact I've made in media and communications.
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

                <p style={{ fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                  {exp.description}
                </p>

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
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
    </>
  );
};

export default Experience;