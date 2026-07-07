// Auth controller — register, login, refresh, logout
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { setTokens, generateAccessToken } = require('../utils/generateToken');
const { registerSchema, loginSchema } = require('../validators/authValidator');

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    // Validate input with Zod
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      return res.status(400).json({ message: errors[0], errors });
    }

    const { fullName, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Issue tokens
    const accessToken = setTokens(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      accessToken,
    });
  } catch (err) {
    console.error('Error in register controller:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    // Validate input with Zod
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      return res.status(400).json({ message: errors[0], errors });
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Issue tokens
    const accessToken = setTokens(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (err) {
    console.error('Error in login controller:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/refresh — issue a new access token using the refresh token cookie
const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const accessToken = generateAccessToken(user._id);

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// POST /api/auth/logout
const logout = async (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Error in logout controller:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, refresh, logout };
