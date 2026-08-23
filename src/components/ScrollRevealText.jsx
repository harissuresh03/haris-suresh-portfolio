import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Mimics the effect used on Apple product pages: as the paragraph scrolls
// through the viewport, each word brightens from muted to full color in
// sequence — a "typing by scrolling" reveal rather than a blinking cursor.
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress,
    range,
    ['var(--text-tertiary)', 'var(--text-primary)']
  );
  return (
    <motion.span style={{ opacity, color, display: 'inline-block' }}>
      {children}&nbsp;
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default ScrollRevealText;
