// Redirect controller — lookup shortCode, record click, 302 redirect
const crypto = require('crypto');
const Link = require('../models/Link');
const ClickEvent = require('../models/ClickEvent');

// GET /:code
const handleRedirect = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Find the link by shortCode or customAlias
    const link = await Link.findOne({
      $or: [{ shortCode: code }, { customAlias: code }]
    });

    // Check if link exists and is active
    if (!link || !link.isActive) {
      return res.status(410).send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>410 Gone</h1>
            <p>This link is no longer active or does not exist.</p>
          </body>
        </html>
      `);
    }

    // Check if link has expired
    if (link.expiresAt && new Date() > new Date(link.expiresAt)) {
      return res.status(410).send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>410 Gone</h1>
            <p>This link has expired.</p>
          </body>
        </html>
      `);
    }

    // Fire-and-forget click tracking (do not await, so redirect is fast)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    const userAgent = req.headers['user-agent'] || null;
    const referrer = req.headers['referer'] || req.headers['referrer'] || null; // standard is referer, but handle both

    ClickEvent.create({
      linkId: link._id,
      referrer,
      userAgent,
      ipHash
    }).catch(err => {
      console.error('Failed to log click event:', err);
    });

    // 302 Redirect to long URL (302 forces browsers to hit our server every time)
    res.redirect(302, link.longUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleRedirect };
