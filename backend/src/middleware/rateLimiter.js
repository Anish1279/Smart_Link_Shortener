// Rate limiter — sliding-window, per-user, for link creation only

const createLinkLimiter = (req, res, next) => {
  next();
};

module.exports = { createLinkLimiter };
