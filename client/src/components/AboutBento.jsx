import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DynamicTime from './DynamicTime';
import skillsData from '../../content/skills.json';
import certificatesData from '../../content/certificates.json';
import siteConfig from '../../content/config.json';

gsap.registerPlugin(ScrollTrigger);

const AboutBento = () => {
  const container = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate Bento Cards
    const bentoCards = gsap.utils.toArray('.bento-reveal');
    bentoCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    });

    // Animate Stat Numbers
    const stats = gsap.utils.toArray('.stat-number');
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      gsap.to(stat, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        innerHTML: target,
        duration: 2,
        ease: 'power3.out',
        snap: { innerHTML: 1 },
        onUpdate: function() {
          stat.innerHTML = Math.ceil(this.targets()[0].innerHTML);
        }
      });
    });

  }, { scope: container });

  // Group skills by category
  const skillsByCategory = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section ref={container} className="py-24 border-t-2 border-light-border dark:border-dark-border">
      <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">About <span className="text-light-accent dark:text-dark-accent">Me</span></h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[minmax(180px,auto)]">

        {/* Card A: Who I Am (Spans 2 columns) */}
        <div className="bento-reveal neo-card p-8 md:col-span-2 row-span-2 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 uppercase border-b-2 border-light-border dark:border-dark-border pb-2 inline-block">The Editorial Intro</h3>
          <p className="text-lg leading-relaxed mb-4">
            I am a passionate Computer Science student dedicated to crafting elegant solutions to complex problems. My journey spans from low-level systems programming to designing highly interactive, modern web applications.
          </p>
          <p className="text-lg leading-relaxed text-light-accent dark:text-dark-accent font-medium mt-auto">
            My goal is to bridge the gap between robust backend architectures and seamless, beautiful user experiences while continuously pushing the boundaries of what's possible with AI.
          </p>
        </div>

        {/* Card D: Status Badge */}
        <div className="bento-reveal neo-card p-6 flex flex-col items-center justify-center text-center bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface">
          <div className="flex items-center space-x-2 font-bold uppercase tracking-widest text-sm mb-2">
             <div className={`w-3 h-3 rounded-full animate-pulse ${siteConfig.availability.color === 'green' ? 'bg-[#39FF14]' : 'bg-light-surface dark:bg-dark-surface'}`}></div>
             <span>Availability</span>
          </div>
          <p className="text-xl font-black">{siteConfig.availability.text}</p>
        </div>

        {/* Card C: Dynamic Local Time & Projects Stat */}
        <div className="bento-reveal neo-card p-6 flex flex-col items-center justify-center text-center">
            <p className="font-bold uppercase tracking-widest text-sm mb-2 text-light-text/60 dark:text-dark-text/60">Local Time</p>
            <DynamicTime />

            <div className="w-full border-t-2 border-light-border dark:border-dark-border my-4"></div>

            <p className="font-bold uppercase tracking-widest text-sm mb-1 text-light-text/60 dark:text-dark-text/60">Projects Built</p>
            <div className="text-4xl font-black text-light-accent dark:text-dark-accent stat-number" data-target="24">0</div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="bento-reveal neo-card p-8 md:col-span-3 skills-container">
            <h3 className="text-2xl font-bold mb-6 uppercase border-b-2 border-light-border dark:border-dark-border pb-2 inline-block">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category} className="flex flex-col gap-3">
                        <h4 className="font-bold uppercase tracking-wider text-sm text-light-accent dark:text-dark-accent mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="px-3 py-1 text-sm font-medium border-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg hover:-translate-y-1 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Certificates Section */}
        <div className="bento-reveal neo-card p-8 md:col-span-3">
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
