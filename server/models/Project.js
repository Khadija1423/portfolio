const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  galleryUrls: [{
    type: String,
  }],
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  technologies: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['Frontend', 'Full-stack', 'AI/ML', 'Other'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);
