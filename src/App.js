import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import PixelTransitionProvider from './components/PixelTransition';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import { pageTransition } from './lib/animations';
import { ThemeProvider } from './lib/theme';

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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CustomCursor>
        <PixelTransitionProvider>
          <ScrollToTop />
          <AmbientBackground />
          <FloatingNav />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </PixelTransitionProvider>
      </CustomCursor>
    </ThemeProvider>
  );
}

export default App;
