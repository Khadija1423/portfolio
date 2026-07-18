import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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
    <section className="py-24 mb-16">
      <div className="contact-reveal">
        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Get In <span className="text-light-accent dark:text-dark-accent">Touch</span></h2>
        <p className="text-lg mb-8 max-w-2xl font-medium text-light-text/80 dark:text-dark-text/80">
          Have a project in mind, or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="contact-reveal neo-card p-8 md:p-12 max-w-3xl">
        {status.success ? (
          <div className="bg-light-secondary dark:bg-dark-secondary text-white dark:text-black p-6 font-bold text-lg text-center uppercase tracking-widest border-4 border-light-border dark:border-dark-border">
            Message Sent Successfully!
          </div>
        ) : (
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
                <div className="text-red-500 font-bold border-l-4 border-red-500 pl-4 py-2 bg-red-500/10">
                    {status.error}
                </div>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="mt-4 neo-card bg-light-accent dark:bg-dark-accent text-light-surface dark:text-dark-surface p-4 font-bold uppercase tracking-widest text-lg disabled:opacity-50"
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
