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
          <h1 className="section-title">My <span className="glow-text">Projects</span></h1>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px', color: 'var(--text-secondary)' }}>
            Explore my portfolio of web and mobile applications, showcasing my skills in full-stack development, 
            UI/UX design, and problem-solving.
          </p>
        </motion.div>

        <div className="grid-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;