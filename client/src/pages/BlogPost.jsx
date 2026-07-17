import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Consistent dark theme for code blocks
import { ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();

  // Mock Data
  const [post, setPost] = useState({
    title: 'Mastering the Neo-Brutalist Web Aesthetic',
    date: 'Oct 24, 2024',
    readTime: 5,
    tags: ['Design', 'CSS'],
    views: 1240,
    content: `
Neo-brutalism is a reaction to the overly-polished, sterile corporate memphis style that dominated the 2010s. It embraces rawness, stark contrasts, and intentional "ugliness" that actually demands high design skill to pull off.

## Core Tenets

1.  **High Contrast:** Use pure blacks, pure whites, and highly saturated primary colors.
2.  **Visible Borders:** Don't hide the boundaries. Draw thick black lines around cards, inputs, and sections.
3.  **Hard Shadows:** Avoid soft blurs. Drop shadows should be solid blocks of color offset from the element.

Here is an example of how you can create a Neo-brutalist card using Tailwind CSS:

\`\`\`css
/* index.css */
@layer components {
  .neo-card {
    @apply border-2 border-black bg-white transition-transform cursor-pointer;
    box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
  }

  .neo-card:hover {
    @apply -translate-y-1 translate-x-1;
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
}
\`\`\`

\`\`\`jsx
// Component.jsx
<div className="neo-card p-6">
  <h2 className="text-2xl font-black uppercase">Bold Header</h2>
  <p>Don't be afraid to make a statement.</p>
</div>
\`\`\`

Notice how the hover effect translates the element up and left while extending the shadow down and right. This creates a tactile, physical "pressing" effect that feels very responsive.
    `
  });

  if (!post) return <div className="py-20 text-center font-bold">Loading...</div>;

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <Link to="/blog" className="inline-flex items-center space-x-2 font-bold hover:text-light-accent dark:hover:text-dark-accent mb-12 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span>BACK TO LOG</span>
      </Link>

      <header className="mb-12 pb-8 border-b-4 border-light-border dark:border-dark-border">
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-widest uppercase mb-6 text-gray-500 dark:text-gray-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span>{post.views.toLocaleString()} views</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex gap-3 text-light-accent dark:text-dark-accent font-bold">
            {post.tags.map(tag => (
            <span key={tag}>#{tag.toLowerCase()}</span>
            ))}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose dark:prose-invert prose-lg md:prose-xl max-w-none
                          prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                          prose-a:text-light-accent dark:prose-a:text-dark-accent prose-a:font-bold
                          prose-pre:bg-gray-900 prose-pre:border-2 prose-pre:border-light-border dark:prose-pre:border-dark-border prose-pre:rounded-none">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </article>

    </div>
  );
};

export default BlogPost;
