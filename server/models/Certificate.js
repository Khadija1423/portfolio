const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  credentialUrl: {
    type: String,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);
