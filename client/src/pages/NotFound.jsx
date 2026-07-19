import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl md:text-9xl font-black text-light-accent dark:text-dark-accent mb-6 tracking-tighter">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 border-b-4 border-light-border dark:border-dark-border pb-4 inline-block">
        Lost in the ether.
      </h2>
      <p className="text-xl font-medium mb-12 max-w-lg text-gray-600 dark:text-gray-400">
        It seems the page you're looking for has been moved, deleted, or never existed in the first place. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="neo-card bg-light-text dark:bg-dark-text text-light-surface dark:text-dark-surface px-8 py-4 font-bold uppercase tracking-widest text-lg hover:bg-light-accent dark:hover:bg-dark-accent transition-colors block"
      >
        Take Me Home
      </Link>
    </div>
  );
};

export default NotFound;
