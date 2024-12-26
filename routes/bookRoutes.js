const express = require('express');
const { getBooks, addBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware(), getBooks);
router.post('/', authMiddleware('Admin'), addBook);

module.exports = router;
