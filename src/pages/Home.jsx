import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaFigma, FaCode, FaMobileAlt } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projectsData';
import profilePic from '../assets/images/profile.jpg';
import utemLogo from '../assets/images/education/utem-logo.png';
import ktjLogo from '../assets/images/education/ktepj-logo.png';
import smkLogo from '../assets/images/education/samad-logo.png';
import badge from '../assets/images/badge.jpg';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  buttonHover,
  revealProps,
} from '../lib/animations';

const Home = () => {
  // Refs for magnetic buttons
  const connectBtnRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const viewAllBtnRef = useRef(null);
  const contactBtnRef = useRef(null);
  const heroRef = useRef(null);

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

  // Very subtle mouse parallax on the hero's editor window — a couple of
  // degrees of tilt, nothing distracting, and it settles with a spring.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-40, 40], [4, -4]);
  const rotateY = useTransform(springX, [-40, 40], [-4, 4]);

  const handleHeroMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleHeroMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const services = [
    {
      icon: <FaFigma size={32} />,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive and user-centered designs that enhance user experience.'
    },
    {
      icon: <FaMobileAlt size={32} />,
      title: 'Mobile Development',
      description: 'Building cross-platform mobile applications with Flutter and Firebase, from real-time features to seamless user experiences.'
    },
    {
      icon: <FaCode size={32} />,
      title: 'Web Development',
      description: 'Building responsive, high-performance web applications using modern frameworks.'
    }
  ];

  const skillCategories = [
    {
      title: 'Technical Skills',
      skills: ['Java', 'JavaScript', 'SQL', 'C++', 'HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js']
    },
    {
      title: 'Tools & Software',
      skills: ['Git', 'VS Code', 'GitHub', 'Android Studio', 'Adobe Animate', 'Canva', 'Microsoft Office']
    },
    {
      title: 'Spoken Languages',
      skills: ['English (Fluent)', 'Malay (Fluent)', 'Tamil (Native)']
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

  const leadershipWork = [
    {
      id: 1,
      title: 'Media & Publicity Team Lead',
      organization: 'Developer Student Club UTeM',
      period: '2023 - Present',
      description: 'Managed club social media strategy, content publishing, analytics, and cross-team media initiatives while leading collaborative tech event promotions.',
      type: 'Student Leadership'
    },
    {
      id: 2,
      title: 'Media Lead',
      organization: 'Student Representative Council KTEPJ',
      period: '2021 - 2023',
      description: 'Managed college social media platforms by creating multimedia event content, coordinating live coverage, and engaging with the online student community across Instagram, Facebook, and TikTok.',
      type: 'Student Leadership'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="about"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{ position: 'relative', paddingTop: '130px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="mesh-bg" aria-hidden="true">
          <div className="mesh-blob b1" />
          <div className="mesh-blob b2" />
          <div className="mesh-blob b3" />
        </div>

        <div className="container">
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
            className="grid-2"
            style={{ alignItems: 'center', gap: '60px' }}
          >
            <div>
              <motion.div variants={staggerItem}>
                {/* Available to work badge */}
                <div className="status-pill">
                  <span className="dot"></span>
                  <span>status --available-for-hire</span>
                </div>

                <p className="mono" style={{ color: 'var(--accent-blue)', marginBottom: '12px', fontSize: '0.95rem' }}>
                  Hi, my name is
                </p>
                <h1 style={{ fontSize: '3.2rem', fontWeight: '700', marginBottom: '16px', lineHeight: '1.15' }}>
                  Haris Suresh
                </h1>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 500 }}>
                  Computer Science Student &amp; Software Developer
                </h2>
                <p style={{ marginBottom: '32px', color: 'var(--text-secondary)', maxWidth: '520px', fontFamily: 'var(--font-sans)' }}>
                  A dedicated individual with a solid academic background in computer science,
                  complemented by practical experience in software development and technical projects.
                  I build with Java, JavaScript, React, Node.js and SQL, and enjoy working
                  collaboratively on teams to ship things that work.
                </p>

                {/* Magnetic Buttons */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a
                    ref={connectBtnRef}
                    href="https://www.linkedin.com/in/haris-suresh-3b1693360/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary magnetic-btn"
                    style={{ display: 'inline-block' }}
                    onMouseMove={(e) => handleMagneticMove(e, connectBtnRef)}
                    onMouseLeave={() => handleMagneticLeave(connectBtnRef)}
                  >
                    Connect with me
                  </a>
                  <a
                    ref={resumeBtnRef}
                    href="/Haris_Suresh_Resume.pdf"
                    download
                    className="btn-secondary magnetic-btn"
                    style={{ display: 'inline-block' }}
                    onMouseMove={(e) => handleMagneticMove(e, resumeBtnRef)}
                    onMouseLeave={() => handleMagneticLeave(resumeBtnRef)}
                  >
                    View resume
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Signature element: code editor window, with subtle parallax tilt */}
            <motion.div
              variants={staggerItem}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                perspective: 800,
              }}
            >
              <motion.div
                className="editor-window"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              >
                <div className="editor-titlebar">
                  <span className="editor-dot" style={{ background: '#f07178' }}></span>
                  <span className="editor-dot" style={{ background: '#f2a65a' }}></span>
                  <span className="editor-dot" style={{ background: '#8bd49c' }}></span>
                  <span className="editor-tab">profile.js</span>
                </div>
                <div className="editor-body">
                  <div className="editor-line"><span className="editor-lineno">1</span><span><span className="tok-kw">const</span> <span className="tok-fn">developer</span> <span className="tok-punc">=</span> <span className="tok-punc">{'{'}</span></span></div>
                  <div className="editor-line"><span className="editor-lineno">2</span><span>&nbsp;&nbsp;name<span className="tok-punc">:</span> <span className="tok-str">'Haris Suresh'</span><span className="tok-punc">,</span></span></div>
                  <div className="editor-line"><span className="editor-lineno">3</span><span>&nbsp;&nbsp;role<span className="tok-punc">:</span> <span className="tok-str">'Software Developer'</span><span className="tok-punc">,</span></span></div>
                  <div className="editor-line"><span className="editor-lineno">4</span><span>&nbsp;&nbsp;stack<span className="tok-punc">:</span> <span className="tok-punc">[</span><span className="tok-str">'React'</span><span className="tok-punc">,</span> <span className="tok-str">'Node'</span><span className="tok-punc">,</span> <span className="tok-str">'MySQL'</span><span className="tok-punc">],</span></span></div>
                  <div className="editor-line"><span className="editor-lineno">5</span><span>&nbsp;&nbsp;location<span className="tok-punc">:</span> <span className="tok-str">'Petaling Jaya, MY'</span><span className="tok-punc">,</span></span></div>
                  <div className="editor-line"><span className="editor-lineno">6</span><span>&nbsp;&nbsp;cgpa<span className="tok-punc">:</span> <span className="tok-const">3.93</span></span></div>
                  <div className="editor-line"><span className="editor-lineno">7</span><span><span className="tok-punc">{'}'}</span><span className="tok-punc">;</span><span className="editor-cursor"></span></span></div>
                </div>
              </motion.div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="profile-image-container">
                  <img src={profilePic} alt="Haris Suresh" className="profile-image" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" {...revealProps}>
            <p className="section-eyebrow">what_i_do</p>
            <h2 className="section-title">Services I <span className="glow-text">offer</span></h2>
            <p className="section-subtitle">Helping bring ideas to life, from design to deployment</p>
          </motion.div>

          <motion.div className="grid-3" variants={staggerContainer(0.1)} {...revealProps}>
            {services.map((service, index) => (
              <motion.div key={index} variants={staggerItem} whileHover={{ y: -6 }} className="card glow-on-hover">
                <div style={{ color: 'var(--accent-blue)', marginBottom: '20px' }}>{service.icon}</div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={fadeUp} initial="hidden" {...revealProps} style={{ marginTop: '80px' }}>
            <p className="section-eyebrow" style={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}>skills_and_tools</p>
            <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.7rem' }}>Skills &amp; abilities</h3>
            <motion.div className="grid-3" variants={staggerContainer(0.1)} {...revealProps}>
              {skillCategories.map((category, idx) => (
                <motion.div key={idx} variants={staggerItem} whileHover={{ y: -6 }} className="card glow-on-hover">
                  <h4 style={{ marginBottom: '18px', color: 'var(--accent-violet)', fontSize: '0.95rem' }}>{category.title}</h4>
                  <motion.div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
                    variants={staggerContainer(0.04)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {category.skills.map((skill, i) => (
                      <motion.span key={i} variants={staggerItem} className="skill-badge">
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Academic Background Section */}
      <section id="academic">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" {...revealProps}>
            <p className="section-eyebrow">education</p>
            <h2 className="section-title">Academic <span className="glow-text">background</span></h2>
            <p className="section-subtitle">My academic journey and professional credentials</p>
          </motion.div>

          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            variants={staggerContainer(0.12)}
            {...revealProps}
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeLeft}
                whileHover={{ y: -4 }}
                className="card glow-on-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
              >
                <img src={edu.logo} alt={edu.school} loading="lazy" style={{ width: '64px', height: '64px', borderRadius: '10px', border: '1px solid var(--border)' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem' }}>{edu.school}</h3>
                  <p style={{ color: 'var(--accent-blue)', marginBottom: '4px', fontFamily: 'var(--font-sans)' }}>{edu.degree}</p>
                  <p className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{edu.period} · {edu.cgpa}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeUp} initial="hidden" {...revealProps} style={{ marginTop: '70px' }}>
            <h3 style={{ marginBottom: '25px', fontSize: '1.4rem' }}>Certifications &amp; <span className="glow-text">badges</span></h3>
            <div className="grid-2">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="card glow-on-hover"
                  style={{ padding: '30px', textAlign: 'center' }}
                >
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    loading="lazy"
                    style={{ width: '260px', height: '170px', objectFit: 'contain', marginBottom: '18px' }}
                  />
                  <h4 style={{ marginBottom: '8px', fontSize: '1.05rem', color: 'var(--accent-blue)' }}>{cert.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontFamily: 'var(--font-sans)' }}>{cert.issuer}</p>
                  <p className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>Earned: {cert.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership & Work Section */}
      <section id="leadership-work">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" {...revealProps}>
            <p className="section-eyebrow">experience</p>
            <h2 className="section-title" style={{ marginBottom: '30px' }}>Leadership &amp; <span className="glow-text">work</span></h2>
          </motion.div>

          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            variants={staggerContainer(0.12)}
            {...revealProps}
          >
            {leadershipWork.map((item, index) => (
              <motion.div key={index} variants={fadeUp} whileHover={{ y: -4 }} className="card glow-on-hover">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '8px', gap: '8px' }}>
                  <div>
                    <h3 style={{ marginBottom: '4px', fontSize: '1.05rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--accent-violet)', fontWeight: '500', fontSize: '0.9rem', fontFamily: 'var(--font-sans)' }}>{item.organization}</p>
                  </div>
                  <p className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.period}</p>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontFamily: 'var(--font-sans)' }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" {...revealProps}>
            <p className="section-eyebrow">selected_work</p>
            <h2 className="section-title">Featured <span className="glow-text">projects</span></h2>
            <p className="section-subtitle">Some of my best work and creative endeavors</p>
          </motion.div>

          <motion.div className="grid-3" variants={staggerContainer(0.12)} {...revealProps}>
            {projects.slice(0, 3).map((project, index) => (
              <motion.div key={index} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a
              ref={viewAllBtnRef}
              href="/projects"
              className="btn-primary magnetic-btn"
              style={{ display: 'inline-block' }}
              onMouseMove={(e) => handleMagneticMove(e, viewAllBtnRef)}
              onMouseLeave={() => handleMagneticLeave(viewAllBtnRef)}
            >
              View all projects →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '120px 0' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" {...revealProps} style={{ textAlign: 'center' }}>
            <p className="section-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>get_in_touch</p>
            <h2 className="section-title">Let's <span className="glow-text">connect</span></h2>
            <p className="section-subtitle">Have a project in mind? Let's work together.</p>
            <a
              ref={contactBtnRef}
              href="/contact"
              className="btn-primary magnetic-btn"
              style={{ marginTop: '20px', display: 'inline-block' }}
              onMouseMove={(e) => handleMagneticMove(e, contactBtnRef)}
              onMouseLeave={() => handleMagneticLeave(contactBtnRef)}
            >
              Go to contact page →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
