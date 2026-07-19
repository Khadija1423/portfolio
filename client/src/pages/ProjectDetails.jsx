import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock } from 'lucide-react';
import projectsData from '../../content/projects.json';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SEO from '../components/SEO';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const readingProgressRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === id);
    setProject(foundProject);

    if (foundProject) {
      // Calculate estimated reading time based on total text length
      const textContent = [
        foundProject.description,
        foundProject.features,
        foundProject.architecture,
        foundProject.challenges,
        foundProject.lessonsLearned
      ].filter(Boolean).join(' ');

      const words = textContent.trim().split(/\s+/).length;
      const timeToRead = Math.ceil(words / 200); // 200 words per minute
      setReadingTime(timeToRead);
    }
  }, [id]);

  useGSAP(() => {
    if (!contentRef.current || !readingProgressRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.to(readingProgressRef.current, {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
        end: 'bottom 80%',
        scrub: 0.1,
      }
    });
  }, [project]);

  if (!project) return <div className="py-20 text-center font-bold text-xl">Loading...</div>;

  return (
    <>
      <SEO
        title={project.title}
        description={project.description?.substring(0, 160)}
        type="article"
      />
      <div
        ref={readingProgressRef}
        className="fixed top-1 left-0 h-1.5 w-full bg-light-secondary dark:bg-dark-secondary z-[9998] origin-left scale-x-0"
      />
    <div className="py-12 max-w-4xl mx-auto">
      <Link to="/projects" className="inline-flex items-center space-x-2 font-bold hover:text-light-accent dark:hover:text-dark-accent mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span>BACK TO PROJECTS</span>
      </Link>

      <div className="border-4 border-light-border dark:border-dark-border p-8 md:p-12 bg-light-surface dark:bg-dark-surface mb-12 relative shadow-[8px_8px_0px_0px_#3A342A] dark:shadow-[8px_8px_0px_0px_#463C31]">

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-bold uppercase tracking-widest text-light-accent dark:text-dark-accent">
                    {project.category}
                  </span>
                  {readingTime > 0 && (
                    <span className="flex items-center gap-1 text-sm font-bold opacity-70">
                      <Clock className="w-4 h-4" />
                      {readingTime} MIN READ
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                {project.title}
                </h1>
            </div>

            <div className="flex flex-col gap-3 min-w-[140px]">
                <a href={project.liveUrl} className="border-2 border-light-border dark:border-dark-border py-3 px-6 text-center font-bold uppercase text-sm bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface hover:opacity-80 transition-opacity">
                    Live Demo
                </a>
                <a href={project.githubUrl} className="border-2 border-light-border dark:border-dark-border py-3 px-6 text-center font-bold uppercase text-sm bg-light-text text-light-surface dark:bg-dark-text dark:text-dark-surface hover:opacity-80 transition-opacity">
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

        <div ref={contentRef} className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-light-accent dark:prose-a:text-dark-accent">

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
    </>
  );
};

export default ProjectDetails;
