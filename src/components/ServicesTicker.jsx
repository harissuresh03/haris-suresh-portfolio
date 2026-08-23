import React from 'react';

// Quick-glance strip of what Haris offers, placed right under the About
// section. Unlike SkillsTicker, this one DOES pause on hover — the two are
// deliberately opposite by request.
const SERVICES_LOOP = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'AI-Integrated Products',
];

const ServicesTicker = () => {
  const loop = [...SERVICES_LOOP, ...SERVICES_LOOP, ...SERVICES_LOOP];

  return (
    <section id="services-ticker" className="services-ticker-section" aria-label="What I offer">
      <div className="services-ticker-track-wrap">
        <div className="services-ticker-track">
          {loop.map((item, i) => (
            <span className="services-ticker-item" key={i}>
              {item}
              <span className="services-ticker-dot" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesTicker;
