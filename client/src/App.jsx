import React, { useRef } from 'react'
import Layout from './components/Layout'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef();

  useGSAP(() => {
    // Simple introductory animation to verify GSAP works
    gsap.from('.stagger-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <Layout>
      <div ref={container} className="py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 stagger-item">
          Digital <span className="text-light-accent dark:text-dark-accent block">Excellence</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-12 stagger-item">
          We craft neo-brutalist digital experiences that demand attention. Bold typography, stark contrasts, and uncompromising performance.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 stagger-item">
           <div className="neo-card p-8 min-w-64">
              <h3 className="text-2xl font-bold mb-2">Projects</h3>
              <p>Explore our recent work.</p>
           </div>
           <div className="neo-card p-8 min-w-64">
              <h3 className="text-2xl font-bold mb-2">Contact</h3>
              <p>Let's build something bold.</p>
           </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
