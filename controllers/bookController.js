const Book = require('../models/Book');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with Direct Credentials
cloudinary.config({
    cloud_name: 'djee4j8g6',
    api_key: '383882444675896',
    api_secret: 'fwaN-KvWWbUHtHtdAHnh1jn0PF8',
});

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
        const { title, author, description } = req.body;

        // Upload Image to Cloudinary
        const imageResult = await cloudinary.uploader.upload(req.files['image'][0].path, {
            folder: 'ebook_app/images',
        });

        // Upload File to Cloudinary
        const fileResult = await cloudinary.uploader.upload(req.files['file'][0].path, {
            folder: 'ebook_app/files',
            resource_type: 'raw',
            access_mode: 'public',
        });

        const book = await Book.create({
            title,
            author,
            description,
            image: imageResult.secure_url,
            fileUrl: fileResult.secure_url,
        });

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        console.error('Add Book Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Download book file
const downloadBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Redirect to Cloudinary File URL
        return res.redirect(book.fileUrl);
    } catch (error) {
        console.error('Download Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBooks, addBook, downloadBook };
