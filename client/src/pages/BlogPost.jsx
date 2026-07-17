import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Consistent dark theme for code blocks
import { ArrowLeft } from 'lucide-react';
import blogsData from '../../content/blogs.json';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogsData.find(p => p.id === id);
    if (foundPost) {
        const wordsPerMinute = 200;
        const noOfWords = foundPost.content ? foundPost.content.split(/\s/g).length : 0;
        const readTime = Math.ceil(noOfWords / wordsPerMinute) || 1;

        setPost({
            ...foundPost,
            readTime,
            date: foundPost.date || 'Recent',
            views: Math.floor(Math.random() * 5000) // Mocking view count
        });
    }
  }, [id]);

  if (!post) return <div className="py-20 text-center font-bold text-xl">Loading...</div>;

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
