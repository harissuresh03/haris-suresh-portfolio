import React from 'react';

// Mounted once in App.js, sits fixed behind every route (the dot-grid from
// globals.css sits above this, both sit behind all page content). This is
// what used to live only inside the Home hero section — now it's global.
const AmbientBackground = () => (
  <div className="site-ambient-bg" aria-hidden="true">
    <div className="mesh-blob b1" />
    <div className="mesh-blob b2" />
    <div className="mesh-blob b3" />
  </div>
);

export default AmbientBackground;
