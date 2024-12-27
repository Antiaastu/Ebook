const express = require('express');
const { uploadImage, uploadFile } = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/image', authMiddleware('Admin'), upload.single('image'), uploadImage);
router.post('/file', authMiddleware('Admin'), upload.single('file'), uploadFile);

module.exports = router;
