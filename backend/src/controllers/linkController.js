// Link controller — create, list, analytics
const Link = require('../models/Link');
const { nanoid } = require('nanoid');

// POST /api/links
const createLink = async (req, res, next) => {
  try {
    const { longUrl, customAlias, expiresAt } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: 'longUrl is required' });
    }

    // Basic URL validation
    try {
      new URL(longUrl);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    let finalCode = '';

    if (customAlias) {
      // Check if custom alias is taken
      const existing = await Link.findOne({
        $or: [{ shortCode: customAlias }, { customAlias: customAlias }]
      });
      if (existing) {
        return res.status(400).json({ message: 'Custom alias is already in use' });
      }
      finalCode = customAlias;
    } else {
      // Generate a collision-resistant code
      let isUnique = false;
      while (!isUnique) {
        finalCode = nanoid(8);
        const existing = await Link.findOne({
          $or: [{ shortCode: finalCode }, { customAlias: finalCode }]
        });
        if (!existing) {
          isUnique = true;
        }
      }
    }

    const newLink = await Link.create({
      ownerId: req.user.id,
      longUrl,
      shortCode: finalCode,
      customAlias: customAlias || null,
      expiresAt: expiresAt || null,
    });

    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
};

// GET /api/links
const getMyLinks = async (req, res, next) => {
  try {
    const links = await Link.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(links);
  } catch (error) {
    next(error);
  }
};

// GET /api/links/:id/analytics
const getLinkAnalytics = async (req, res, next) => {
  res.status(501).json({ message: 'Analytics milestone not yet implemented' });
};

module.exports = { createLink, getMyLinks, getLinkAnalytics };
