import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef(null);
  const textRef = useRef(null);

  const statements = [
    'I build modern web applications.',
    'I love solving real-world problems.',
    'Always learning.'
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    statements.forEach((text, index) => {
      // Create a temporary span for each statement
      const span = document.createElement('span');
      span.textContent = text;
      span.className = "absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-black text-center p-8 opacity-0";
      textRef.current.appendChild(span);

      tl.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      .to(span, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in',
        delay: 2 // hold the text for 2 seconds
      });
    });

    // Cleanup function
    return () => {
        if (textRef.current) {
            textRef.current.innerHTML = '';
        }
    }
  }, { scope: container });

  return (
    <section ref={container} className="min-h-[80vh] flex flex-col md:flex-row border-b-2 border-light-border dark:border-dark-border mb-16">
      {/* Left Side: Static Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-light-border dark:border-dark-border bg-white dark:bg-black">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Hi, I'm Khadija
        </h1>
        <p className="text-xl font-medium mb-8 text-light-accent dark:text-dark-accent">
          Computer Science Student | Web Developer | AI Enthusiast
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-auto md:mt-12">
          <button
            className="neo-card px-8 py-4 font-bold uppercase tracking-widest text-sm bg-light-accent dark:bg-dark-accent text-white dark:text-black neo-card-button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            [Hire Me]
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-card px-8 py-4 font-bold uppercase tracking-widest text-sm text-center inline-block bg-white dark:bg-black text-light-text dark:text-dark-text"
          >
            [Download CV]
          </a>
        </div>
      </div>

      {/* Right Side: Animated Panel */}
      <div className="w-full md:w-1/2 relative bg-light-bg dark:bg-dark-bg min-h-[300px] flex items-center justify-center overflow-hidden">
        <div ref={textRef} className="relative w-full h-full flex items-center justify-center">
            {/* GSAP will inject spans here */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
