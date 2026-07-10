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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          haris-suresh
        </Link>

        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index}>
              {item.path === '/' ? (
                <button onClick={() => handleNavClick(item.path, item.sectionId)}>
                  {item.name}
                </button>
              ) : (
                <Link to={item.path} onClick={() => setIsOpen(false)}>
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