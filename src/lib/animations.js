// src/lib/animations.js
//
// Single source of truth for motion across the site. Every section/component
// should import from here instead of writing one-off transitions, so the
// whole product feels like it moves with one consistent hand.
//
// Usage:
//   <motion.div variants={fadeUp} initial="hidden" {...revealProps}>
//   <motion.div variants={staggerContainer()} {...revealProps}>
//     <motion.div variants={staggerItem} />
//   </motion.div>

export const EASE = [0.16, 1, 0.3, 1]; // "expo-out" — the premium decelerate curve

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

// Call as a function so each section can tune its own rhythm:
// variants={staggerContainer(0.08, 0.1)}
export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// Children of a staggerContainer — just fadeUp, aliased for readability
export const staggerItem = fadeUp;

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.25, ease: EASE } },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: EASE } },
  tap: { scale: 0.96 },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.012, transition: { duration: 0.3, ease: EASE } },
};

// Standard scroll-reveal props — trigger once, fire slightly before entering
// the viewport so nothing feels late.
export const revealProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
};

// Route/page transition, used with AnimatePresence in App.js
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } },
};
