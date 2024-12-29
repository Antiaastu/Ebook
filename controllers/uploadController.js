const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with Direct Credentials
cloudinary.config({
    cloud_name: 'djee4j8g6',
    api_key: '383882444675896',
    api_secret: 'fwaN-KvWWbUHtHtdAHnh1jn0PF8',
});

// Upload Image to Cloudinary
const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ebook_app/images',
        });
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error('Image Upload Error:', error.message);
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
};

// Upload File to Cloudinary
const uploadFile = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ebook_app/files',
            resource_type: 'raw',
        });
        res.json({ fileUrl: result.secure_url });
    } catch (error) {
        console.error('File Upload Error:', error.message);
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
};

module.exports = { uploadImage, uploadFile };
