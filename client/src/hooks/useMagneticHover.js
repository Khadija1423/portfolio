import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMagneticHover = (strength = 0.3) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const moveX = (clientX - centerX) * strength;
            const moveY = (clientY - centerY) * strength;

            gsap.to(el, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return elementRef;
};
