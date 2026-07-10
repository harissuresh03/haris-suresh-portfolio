import React from 'react';

/**
 * The neon particle web has been replaced by a subtle CSS dot-grid,
 * defined in globals.css via `body::before`. Keeping this component
 * (rendering null) so existing imports in App.jsx don't break.
 *
 * If you don't use ParticleBackground anywhere else, you can safely
 * remove `react-tsparticles` and `tsparticles-slim` from package.json.
 */
const ParticleBackground = () => null;

export default ParticleBackground;