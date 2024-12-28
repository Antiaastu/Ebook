const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    if (!user._id || !user.role) {
        console.error('Missing user ID or role in token generation');
        throw new Error('User ID and role are required for token generation');
    }
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

module.exports = generateToken;
