import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesTicker from '../components/ServicesTicker';
import SkillsTicker from '../components/SkillsTicker';
import ServicesSection from '../components/ServicesSection';
import WorkSection from '../components/WorkSection';
import ExperienceSection from '../components/ExperienceSection';
import AcademicsSection from '../components/AcademicsSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Supports FloatingNav's cross-page section jumps: navigate('/', { state: { scrollTo: 'work' } })
  useEffect(() => {
    const target = location?.state?.scrollTo;
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);

  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesTicker />
      <SkillsTicker />
      <ServicesSection />
      <WorkSection />
      <ExperienceSection />
      <AcademicsSection />
      <CertificationsSection />
      <ContactSection />
    </>
  );
};

export default Home;