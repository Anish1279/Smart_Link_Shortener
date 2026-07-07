// JWT auth middleware — verify token, attach user to req

const protect = async (req, res, next) => {
  res.status(501).json({ message: 'auth middleware — not implemented' });
};

module.exports = { protect };
