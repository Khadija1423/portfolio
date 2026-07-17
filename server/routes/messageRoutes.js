const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');

router.route('/')
  .post(createMessage);

module.exports = router;
