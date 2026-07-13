import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import { pageTransition } from './lib/animations';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div {...pageTransition}>
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/project/:id"
          element={
            <motion.div {...pageTransition}>
              <ProjectDetail />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div {...pageTransition}>
              <Contact />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
