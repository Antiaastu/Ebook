const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true }, // URL for the book cover image
    fileUrl: { type: String, required: true } // URL for downloading the ebook
});

module.exports = mongoose.model('Book', bookSchema);
