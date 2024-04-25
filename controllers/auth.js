require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const { createHash } = require('crypto');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const passwordHash = createHash('sha256', 'sal').update(password).digest('hex');

  if (passwordHash !== user.password) {
    return res.status(401).json({ message: 'Password incorrect' });
  }
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
