import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DynamicTime from './DynamicTime';
import skillsData from '../../content/skills.json';
import certificatesData from '../../content/certificates.json';

gsap.registerPlugin(ScrollTrigger);

const AboutBento = () => {
  const container = useRef(null);

  const timelineEvents = [
    { year: '2020', event: 'Started CS Degree' },
    { year: '2021', event: 'Mastered C++ & Java' },
    { year: '2022', event: 'Discovered Web Development' },
    { year: '2023', event: 'Deep Dive into React & Node.js' },
    { year: '2024', event: 'Exploring AI & Machine Learning' },
  ];

  useGSAP(() => {
    // Animate timeline items
    const items = gsap.utils.toArray('.timeline-item');

    items.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="mb-24">
      <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">About <span className="text-light-accent dark:text-dark-accent">Me</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[minmax(180px,auto)]">

        {/* Card A: Who I Am (Spans 2 columns) */}
        <div className="neo-card p-8 md:col-span-2 row-span-2 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 uppercase border-b-2 border-light-border dark:border-dark-border pb-2 inline-block">The Editorial Intro</h3>
          <p className="text-lg leading-relaxed mb-4">
            I am a passionate Computer Science student dedicated to crafting elegant solutions to complex problems. My journey spans from low-level systems programming to designing highly interactive, modern web applications.
          </p>
          <p className="text-lg leading-relaxed text-light-accent dark:text-dark-accent font-medium mt-auto">
            My goal is to bridge the gap between robust backend architectures and seamless, beautiful user experiences while continuously pushing the boundaries of what's possible with AI.
          </p>
        </div>

        {/* Card D: Status Badge */}
        <div className="neo-card p-6 flex flex-col items-center justify-center text-center bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface">
          <div className="flex items-center space-x-2 font-bold uppercase tracking-widest text-sm mb-2">
             <div className="w-3 h-3 rounded-full bg-light-surface dark:bg-dark-surface animate-pulse"></div>
             <span>Availability</span>
          </div>
          <p className="text-xl font-black">Open for Opportunities</p>
        </div>

        {/* Card C: Dynamic Local Time */}
        <div className="neo-card p-6 flex flex-col items-center justify-center text-center">
            <p className="font-bold uppercase tracking-widest text-sm mb-2 text-gray-500 dark:text-gray-400">Local Time</p>
            <DynamicTime />
        </div>

        {/* Card B: Interactive Timeline (Spans full width on mobile, 3 cols on md) */}
        <div className="neo-card p-8 md:col-span-3">
            <h3 className="text-2xl font-bold mb-8 uppercase">My Journey</h3>

            <div className="relative border-l-4 border-light-accent dark:border-dark-accent ml-4 space-y-8">
                {timelineEvents.map((item, index) => (
                    <div key={index} className="timeline-item relative pl-8">
                        <div className="absolute w-4 h-4 rounded-full bg-light-bg dark:bg-dark-bg border-4 border-light-accent dark:border-dark-accent -left-[10px] top-1.5"></div>
                        <h4 className="text-xl font-black text-light-accent dark:text-dark-accent">{item.year}</h4>
                        <p className="text-lg font-medium">{item.event}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Skills Section */}
        <div className="neo-card p-8 md:col-span-3">
            <h3 className="text-2xl font-bold mb-6 uppercase border-b-2 border-light-border dark:border-dark-border pb-2 inline-block">Top Skills</h3>
            <div className="flex flex-wrap gap-3">
                {skillsData.map((skill) => (
                    <div key={skill.id} className="border-2 border-light-border dark:border-dark-border px-4 py-2 bg-light-bg dark:bg-dark-bg font-bold uppercase text-sm flex items-center gap-2">
                        <span>{skill.name}</span>
                        <span className="text-light-accent dark:text-dark-accent">{skill.level}%</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Certificates Section */}
        <div className="neo-card p-8 md:col-span-3">
            <h3 className="text-2xl font-bold mb-6 uppercase border-b-2 border-light-border dark:border-dark-border pb-2 inline-block">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificatesData.map((cert) => (
                    <a key={cert.id} href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-light-border dark:border-dark-border p-4 hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-black transition-colors block">
                        <h4 className="font-bold text-lg mb-1">{cert.title}</h4>
                        <p className="text-sm font-medium">{cert.issuer} • {cert.issueDate}</p>
                    </a>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutBento;
