const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.route('/')
  .get(optionalAuth, getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(optionalAuth, getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
