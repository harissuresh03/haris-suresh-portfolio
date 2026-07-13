import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projectsData';
import { fadeUp, staggerContainer, revealProps } from '../lib/animations';

const Projects = () => {
  const [featuredProject, ...restProjects] = projects;

  return (
    <section style={{ paddingTop: '120px' }}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="section-eyebrow">portfolio</p>
          <h1 className="section-title">My <span className="glow-text">projects</span></h1>
          <p className="section-subtitle" style={{ maxWidth: '700px' }}>
            A collection of web and mobile applications showcasing full-stack development,
            UI/UX design, and problem-solving.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={staggerContainer(0.1)}
          {...revealProps}
        >
          {featuredProject && (
            <motion.div className="bento-item featured" variants={fadeUp}>
              <ProjectCard project={featuredProject} featured />
            </motion.div>
          )}

          {restProjects.map((project) => (
            <motion.div className="bento-item" key={project.id} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
