const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    enum: ['Languages', 'Backend', 'Frontend', 'Tools'],
    required: true,
  },
  displayOrder: {
    type: Number,
  },
});

module.exports = mongoose.model('Skill', skillSchema);
