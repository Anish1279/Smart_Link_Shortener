// JWT auth middleware — verify token, attach user to req
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('Error in auth middleware:', err);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
=======

const protect = async (req, res, next) => {
  res.status(501).json({ message: 'auth middleware — not implemented' });
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
};

module.exports = { protect };
