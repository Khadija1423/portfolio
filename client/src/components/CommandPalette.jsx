import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import projectsData from '../../content/projects.json';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const baseCommands = [
    { name: 'Home', path: '/' },
    { name: 'About & Skills', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
  ];

  const projectCommands = projectsData.map(p => ({
      name: `Project: ${p.title}`,
      path: `/projects/${p.id}`
  }));

  const commands = [...baseCommands, ...projectCommands];

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle palette with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }

      // Keyboard navigation
      if (isOpen) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            const selected = filteredCommands[selectedIndex];
            if (selected) {
                if (selected.path) {
                    if (selected.path.includes('#')) {
                        // Handle internal anchor links
                        const id = selected.path.split('#')[1];
                        if (window.location.pathname !== '/') {
                             navigate(selected.path); // Navigate home first if we're on a details page
                        } else {
                             document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        navigate(selected.path);
                    }
                } else if (selected.action) {
                    selected.action();
                }
                setIsOpen(false);
            }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, navigate]);

  useEffect(() => {
    // Reset selection when search changes
    setSelectedIndex(0);
  }, [search]);

  // Entrance/Exit Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen && containerRef.current) {
        if (!prefersReducedMotion) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, scale: 0.95, y: -20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' }
            );
        }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm px-4">
      <div
        ref={containerRef}
        className="w-full max-w-2xl bg-light-surface dark:bg-dark-surface border-4 border-light-border dark:border-dark-border shadow-[12px_12px_0px_0px_#3A342A] dark:shadow-[12px_12px_0px_0px_#463C31] flex flex-col"
      >
        <div className="p-4 border-b-2 border-light-border dark:border-dark-border">
            <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-xl font-bold outline-none placeholder-gray-500"
            />
        </div>

        <div className="p-2 max-h-[40vh] overflow-y-auto">
            {filteredCommands.length === 0 ? (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-4 block">🤔</span>
                    <span className="text-lg font-bold uppercase tracking-wider">No matches found for "{search}"</span>
                    <span className="text-sm opacity-60 mt-2 block font-medium">Try searching for "Projects" or "Contact"</span>
                </div>
            ) : (
                filteredCommands.map((cmd, index) => (
                    <div
                        key={cmd.name}
                        onClick={() => {
                            if (cmd.path) {
                                if (cmd.path.includes('#')) {
                                    const id = cmd.path.split('#')[1];
                                    if (window.location.pathname !== '/') {
                                         navigate(cmd.path);
                                    } else {
                                         document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                } else {
                                    navigate(cmd.path);
                                }
                            }
                            if (cmd.action) cmd.action();
                            setIsOpen(false);
                        }}
                        className={`p-4 font-bold text-lg cursor-pointer flex items-center justify-between border-2 border-transparent transition-all ${
                            index === selectedIndex
                                ? 'bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface border-light-border dark:border-dark-border'
                                : 'hover:bg-light-bg dark:hover:bg-dark-bg'
                        }`}
                    >
                        <span>{cmd.name}</span>
                        {index === selectedIndex && <span className="text-xs uppercase tracking-widest opacity-80">Enter ↵</span>}
                    </div>
                ))
            )}
        </div>
        <div className="p-2 border-t-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-xs font-bold uppercase tracking-widest text-center text-light-text/60 dark:text-dark-text/60">
            Use arrows to navigate, Esc to close
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
