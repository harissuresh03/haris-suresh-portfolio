import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { usePixelTransition } from './PixelTransition';

// Floating, pill-shaped nav fixed to the top of the viewport — inspired by
// seanhalpin.xyz. Shrinks slightly on scroll, tracks which in-page section
// is active with a sliding pill indicator, and collapses to a single menu
// button on mobile.

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const goToProject = usePixelTransition();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (onHome) {
        let current = 'about';
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= 160) current = s.id;
        }
        setActive(current);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  const goToSection = (id) => {
    setMobileOpen(false);
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Leaving the projects area back to home — plays the same pixel
      // curtain used going the other direction, per the brief.
      goToProject('/', navigate, { scrollTo: id });
    }
  };

  return (
    <motion.header
      className={`float-nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="float-nav-pill">
        <Link
          to="/"
          className="float-nav-brand"
          onClick={(e) => {
            setMobileOpen(false);
            if (!onHome) {
              e.preventDefault();
              goToProject('/', navigate);
            }
          }}
        >
          Haris Suresh
        </Link>

        <nav className="float-nav-links">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`float-nav-link ${onHome && active === s.id ? 'active' : ''}`}
              onClick={() => goToSection(s.id)}
            >
              {s.label}
              {onHome && active === s.id && (
                <motion.span layoutId="float-nav-indicator" className="float-nav-indicator" />
              )}
            </button>
          ))}
          <Link
            to="/projects"
            className={`float-nav-link ${location.pathname.startsWith('/project') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              goToProject('/projects', navigate);
            }}
          >
            Projects
          </Link>
        </nav>

        <div className="float-nav-actions">
          <ThemeToggle />
          <button
            className="float-nav-burger"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          className="float-nav-mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => goToSection(s.id)}>{s.label}</button>
          ))}
          <Link to="/projects" onClick={(e) => { e.preventDefault(); goToProject('/projects', navigate); }}>Projects</Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default FloatingNav;
