const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../services/cloudinary');

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/images',
    allowed_formats: ['png', 'jpg', 'jpeg', 'webp'],
  },
});

const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/documents',
    allowed_formats: ['pdf'],
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadDocument = multer({ storage: documentStorage });

module.exports = {
  uploadImage,
  uploadDocument,
};
