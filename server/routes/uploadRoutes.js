const express = require('express');
const router = express.Router();
const { uploadImage, uploadDocument } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/image', protect, uploadImage.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }
  res.json({ url: req.file.path });
});

router.post('/document', protect, uploadDocument.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }
  res.json({ url: req.file.path });
});

module.exports = router;
