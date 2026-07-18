import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (('ontouchstart' in window) || navigator.maxTouchPoints > 0) {
        return;
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for highly performant follower logic
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const onMouseMove = (e) => {
      // Center the cursor dot exactly on the mouse coordinates
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    // Hover effects logic
    const handleMouseEnter = () => {
        gsap.to(cursor, {
            scale: 2.5,
            backgroundColor: 'rgba(184, 97, 63, 0.4)', // Warm neutral accent semi-transparent
            border: 'none',
            duration: 0.2
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'transparent',
            border: '2px solid rgba(58, 52, 42, 0.8)', // Warm neutral border
            duration: 0.2
        });
    };

    const attachHoverListeners = () => {
        const interactables = document.querySelectorAll('a, button, .neo-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
    };

    // Initial attachment
    attachHoverListeners();

    // Since React Router might swap DOM elements, we use a MutationObserver
    // to re-attach listeners when new interactive elements are added.
    const observer = new MutationObserver((mutations) => {
        let shouldReattach = false;
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                shouldReattach = true;
            }
        });
        if (shouldReattach) attachHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const interactables = document.querySelectorAll('a, button, .neo-card');
      interactables.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ border: '2px solid rgba(58, 52, 42, 0.8)' }}
    />
  );
};

export default CustomCursor;
