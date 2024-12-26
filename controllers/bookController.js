const Book = require('../models/Book');

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const book = await Book.create({ title, author, description });
        res.status(201).json({message: 'Book created successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getBooks, addBook };
