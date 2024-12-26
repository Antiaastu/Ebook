const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debugging line

        if (role && decoded.role !== role) {
            console.log(`Required Role: ${role}, Token Role: ${decoded.role}`);
            return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
