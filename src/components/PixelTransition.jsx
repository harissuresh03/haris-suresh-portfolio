import React, { createContext, useContext, useRef, useState } from 'react';

// Provides a `goTo(path, navigate)` function that plays a staggered pixel
// wipe over the screen, swaps the route underneath it, then wipes back
// away. Used specifically for navigations into /projects and /project/:id
// per the brief ("page transition like pixels... when user clicks projects").
const PixelContext = createContext((path, navigate) => navigate(path));

export const usePixelTransition = () => useContext(PixelContext);

const COLS = 12;
const ROWS = 7;
const STEP_MS = 6;
const TRANSITION_MS = 260;
const COVER_DURATION = COLS * ROWS * STEP_MS + TRANSITION_MS;

const PixelTransitionProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const busyRef = useRef(false);

  const goTo = (path, navigate, state) => {
    if (busyRef.current) {
      navigate(path, state ? { state } : undefined);
      return;
    }
    busyRef.current = true;
    setVisible(true);

    setTimeout(() => {
      navigate(path, state ? { state } : undefined);
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        setVisible(false);
        setTimeout(() => {
          busyRef.current = false;
        }, COVER_DURATION);
      });
    }, COVER_DURATION);
  };

  const cells = Array.from({ length: COLS * ROWS });

  return (
    <PixelContext.Provider value={goTo}>
      {children}
      <div
        className={`pixel-curtain ${visible ? 'show' : ''}`}
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
        aria-hidden="true"
      >
        {cells.map((_, i) => (
          <span key={i} className="pixel-curtain-cell" style={{ transitionDelay: `${i * STEP_MS}ms` }} />
        ))}
      </div>
    </PixelContext.Provider>
  );
};

export default PixelTransitionProvider;
