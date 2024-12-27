const express = require('express');
const { getBooks, addBook, downloadBook} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', authMiddleware(), getBooks);
router.post('/', authMiddleware('Admin'), upload.fields([{ name: 'image' }, { name: 'file' }]) ,addBook);
router.get('/download/:id', authMiddleware(), downloadBook);
module.exports = router;
