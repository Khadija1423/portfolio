import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMagneticHover } from '../hooks/useMagneticHover';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import socialData from '../../content/social.json';

const Hero = () => {
  const container = useRef(null);
  const textRef = useRef(null);
  const magBtn1 = useMagneticHover(0.2);
  const magBtn2 = useMagneticHover(0.2);

  const statements = [
    'Building modern web applications.',
    'Creating intelligent solutions with AI.'
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
    <section ref={container} className="min-h-[80vh] flex flex-col md:flex-row border-b-2 border-light-border dark:border-dark-border">
      {/* Left Side: Static Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-colors">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Hi, I'm Khadija
        </h1>
        <p className="text-xl font-medium mb-8 text-light-accent dark:text-dark-accent">
            Web Developer | AI/ML Engineer
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-auto md:mt-12">
          <button
            ref={magBtn1}
            className="neo-card px-8 py-4 font-bold uppercase tracking-widest text-sm bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface neo-card-button block"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            [View My Work]
          </button>
          <a
            ref={magBtn2}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-card px-8 py-4 font-bold uppercase tracking-widest text-sm text-center inline-block text-light-text dark:text-dark-text"
          >
            [View Résumé]
          </a>
        </div>

        <div className="flex items-center gap-4 mt-8">
            <a href={socialData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 neo-card border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors group">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 neo-card border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors group">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href={`mailto:${socialData.email}`} aria-label="Email" className="p-3 neo-card border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors group">
              <Mail className="w-6 h-6" />
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
