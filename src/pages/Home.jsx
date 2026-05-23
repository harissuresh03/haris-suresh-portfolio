import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFigma, FaPalette, FaCode } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projectsData';
import profilePic from '../assets/images/profile.png';
import utemLogo from '../assets/images/education/utem-logo.png';
import ktjLogo from '../assets/images/education/ktepj-logo.png';
import smkLogo from '../assets/images/education/samad-logo.png';
import badge from '../assets/images/badge.jpg';

const Home = () => {
  // Refs for magnetic buttons
  const connectBtnRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const viewDetailsBtnRef = useRef(null);
  const viewAllBtnRef = useRef(null);
  const contactBtnRef = useRef(null);

  // Magnetic effect handler
  const handleMagneticMove = (e, ref) => {
    if (!ref.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { x, y, width, height } = currentTarget.getBoundingClientRect();
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const moveX = (clientX - centerX) * 0.15;
    const moveY = (clientY - centerY) * 0.15;
    ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMagneticLeave = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  const services = [
    {
      icon: <FaFigma size={40} />,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive and user-centered designs that enhance user experience.'
    },
    {
      icon: <FaPalette size={40} />,
      title: 'Graphic Design',
      description: 'Professional graphic design including branding, social media graphics, and visual content.'
    },
    {
      icon: <FaCode size={40} />,
      title: 'Web Development',
      description: 'Building responsive, high-performance web applications using modern frameworks.'
    }
  ];

  // Skills organized by category without scores
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Java', 'JavaScript', 'SQL', 'C++', 'HTML5', 'CSS3']
    },
    {
      title: 'Frameworks & Technologies',
      skills: ['React.js', 'Node.js', 'Express.js']
    },
    {
      title: 'Tools & Software',
      skills: ['Git', 'VS Code', 'GitHub', 'Android Studio', 'Adobe Animate', 'Canva', 'Microsoft Office']
    }
  ];

  const education = [
    {
      school: 'Universiti Teknikal Malaysia Melaka',
      degree: "Bachelor's Degree in Computer Science (Software Development)",
      period: '2023 - Present',
      cgpa: 'CGPA: 3.93',
      logo: utemLogo
    },
    {
      school: 'Kolej Tingkatan Enam Petaling Jaya',
      degree: 'STPM',
      period: '2021 - 2023',
      cgpa: 'CGPA: 3.09',
      logo: ktjLogo
    },
    {
      school: 'SMK Sultan Abdul Samad Petaling Jaya',
      degree: 'SPM',
      period: '2016 - 2021',
      cgpa: '6A, 3B, 1C',
      logo: smkLogo
    }
  ];

  const certifications = [
    { name: 'Oracle Certified Foundations Associate', issuer: 'Oracle', date: '2026', badge: badge }
  ];

  const experiences = [
    {
      title: 'Media & Publicity Team Lead',
      organization: 'Developer Student Club UTeM',
      period: '2023 - Present',
      description: 'Managed club social media strategy, content publishing, analytics, and cross-team media initiatives while leading collaborative tech event promotions.'
    },
    {
      title: 'Media Lead',
      organization: 'Student Representative Council KTEPJ',
      period: '2021 - 2023',
      description: 'Managed college social media platforms by creating multimedia event content, coordinating live coverage, and engaging with the online student community across Instagram, Facebook, and TikTok.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="about" style={{ paddingTop: '120px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid-2"
            style={{ alignItems: 'center', gap: '50px' }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Available to work badge - unclickable but hoverable */}
                <div 
                  className="pulse-animation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.15), rgba(0, 200, 0, 0.05))',
                    border: '1px solid rgba(0, 255, 0, 0.5)',
                    borderRadius: '50px',
                    padding: '6px 16px',
                    marginBottom: '20px',
                    cursor: 'default',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.5)';
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    background: '#00ff00',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></span>
                  <span style={{ color: '#00ff00', fontSize: '0.85rem', fontWeight: '500' }}>
                    Available for work
                  </span>
                </div>
                
                <p style={{ color: 'var(--accent-pink)', marginBottom: '10px', fontWeight: '500' }}>Welcome to my portfolio</p>
                <h1 style={{ fontSize: '4rem', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
                  I'm <span className="glow-text">Haris Suresh</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                  Computer Science Student | Software Developer 
                </p>
                <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
                  A dedicated individual with a solid academic background in computer science, 
                  complemented by practical experience in software development and technical projects. I have a deep passion for technology, problem-solving, and continuous learning. Throughout my academic journey, I have developed solid technical skills in programming languages such as Java, C++, JavaScript, HTML5, CSS3, and SQL. I also enjoy working collaboratively in teams and contributing creative ideas to projects and events.
                </p>
                
                {/* Magnetic Buttons */}
                <div style={{ display: 'flex', gap: '20px' }}>
                  <a 
                    ref={connectBtnRef}
                    href="https://www.linkedin.com/in/haris-suresh-3b1693360/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary magnetic-btn"
                    style={{ display: 'inline-block', transition: 'transform 0.2s ease-out' }}
                    onMouseMove={(e) => handleMagneticMove(e, connectBtnRef)}
                    onMouseLeave={() => handleMagneticLeave(connectBtnRef)}
                  >
                    Connect with Me 
                  </a>
                  <a 
                    ref={resumeBtnRef}
                    href="/Haris_Suresh_Resume.pdf" 
                    download 
                    className="btn-secondary magnetic-btn"
                    style={{ display: 'inline-block', transition: 'transform 0.2s ease-out' }}
                    onMouseMove={(e) => handleMagneticMove(e, resumeBtnRef)}
                    onMouseLeave={() => handleMagneticLeave(resumeBtnRef)}
                  >
                    View Resume
                  </a>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="profile-image-container"
            >
              <div className="profile-image-glow"></div>
              <img 
                src={profilePic}
                alt="Haris Suresh"
                className="profile-image"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">What I <span className="glow-text">Do</span></h2>
            <p className="section-subtitle">Services I offer to help bring your ideas to life</p>
          </motion.div>
          
          <div className="grid-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card glow-on-hover"
                style={{ textAlign: 'center' }}
              >
                <div style={{ color: 'var(--accent-pink)', marginBottom: '40px' }}>{service.icon}</div>
                <h3 style={{ marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Skills Section - Card with unclickable buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ marginTop: '80px' }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>My <span className="glow-text">Skills</span></h3>
            <div className="grid-3">
              {skillCategories.map((category, idx) => (
                <div key={idx} className="card glow-on-hover">
                  <h4 style={{ marginBottom: '20px', color: 'var(--accent-cyan)' }}>{category.title}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Background Section */}
      <section id="academic">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Academic <span className="glow-text">Background</span></h2>
            <p className="section-subtitle">My academic journey and professional credentials</p>
          </motion.div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card glow-on-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
              >
                <img src={edu.logo} alt={edu.school} style={{ width: '80px', height: '80px', borderRadius: '10px' }} />
                <div style={{ flex: 1 }}>
                  <h3>{edu.school}</h3>
                  <p style={{ color: 'var(--accent-pink)', marginBottom: '5px' }}>{edu.degree}</p>
                  <p style={{ color: 'var(--text-secondary)' }}>{edu.period} | {edu.cgpa}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications with badges - Card style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginTop: '80px' }}
          >
            <h3 style={{ marginBottom: '30px', fontSize: '1.8rem' }}>Certifications & <span className="glow-text">Badges</span></h3>
            <div className="grid-2">
              {certifications.map((cert, index) => (
                <div key={index} className="card glow-on-hover" style={{ padding: '30px', textAlign: 'center' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <img 
                      src={cert.badge} 
                      alt={cert.name}
                      style={{ 
                        width: '300px',
                        height: '200px',
                        objectFit: 'contain',
                        marginBottom: '20px'
                      }}
                    />
                  </div>
                  <h4 style={{ marginBottom: '10px', fontSize: '1.3rem', color: 'var(--accent-pink)' }}>{cert.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{cert.issuer}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Earned: {cert.date}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ marginTop: '80px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">My <span className="glow-text">Journey</span></h2>
            <p className="section-subtitle">Professional journey and leadership roles</p>
          </motion.div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card glow-on-hover"
                style={{ padding: '25px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <h3>{exp.title}</h3>
                  <p style={{ color: 'var(--accent-pink)' }}>{exp.period}</p>
                </div>
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>{exp.organization}</p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>{exp.description}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a 
              ref={viewDetailsBtnRef}
              href="/experience" 
              className="btn-primary magnetic-btn"
              style={{ display: 'inline-block', transition: 'transform 0.2s ease-out' }}
              onMouseMove={(e) => handleMagneticMove(e, viewDetailsBtnRef)}
              onMouseLeave={() => handleMagneticLeave(viewDetailsBtnRef)}
            >
              View More Details →
            </a>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Featured <span className="glow-text">Projects</span></h2>
            <p className="section-subtitle">Some of my best work and creative endeavors</p>
          </motion.div>
          
          <div className="grid-3">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a 
              ref={viewAllBtnRef}
              href="/projects" 
              className="btn-primary magnetic-btn"
              style={{ display: 'inline-block', transition: 'transform 0.2s ease-out' }}
              onMouseMove={(e) => handleMagneticMove(e, viewAllBtnRef)}
              onMouseLeave={() => handleMagneticLeave(viewAllBtnRef)}
            >
              View All Projects →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '150px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Let's <span className="glow-text">Connect</span></h2>
            <p className="section-subtitle">Have a project in mind? Let's work together!</p>
            <a 
              ref={contactBtnRef}
              href="/contact" 
              className="btn-primary magnetic-btn"
              style={{ marginTop: '30px', display: 'inline-block', transition: 'transform 0.2s ease-out' }}
              onMouseMove={(e) => handleMagneticMove(e, contactBtnRef)}
              onMouseLeave={() => handleMagneticLeave(contactBtnRef)}
            >
              Go to Contact Page →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;