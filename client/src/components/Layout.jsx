import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Check initial preference from localStorage or OS
    const storedPreference = localStorage.getItem('theme');
    if (storedPreference === 'dark' || (!storedPreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
        lenis.destroy();
        gsap.ticker.remove(updateLenis);
    };
  }, [prefersReducedMotion]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Page Transition
    const ctx = gsap.context(() => {
        gsap.fromTo(mainRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: "all" }
        );
    });

    return () => ctx.revert();
  }, [location.pathname, prefersReducedMotion]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Sticky Glassmorphism Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-light-bg/80 dark:bg-dark-bg/80 border-b-2 border-light-border dark:border-dark-border transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tighter uppercase block">
            <span className="text-light-accent dark:text-dark-accent">Agncy</span> Portfolio
          </Link>

          <nav className="hidden md:flex space-x-8 font-medium">
            <Link to="/projects" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Work</Link>
            <Link to="/blog" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Blog</Link>
            <a href="#contact" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Contact</a>
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface rounded-none neo-card-button transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? (
               <Sun className="w-5 h-5 text-dark-accent" />
            ) : (
               <Moon className="w-5 h-5 text-light-accent" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-light-border dark:border-dark-border py-8 mt-auto">
          <div className="container mx-auto px-4 text-center font-medium">
             © {new Date().getFullYear()} Agency. All rights reserved.
          </div>
      </footer>
    </div>
  );
};

export default Layout;
