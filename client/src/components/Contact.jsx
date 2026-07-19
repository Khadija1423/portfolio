import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import socialData from '../../content/social.json';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo('.contact-reveal',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to connect to the server.' });
    }
  };

  return (
    <section className="py-24 border-t-2 border-light-border dark:border-dark-border">
      <div className="contact-reveal">
        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Get In <span className="text-light-accent dark:text-dark-accent">Touch</span></h2>
        <p className="text-lg mb-8 max-w-2xl font-medium text-light-text/80 dark:text-dark-text/80">
          Have a project in mind, or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="contact-reveal neo-card p-8 md:p-12 max-w-3xl">
        {status.success ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border-4 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface min-h-[300px]">
            <CheckCircle2 className="w-16 h-16 text-light-accent dark:text-dark-accent mb-4" />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Message Sent</h3>
            <p className="font-medium text-light-text/80 dark:text-dark-text/80">I'll get back to you shortly.</p>
            <button
                onClick={() => setStatus({ loading: false, success: false, error: '' })}
                className="mt-8 text-sm font-bold uppercase tracking-widest border-b-2 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent hover:opacity-70 transition-opacity"
            >
                Send Another
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Form Side */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold uppercase text-sm tracking-wider">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-4 bg-light-bg dark:bg-dark-bg border-4 border-light-border dark:border-dark-border outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold uppercase text-sm tracking-wider">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-4 bg-light-bg dark:bg-dark-bg border-4 border-light-border dark:border-dark-border outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-bold uppercase text-sm tracking-wider">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="p-4 bg-light-bg dark:bg-dark-bg border-4 border-light-border dark:border-dark-border outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors font-medium"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-bold uppercase text-sm tracking-wider">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="p-4 bg-light-bg dark:bg-dark-bg border-4 border-light-border dark:border-dark-border outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors font-medium resize-y"
              ></textarea>
            </div>

            {status.error && (
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-bold border-2 border-red-600 dark:border-red-400 p-4 bg-red-50 dark:bg-red-950/20">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{status.error}</span>
                </div>
            )}

              <button
                type="submit"
                disabled={status.loading}
                className="mt-4 neo-card bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface p-4 font-bold uppercase tracking-widest text-lg disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {status.loading && (
                    <div className="w-5 h-5 border-4 border-light-surface dark:border-dark-surface border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
                )}
                {status.loading ? 'Sending...' : 'Send it over'}
              </button>
            </form>
            </div>

            {/* Social Links Side */}
            <div className="lg:w-64 flex flex-col gap-6">
              <div className="font-black text-2xl uppercase tracking-tighter border-b-4 border-light-border dark:border-dark-border pb-2 inline-block">
                Or reach me <span className="text-light-accent dark:text-dark-accent">directly</span>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={socialData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-card p-4 flex items-center gap-4 bg-light-surface dark:bg-dark-surface hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors font-bold uppercase tracking-widest text-sm group"
                >
                  <FaLinkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a
                  href={socialData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-card p-4 flex items-center gap-4 bg-light-surface dark:bg-dark-surface hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors font-bold uppercase tracking-widest text-sm group"
                >
                  <FaGithub className="w-5 h-5" /> GitHub
                </a>
                <a
                  href={`mailto:${socialData.email}`}
                  className="neo-card p-4 flex items-center gap-4 bg-light-surface dark:bg-dark-surface hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-surface dark:hover:text-dark-surface transition-colors font-bold uppercase tracking-widest text-sm group"
                >
                  <Mail className="w-5 h-5" /> Email
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
