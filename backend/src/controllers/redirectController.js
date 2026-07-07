// Redirect controller — lookup shortCode, record click, 302 redirect

// GET /:code
const handleRedirect = async (req, res, next) => {
  res.status(501).json({ message: 'handleRedirect — not implemented' });
};

module.exports = { handleRedirect };
