// Auth controller — register + login

// POST /api/auth/register
const register = async (req, res, next) => {
  res.status(501).json({ message: 'register — not implemented' });
};

// POST /api/auth/login
const login = async (req, res, next) => {
  res.status(501).json({ message: 'login — not implemented' });
};

module.exports = { register, login };
