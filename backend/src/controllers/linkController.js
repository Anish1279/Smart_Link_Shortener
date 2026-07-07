// Link controller — create, list, and analytics
const Link = require('../models/Link');
const ClickEvent = require('../models/ClickEvent');
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
  try {
    const { id } = req.params;
    const { range = 'all' } = req.query;

    const link = await Link.findOne({ _id: id, ownerId: req.user.id }).select('_id');
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    const rangeMap = {
      '1': 1,
      '7': 7,
      '30': 30,
      '90': 90,
      all: null,
    };

    const sinceDays = rangeMap[range];
    const dateFilter = sinceDays ? { $gte: new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000) } : null;

    const matchStage = { linkId: link._id };
    if (dateFilter) {
      matchStage.timestamp = dateFilter;
    }

    const analytics = await ClickEvent.aggregate([
      // Restrict the dataset to the selected link and the requested date range before any aggregation runs.
      { $match: matchStage },
      {
        $facet: {
          // Count every click event for the selected link.
          totalClicks: [{ $count: 'totalClicks' }],

          // Group clicks by day for the line chart.
          clicksOverTime: [
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                clicks: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, date: '$_id', clicks: 1 } },
          ],

          // Group clicks by referrer and keep the most active sources first.
          topReferrers: [
            {
              $group: {
                _id: { $ifNull: ['$referrer', 'Direct'] },
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1, _id: 1 } },
            { $limit: 5 },
            { $project: { _id: 0, referrer: '$_id', count: 1 } },
          ],

          // Build a browser breakdown from the stored user agent string.
          browserBreakdown: [
            {
              $project: {
                browser: {
                  $switch: {
                    branches: [
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Chrome|CriOS', options: 'i' } },
                        then: 'Chrome',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Firefox|FxiOS', options: 'i' } },
                        then: 'Firefox',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Edg|Edge', options: 'i' } },
                        then: 'Edge',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Safari', options: 'i' } },
                        then: 'Safari',
                      },
                    ],
                    default: 'Other',
                  },
                },
              },
            },
            { $group: { _id: '$browser', count: { $sum: 1 } } },
            { $sort: { count: -1, _id: 1 } },
            { $project: { _id: 0, browser: '$_id', count: 1 } },
          ],

          // Build a device breakdown from the stored user agent string.
          deviceBreakdown: [
            {
              $project: {
                device: {
                  $switch: {
                    branches: [
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'iPad|Tablet|PlayBook', options: 'i' } },
                        then: 'Tablet',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'iPhone|Android|Mobile', options: 'i' } },
                        then: 'Mobile',
                      },
                    ],
                    default: 'Desktop',
                  },
                },
              },
            },
            { $group: { _id: '$device', count: { $sum: 1 } } },
            { $sort: { count: -1, _id: 1 } },
            { $project: { _id: 0, device: '$_id', count: 1 } },
          ],

          // Return the latest click events in a compact format for the activity table.
          recentClicks: [
            { $sort: { timestamp: -1 } },
            { $limit: 10 },
            {
              $project: {
                _id: 0,
                timestamp: 1,
                referrer: { $ifNull: ['$referrer', 'Direct'] },
                browser: {
                  $switch: {
                    branches: [
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Chrome|CriOS', options: 'i' } },
                        then: 'Chrome',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Firefox|FxiOS', options: 'i' } },
                        then: 'Firefox',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Edg|Edge', options: 'i' } },
                        then: 'Edge',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'Safari', options: 'i' } },
                        then: 'Safari',
                      },
                    ],
                    default: 'Other',
                  },
                },
                device: {
                  $switch: {
                    branches: [
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'iPad|Tablet|PlayBook', options: 'i' } },
                        then: 'Tablet',
                      },
                      {
                        case: { $regexMatch: { input: '$userAgent', regex: 'iPhone|Android|Mobile', options: 'i' } },
                        then: 'Mobile',
                      },
                    ],
                    default: 'Desktop',
                  },
                },
                country: { $ifNull: ['$country', 'Unknown'] },
              },
            },
          ],
        },
      },
    ]);

    const [result] = analytics;

    res.status(200).json({
      totalClicks: result.totalClicks[0]?.totalClicks || 0,
      clicksOverTime: result.clicksOverTime || [],
      topReferrers: result.topReferrers || [],
      browserBreakdown: result.browserBreakdown || [],
      deviceBreakdown: result.deviceBreakdown || [],
      recentClicks: result.recentClicks || [],
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/links/click-counts
const getClickCounts = async (req, res, next) => {
  try {
    const links = await Link.find({ ownerId: req.user.id }).select('_id shortCode customAlias clickCount').sort({ createdAt: -1 });
    res.status(200).json(links);
  } catch (error) {
    next(error);
  }
};

module.exports = { createLink, getMyLinks, getLinkAnalytics, getClickCounts };
