import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import projectsData from '../../content/projects.json';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const container = useRef(null);
  const [projects] = useState(projectsData);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Full-stack', 'AI/ML', 'Other'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter || p.technologies.includes(filter));

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.project-card');

    // We recreate ScrollTriggers whenever the filter changes
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all' // prevents sticking inline styles that break hover state
        }
      );
    });

  }, { scope: container, dependencies: [filteredProjects] });

  return (
    <section ref={container} className="py-24 mb-16 border-t-2 border-light-border dark:border-dark-border">
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 border-b-4 border-light-border dark:border-dark-border pb-4 inline-block">
        Selected <span className="text-light-accent dark:text-dark-accent">Works</span>
      </h2>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 border-2 border-light-border dark:border-dark-border font-bold uppercase tracking-wider text-sm transition-all duration-200 rounded-none ${
              filter === cat
                ? 'bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface shadow-[4px_4px_0px_0px_#3A342A] dark:shadow-[4px_4px_0px_0px_#463C31] -translate-y-1'
                : 'bg-light-surface dark:bg-dark-surface hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#3A342A] dark:hover:shadow-[4px_4px_0px_0px_#463C31]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card neo-card p-6 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-light-accent dark:text-dark-accent mb-2 block">
                {project.category}
              </span>
              <h2 className="text-2xl font-black mb-2">{project.title}</h2>
              <p className="mb-4 line-clamp-3">{project.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs font-medium border border-light-border dark:border-dark-border px-2 py-1">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2">
              <Link
                to={`/projects/${project.id}`}
                className="col-span-3 text-center border-2 border-light-border dark:border-dark-border py-2 font-bold uppercase text-sm hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors"
              >
                Details
              </Link>
              <button className="col-span-1 border-2 border-light-border dark:border-dark-border py-2 font-bold uppercase text-xs bg-light-text text-light-surface dark:bg-dark-text dark:text-dark-surface hover:opacity-80 transition-opacity">
                Code
              </button>
              <button className="col-span-2 border-2 border-light-border dark:border-dark-border py-2 font-bold uppercase text-xs bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface hover:opacity-80 transition-opacity">
                Live Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
