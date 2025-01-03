const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, 'uploads/images/');
        } else if (file.fieldname === 'file') {
            cb(null, 'uploads/books/');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;
