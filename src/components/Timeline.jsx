import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealProps } from '../lib/animations';

// Generic vertical timeline. `items` need: title, subtitle, period, and
// either `points` (array of bullet strings) or `detail` (single line).
const Timeline = ({ items }) => {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="timeline-row"
          variants={fadeUp}
          {...revealProps}
          transition={{ delay: i * 0.05 }}
        >
          <div className="timeline-marker">
            <span className="timeline-node" />
            {i !== items.length - 1 && <span className="timeline-line" />}
          </div>

          <div className="timeline-content">
            <span className="timeline-period mono">{it.period}</span>
            <h3 className="timeline-title">{it.title}</h3>
            <p className="timeline-subtitle">{it.subtitle}</p>

            {it.points && (
              <ul className="timeline-points">
                {it.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            )}
            {it.detail && <p className="timeline-detail mono">{it.detail}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
