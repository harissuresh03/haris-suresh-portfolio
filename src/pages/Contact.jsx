import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarker, FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, buttonHover } from '../lib/animations';

const iconCircleStyle = {
  width: '46px',
  height: '46px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.3rem',
  color: 'var(--accent-blue)',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-sans)',
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const result = await emailjs.send(
        'service_md461n6',
        'template_1nrksre',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'ukNzVG3w3o-RXeYHU'
      );

      if (result.text === 'OK') {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'harissuresh03@gmail.com', link: 'mailto:harissuresh03@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+60 12-998 8727', link: 'tel:+60129988727' },
    { icon: <FaMapMarker />, label: 'Location', value: 'Petaling Jaya, Selangor', link: null }
  ];

  return (
    <section style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="section-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>contact_form</p>
          <h1 className="section-title" style={{ textAlign: 'center' }}>Get in <span className="glow-text">touch</span></h1>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 50px', color: 'var(--text-secondary)' }}>
            Have a project in mind? I'd love to hear about it. Feel free to reach out for collaborations or just a friendly chat.
          </p>

          <div className="grid-2" style={{ gap: '30px' }}>
            {/* Contact Info */}
            <motion.div variants={fadeLeft} initial="hidden" animate="visible">
              <div className="card" style={{ padding: '36px' }}>
                <h2 style={{ marginBottom: '26px', fontSize: '1.2rem' }}>Let's connect</h2>

                <motion.div
                  style={{ marginBottom: '26px' }}
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  animate="visible"
                >
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '22px' }}
                    >
                      <div style={iconCircleStyle}>
                        {info.icon}
                      </div>
                      <div>
                        <p className="mono" style={{ marginBottom: '3px', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>{info.label}</p>
                        {info.link ? (
                          <a href={info.link} className="link-underline" style={{ color: 'var(--text-primary)' }}>
                            {info.value}
                          </a>
                        ) : (
                          <p style={{ color: 'var(--text-primary)' }}>{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <h3 style={{ marginBottom: '14px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Follow me</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.a
                    href="https://github.com/harissuresh03"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconCircleStyle}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/haris-suresh-3b1693360/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconCircleStyle}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <FaLinkedin />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeRight} initial="hidden" animate="visible">
              <div className="card" style={{ padding: '36px' }}>
                <h2 style={{ marginBottom: '26px', fontSize: '1.2rem' }}>Send me a message</h2>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '18px' }}>
                    <label htmlFor="name" className="mono" style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label htmlFor="email" className="mono" style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label htmlFor="message" className="mono" style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="form-input"
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%' }}
                    disabled={status === 'sending'}
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.p
                        key="success"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="mono"
                        style={{ marginTop: '15px', color: 'var(--accent-green)', textAlign: 'center', fontSize: '0.85rem' }}
                      >
                        ✓ Message sent — I'll get back to you soon.
                      </motion.p>
                    )}

                    {status === 'error' && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="mono"
                        style={{ marginTop: '15px', color: 'var(--accent-red)', textAlign: 'center', fontSize: '0.85rem' }}
                      >
                        ✗ Failed to send. Please email me directly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
