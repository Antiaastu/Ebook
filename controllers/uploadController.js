const uploadImage = (req, res) => {
    res.json({ imageUrl: req.file.path });
};

const uploadFile = (req, res) => {
    res.json({ fileUrl: req.file.path });
};

module.exports = { uploadImage, uploadFile };
