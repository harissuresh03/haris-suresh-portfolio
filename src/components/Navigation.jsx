import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track which in-page section is active while on the homepage so the
      // underline can follow scroll position, not just clicks.
      if (location.pathname === '/') {
        const sectionIds = ['about', 'academic', 'leadership-work', 'projects-section', 'contact'];
        let current = 'about';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) {
            current = id;
          }
        }
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (path, sectionId) => {
    setIsOpen(false);

    if (location.pathname === '/' && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (path === '/') {
      window.location.href = '/';
    } else {
      window.location.href = path;
    }
  };

  const navItems = [
    { name: 'about', path: '/', sectionId: 'about' },
    { name: 'academics', path: '/', sectionId: 'academic' },
    { name: 'projects', path: '/projects', sectionId: null },
    { name: 'contact', path: '/contact', sectionId: null },
  ];

  const isItemActive = (item) => {
    if (item.path === '/projects') return location.pathname.startsWith('/project');
    if (item.path === '/contact') return location.pathname === '/contact';
    if (item.path === '/') return location.pathname === '/' && !!item.sectionId && activeSection === item.sectionId;
    return false;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <motion.span
            whileHover={{ rotate: [0, -6, 6, -3, 0] }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-block' }}
          >
            haris-suresh
          </motion.span>
        </Link>

        <div className="nav-right">
          <ThemeToggle />

          <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navItems.map((item, index) => {
              const active = isItemActive(item);
              return (
                <li key={index} style={{ position: 'relative' }}>
                  {item.path === '/' ? (
                    <button onClick={() => handleNavClick(item.path, item.sectionId)}>
                      {item.name}
                    </button>
                  ) : (
                    <Link to={item.path} onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Link>
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
