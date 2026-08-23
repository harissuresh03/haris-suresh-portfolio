import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Lightweight context so any component can say "while I'm hovered, the
// cursor should say X" or "show this image" without prop-drilling.
const CursorContext = createContext(() => {});

export const useCustomCursor = () => useContext(CursorContext);

const CustomCursor = ({ children }) => {
  const [cursorState, setCursorState] = useState(null); // { label } | { image } | null
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Tight dot + a laggier outer ring — the lag between the two is what
  // gives the cursor a bit of physical weight instead of feeling like a
  // single flat marker glued to the pointer.
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsTouch(!finePointer);
    if (!finePointer) return undefined;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  const setCursor = (next) => setCursorState(next);

  if (isTouch) {
    return <CursorContext.Provider value={() => {}}>{children}</CursorContext.Provider>;
  }

  const isLabel = !!cursorState?.label;
  const isImage = !!cursorState?.image;
  const isActive = isLabel || isImage;

  return (
    <CursorContext.Provider value={setCursor}>
      {children}

      {/* Inner dot — hides once the ring takes over for a label/image state */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.4 : 1 }}
        transition={{ duration: 0.18 }}
      />

      {/* Outer ring — morphs from a plain circle into a pill/image chip */}
      <motion.div
        className={`cursor-ring ${isLabel ? 'mode-label' : ''} ${isImage ? 'mode-image' : ''}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isImage ? 220 : isLabel ? 'auto' : 34,
          height: isImage ? 220 : isLabel ? 66 : 34,
          paddingLeft: isLabel ? 30 : 0,
          paddingRight: isLabel ? 30 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        {isLabel && <span className="cursor-label">{cursorState.label}</span>}
        {isImage && <img src={cursorState.image} alt="" />}
      </motion.div>
    </CursorContext.Provider>
  );
};

// Convenience wrapper: <CursorTarget label="Hi"> or <CursorTarget image={src}>
export const CursorTarget = ({ label, image, as: Component = 'div', className, children, ...rest }) => {
  const setCursor = useCustomCursor();
  const ref = useRef(null);

  return (
    <Component
      ref={ref}
      className={className}
      onMouseEnter={() => setCursor(image ? { image } : { label })}
      onMouseLeave={() => setCursor(null)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CustomCursor;