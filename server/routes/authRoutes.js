const express = require('express');
const router = express.Router();
const { login, logout, verify } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', protect, verify);

module.exports = router;
