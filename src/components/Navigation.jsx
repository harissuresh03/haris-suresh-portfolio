import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path, sectionId) => {
    setIsOpen(false);
    
    // If we're already on home page, just scroll to section
    if (location.pathname === '/' && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (path === '/') {
      // Navigate to home page
      window.location.href = '/';
    } else {
      // Navigate to other pages
      window.location.href = path;
    }
  };

  const navItems = [
    { name: 'About Me', path: '/', sectionId: 'about' },
    { name: 'Academic Background', path: '/', sectionId: 'academic' },
    { name: 'Projects', path: '/projects', sectionId: null },
    { name: 'Experience', path: '/experience', sectionId: null },
    { name: 'Contact', path: '/contact', sectionId: null },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          Haris Suresh
        </Link>
        
        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index}>
              {item.path === '/' ? (
                <button
                  onClick={() => handleNavClick(item.path, item.sectionId)}
                  className="nav-link-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    padding: '0',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent-pink)'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  {item.name}
                </button>
              ) : (
                <Link 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    textDecoration: 'none', 
                    color: 'white',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent-pink)'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;