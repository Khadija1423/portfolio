import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Mock data
  const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'Mastering the Neo-Brutalist Web Aesthetic',
      date: 'Oct 24, 2024',
      readTime: 5,
      tags: ['Design', 'CSS'],
      views: 1240
    },
    {
      _id: '2',
      title: 'Why I Prefer Postgres over MongoDB for High-Relational Data',
      date: 'Sep 12, 2024',
      readTime: 8,
      tags: ['Database', 'Backend'],
      views: 890
    },
    {
      _id: '3',
      title: 'A Deep Dive into React Server Components',
      date: 'Aug 05, 2024',
      readTime: 12,
      tags: ['React', 'Frontend'],
      views: 3105
    }
  ]);

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 border-b-4 border-light-border dark:border-dark-border pb-4 inline-block">
        The <span className="text-light-accent dark:text-dark-accent">Log</span>
      </h1>
      <p className="text-xl font-medium mb-16 max-w-2xl text-gray-600 dark:text-gray-400">
        Notes, tutorials, and musings on software engineering, design, and building things that matter.
      </p>

      <div className="flex flex-col border-t-4 border-light-border dark:border-dark-border">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post._id}`}
            className="group py-8 border-b-2 border-light-border dark:border-dark-border flex flex-col md:flex-row md:items-baseline gap-4 hover:bg-white dark:hover:bg-black transition-colors px-4 -mx-4"
          >
            <div className="w-full md:w-32 flex-shrink-0 text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
              {post.date}
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-black mb-2 group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
                {post.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border px-2 py-1">
                  {post.readTime} min read
                </span>

                <div className="flex gap-2 text-light-accent dark:text-dark-accent font-bold">
                  {post.tags.map(tag => (
                    <span key={tag}>#{tag.toLowerCase()}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex text-sm font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
               {post.views.toLocaleString()} views
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
