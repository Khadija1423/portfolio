import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import projectsData from '../../content/projects.json';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) return <div className="py-20 text-center font-bold text-xl">Loading...</div>;

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <Link to="/projects" className="inline-flex items-center space-x-2 font-bold hover:text-light-accent dark:hover:text-dark-accent mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span>BACK TO PROJECTS</span>
      </Link>

      <div className="border-4 border-light-border dark:border-dark-border p-8 md:p-12 bg-white dark:bg-black mb-12 relative shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] dark:shadow-[8px_8px_0px_0px_rgba(51,51,51,1)]">

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
                <span className="text-sm font-bold uppercase tracking-widest text-light-accent dark:text-dark-accent block mb-2">
                {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                {project.title}
                </h1>
            </div>

            <div className="flex flex-col gap-3 min-w-[140px]">
                <a href={project.liveUrl} className="border-2 border-light-border dark:border-dark-border py-3 px-6 text-center font-bold uppercase text-sm bg-light-accent dark:bg-dark-accent text-white dark:text-black hover:opacity-80 transition-opacity">
                    Live Demo
                </a>
                <a href={project.githubUrl} className="border-2 border-light-border dark:border-dark-border py-3 px-6 text-center font-bold uppercase text-sm bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity">
                    View Code
                </a>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b-2 border-dashed border-light-border/30 dark:border-dark-border/30">
            {project.technologies?.map((tech, index) => (
                <span key={index} className="text-sm font-bold uppercase tracking-wider bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border px-3 py-1">
                    {tech}
                </span>
            ))}
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-light-accent dark:prose-a:text-dark-accent">

            {project.description && (
                <div className="mb-12">
                    <h2 className="text-3xl border-l-4 border-light-accent dark:border-dark-accent pl-4 mb-4">Description</h2>
                    <ReactMarkdown>{project.description}</ReactMarkdown>
                </div>
            )}

            {project.features && (
                <div className="mb-12">
                    <h2 className="text-3xl border-l-4 border-light-accent dark:border-dark-accent pl-4 mb-4">Key Features</h2>
                    <ReactMarkdown>{project.features}</ReactMarkdown>
                </div>
            )}

            {project.architecture && (
                <div className="mb-12">
                    <h2 className="text-3xl border-l-4 border-light-accent dark:border-dark-accent pl-4 mb-4">Architecture</h2>
                    <ReactMarkdown>{project.architecture}</ReactMarkdown>
                </div>
            )}

            {project.challenges && (
                <div className="mb-12">
                    <h2 className="text-3xl border-l-4 border-light-accent dark:border-dark-accent pl-4 mb-4">Challenges</h2>
                    <ReactMarkdown>{project.challenges}</ReactMarkdown>
                </div>
            )}

            {project.lessonsLearned && (
                <div className="mb-12">
                    <h2 className="text-3xl border-l-4 border-light-accent dark:border-dark-accent pl-4 mb-4">Lessons Learned</h2>
                    <ReactMarkdown>{project.lessonsLearned}</ReactMarkdown>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
