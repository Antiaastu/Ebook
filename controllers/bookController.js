const Book = require('../models/Book');
const path = require('path');
// const mongoose = require('mongoose');
// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new book (Admin only)
const addBook = async (req, res) => {
    try {
        const { title, author, description, image, fileUrl } = req.body;
        const book = await Book.create({ title, author, description, image, fileUrl });
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Download book file
const downloadBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const filePath = path.join(__dirname, '..', book.fileUrl);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBooks, addBook, downloadBook };
