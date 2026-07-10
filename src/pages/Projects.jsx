import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projectsData';

const Projects = () => {
  return (
    <section style={{ paddingTop: '120px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">portfolio</p>
          <h1 className="section-title">My <span className="glow-text">projects</span></h1>
          <p className="section-subtitle" style={{ maxWidth: '700px' }}>
            A collection of web and mobile applications showcasing full-stack development,
            UI/UX design, and problem-solving.
          </p>
        </motion.div>

        <div className="grid-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;