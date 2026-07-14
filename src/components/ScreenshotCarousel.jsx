import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Note: this uses plain GSAP (npm install gsap) rather than Motion+'s
// <Carousel> primitive, since Motion+ is a paid add-on behind a private
// registry token. GSAP is a good fit here anyway — it's the right tool
// for a timed, timeline-driven crossfade/scale transition like this one.
const AUTOPLAY_DELAY = 4500;

const ScreenshotCarousel = ({
  images,
  activeIndex,
  onChange,
  getImageSrc,
  getImageCaption,
  onImageClick,
  title,
  autoplay = true,
}) => {
  const slideRefs = useRef([]);
  const prevIndexRef = useRef(activeIndex);
  const timelineRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const hasMultiple = images.length > 1;

  // Initial stacking whenever the image set changes (i.e. a new project)
  useLayoutEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: i === activeIndex ? 1 : 0, scale: 1, xPercent: 0, zIndex: i === activeIndex ? 2 : 1 });
    });
    prevIndexRef.current = activeIndex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // Crossfade + soft scale/slide whenever the active slide changes
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (prev === activeIndex) return undefined;

    const slides = slideRefs.current;
    const currentEl = slides[prev];
    const targetEl = slides[activeIndex];
    if (!currentEl || !targetEl) {
      prevIndexRef.current = activeIndex;
      return undefined;
    }

    const dir = activeIndex > prev ? 1 : -1;
    if (timelineRef.current) timelineRef.current.kill();

    gsap.set(targetEl, { autoAlpha: 0, scale: 1.05, xPercent: dir * 4, zIndex: 2 });
    gsap.set(currentEl, { zIndex: 1 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(currentEl, { autoAlpha: 0, scale: 0.97, duration: 0.55 }, 0)
      .to(targetEl, { autoAlpha: 1, scale: 1, xPercent: 0, duration: 0.7 }, 0.05);

    timelineRef.current = tl;
    prevIndexRef.current = activeIndex;

    return () => tl.kill();
  }, [activeIndex]);

  useEffect(() => () => { if (timelineRef.current) timelineRef.current.kill(); }, []);

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    onChange((activeIndex + 1) % images.length);
  }, [activeIndex, hasMultiple, images.length, onChange]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    onChange((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, hasMultiple, images.length, onChange]);

  // Autoplay — pauses on hover/touch and respects a single project's images
  useEffect(() => {
    if (!autoplay || !hasMultiple || paused) return undefined;
    const id = setInterval(goNext, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [autoplay, hasMultiple, paused, goNext]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
  };

  return (
    <div
      className="shot-viewer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="shot-frame"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => onImageClick(activeIndex)}
        style={{ cursor: 'pointer' }}
      >
        {images.map((img, i) => (
          <div key={i} ref={(el) => (slideRefs.current[i] = el)} className="shot-slide">
            <img
              src={getImageSrc(img)}
              alt={`${title} screenshot ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {hasMultiple && (
          <>
            <button className="shot-nav-btn prev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous screenshot">
              <FaChevronLeft />
            </button>
            <button className="shot-nav-btn next" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next screenshot">
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {getImageCaption(images[activeIndex]) && (
        <div className="shot-caption">{getImageCaption(images[activeIndex])}</div>
      )}
    </div>
  );
};

export default ScreenshotCarousel;
