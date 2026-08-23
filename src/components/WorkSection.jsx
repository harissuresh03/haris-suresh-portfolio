import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { fadeUp, revealProps } from '../lib/animations';
import { projects } from '../data/projectsData';
import ProjectCard from './ProjectCard';
import { usePixelTransition } from './PixelTransition';

const FILTERS = ['All', 'Web', 'Mobile', 'Desktop'];

const WorkSection = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const goToProjects = usePixelTransition();

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="work" className="work-section">
      <div className="container">
        <motion.div variants={fadeUp} {...revealProps}>
          <p className="section-eyebrow">work</p>
          <h2 className="section-title">Selected projects</h2>
        </motion.div>

        <motion.div variants={fadeUp} {...revealProps} className="work-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`work-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="work-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="work-empty mono">No {filter.toLowerCase()} projects yet — check back soon.</p>
        )}

        <motion.div variants={fadeUp} {...revealProps} style={{ textAlign: 'center', marginTop: 46 }}>
          <Link
            to="/projects"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            onClick={(e) => { e.preventDefault(); goToProjects('/projects', navigate); }}
          >
            View all projects <FaArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
