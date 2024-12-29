const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/', (req, res) => {
    res.send('Ebook API is running...');
});
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
