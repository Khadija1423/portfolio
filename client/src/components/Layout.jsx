import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMagneticHover } from '../hooks/useMagneticHover';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const magNav1 = useMagneticHover(0.2);
  const magNav2 = useMagneticHover(0.2);
  const magNav3 = useMagneticHover(0.2);
  const magNav4 = useMagneticHover(0.2);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
        navigate(`/#${id}`);
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${id}`);
    }
  };

  useEffect(() => {
    // Check initial preference from localStorage or OS
    const storedPreference = localStorage.getItem('theme');
    if (storedPreference === 'dark' || (!storedPreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Handle hash routing cross-page and initial loads
    if (location.hash) {
      const id = location.hash.substring(1); // remove the '#'
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash, location.pathname]);

  const toggleTheme = () => {
    // We already have a CSS transition on the body for colors, so toggling the class
    // naturally crossfades the background/text. We'll use GSAP here to animate the
    // icon itself for a little extra polish.
    setIsDark(!isDark);

    gsap.fromTo('.theme-icon',
        { rotation: -180, scale: 0.5, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', clearProps: 'all' }
    );

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
            Khadija Rehman
          </Link>

          <nav className="hidden md:flex space-x-8 font-medium">
            <button
              ref={magNav2}
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-light-accent dark:hover:text-dark-accent transition-colors inline-block uppercase font-bold"
            >
              About
            </button>
            <button
              ref={magNav3}
              onClick={(e) => handleNavClick(e, 'skills')}
              className="hover:text-light-accent dark:hover:text-dark-accent transition-colors inline-block uppercase font-bold"
            >
              Skills
            </button>
            <button
              ref={magNav1}
              onClick={(e) => handleNavClick(e, 'projects')}
              className="hover:text-light-accent dark:hover:text-dark-accent transition-colors inline-block uppercase font-bold"
            >
              Work
            </button>
            <button
              ref={magNav4}
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-light-accent dark:hover:text-dark-accent transition-colors inline-block uppercase font-bold"
            >
              Contact
            </button>
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface rounded-none neo-card-button transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? (
               <Sun className="theme-icon w-5 h-5 text-dark-accent" />
            ) : (
               <Moon className="theme-icon w-5 h-5 text-light-accent" />
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
             © {new Date().getFullYear()} Khadija Rehman. All rights reserved.
          </div>
      </footer>
    </div>
  );
};

export default Layout;
