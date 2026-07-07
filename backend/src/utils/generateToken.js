const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === 'production', // Set to true in production
  });

  return token;
};

module.exports = { generateToken };