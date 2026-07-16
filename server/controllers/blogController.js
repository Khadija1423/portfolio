const Blog = require('../models/Blog');

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime;
};

const getBlogs = async (req, res) => {
  try {
    const filters = {};

    // Only show published blogs unless an admin is logged in
    if (!req.user) {
        filters.published = true;
    }

    const blogs = await Blog.find(filters).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (!blog.published && !req.user) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, coverImage, tags, published } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const slug = generateSlug(title);
    const readTime = calculateReadTime(content);

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
        return res.status(400).json({ success: false, message: 'Blog with this title already exists' });
    }

    const blog = new Blog({
      title,
      slug,
      content,
      coverImage,
      tags,
      published,
      readTime
    });

    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const updates = req.body;

    if (updates.title) {
        updates.slug = generateSlug(updates.title);
        if (updates.slug !== blog.slug) {
            const existingBlog = await Blog.findOne({ slug: updates.slug });
            if (existingBlog) {
                return res.status(400).json({ success: false, message: 'Blog with this title already exists' });
            }
        }
    }

    if (updates.content) {
        updates.readTime = calculateReadTime(updates.content);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    await blog.deleteOne();
    res.json({ success: true, message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
