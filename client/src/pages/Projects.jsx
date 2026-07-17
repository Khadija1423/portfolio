import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../../content/projects.json';

const Projects = () => {
  const [projects] = useState(projectsData);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Full-stack', 'AI/ML', 'Other'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter || p.technologies.includes(filter));

  return (
    <div className="py-12">
      <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 border-b-4 border-light-border dark:border-dark-border pb-4 inline-block">
        Selected <span className="text-light-accent dark:text-dark-accent">Works</span>
      </h1>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 border-2 border-light-border dark:border-dark-border font-bold uppercase tracking-wider text-sm transition-all duration-200 rounded-none ${
              filter === cat
                ? 'bg-light-accent dark:bg-dark-accent text-white dark:text-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(51,51,51,1)] -translate-y-1'
                : 'bg-white dark:bg-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(51,51,51,1)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="neo-card p-6 flex flex-col">
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
                className="col-span-3 text-center border-2 border-light-border dark:border-dark-border py-2 font-bold uppercase text-sm hover:bg-light-accent dark:hover:bg-dark-accent hover:text-white dark:hover:text-black transition-colors"
              >
                Details
              </Link>
              <button className="col-span-1 border-2 border-light-border dark:border-dark-border py-2 font-bold uppercase text-xs bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity">
                Code
              </button>
              <button className="col-span-2 border-2 border-light-border dark:border-dark-border py-2 font-bold uppercase text-xs bg-light-accent dark:bg-dark-accent text-white dark:text-black hover:opacity-80 transition-opacity">
                Live Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
