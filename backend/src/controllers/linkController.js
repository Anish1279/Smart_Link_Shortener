// Link controller — create, list, analytics

// POST /api/links
const createLink = async (req, res, next) => {
  res.status(501).json({ message: 'createLink — not implemented' });
};

// GET /api/links
const getMyLinks = async (req, res, next) => {
  res.status(501).json({ message: 'getMyLinks — not implemented' });
};

// GET /api/links/:id/analytics
const getLinkAnalytics = async (req, res, next) => {
  res.status(501).json({ message: 'getLinkAnalytics — not implemented' });
};

module.exports = { createLink, getMyLinks, getLinkAnalytics };
