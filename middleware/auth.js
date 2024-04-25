require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ description: 'Access denied' });
  }

  try {
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ description: 'Invalid token' });
  }
};

module.exports = {
  verifyToken,
};
