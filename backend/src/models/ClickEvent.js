// ClickEvent model — records each redirect click for analytics
const mongoose = require('mongoose');

const clickEventSchema = new mongoose.Schema(
  {
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link' },
    timestamp: { type: Date, default: Date.now },
    referrer: { type: String, default: null },
    userAgent: { type: String, default: null },
    ipHash: { type: String },
    country: { type: String, default: null },
  },
  { timestamps: false }
);


module.exports = mongoose.model('ClickEvent', clickEventSchema);
