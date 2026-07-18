import React from 'react';
import Hero from '../components/Hero';
import AboutBento from '../components/AboutBento';
import Projects from './Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <AboutBento />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
