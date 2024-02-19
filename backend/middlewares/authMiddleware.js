const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.header('Authorization');
    if (token) {
        token = token.replace('Bearer ', ''); // Remove the Bearer prefix
    }
    
    console.log('Received token:', token); // Log the received token

    if (!token) {
        console.log('No token provided. Access denied.');
        return res.status(401).json('Access denied');
    }

    try {
        const decoded = jwt.verify(token, '123456');
        console.log('Decoded payload:', decoded); // Log the decoded payload
        req.user_id = decoded.user_id; // Change the property name to user_id
        console.log('User ID extracted from token:', req.user_id); // Log the extracted user ID
        next();
    } catch (error) {
        console.error('Error verifying token:', error); // Log any errors during token verification
        res.status(401).json('Invalid token');
    }
}

module.exports = verifyToken;