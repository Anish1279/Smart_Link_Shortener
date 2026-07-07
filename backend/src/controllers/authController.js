// Auth controller — register + login
<<<<<<< HEAD
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

// POST /api/auth/register
const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: String(fullName).trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      message: 'User registered successfully',
    });
  } catch (err) {
    console.log('Error in register controller:', err);
    return res.status(500).json({ message: 'Server error' });
  }
=======

// POST /api/auth/register
const register = async (req, res, next) => {
  res.status(501).json({ message: 'register — not implemented' });
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
};

// POST /api/auth/login
const login = async (req, res, next) => {
<<<<<<< HEAD
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'User logged in successfully',
    });
  } catch (err) {
    console.log('Error in login controller:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// logout
const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.log('Error in logout controller:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout };
=======
  res.status(501).json({ message: 'login — not implemented' });
};

module.exports = { register, login };
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
