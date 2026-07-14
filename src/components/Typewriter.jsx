import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// A lightweight typewriter effect built on framer-motion (the "motion"
// package). Note: Motion+'s official <Typewriter> component is a paid,
// separately-licensed primitive behind a private registry — this is a
// drop-in equivalent built on the open-source library you already have
// installed, so it works without an extra subscription/token. If you do
// have Motion+, swap this out for their component with the same props.
const Typewriter = ({
  text,
  speed = 65,
  startDelay = 300,
  as: Component = 'span',
  className = '',
  style,
  cursor = true,
  onDone,
}) => {
  const [displayed, setDisplayed] = useState('');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      onDone && onDone();
      return undefined;
    }

    setDisplayed('');
    let i = 0;
    let interval;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone && onDone();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, prefersReducedMotion]);

  return (
    <Component aria-label={text} className={className} style={style}>
      <span aria-hidden="true">{displayed}</span>
      {cursor && (
        <motion.span
          aria-hidden="true"
          className="typewriter-cursor"
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      )}
    </Component>
  );
};

export default Typewriter;
