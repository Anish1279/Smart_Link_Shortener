// Link model — shortened URLs with optional alias and expiry
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    longUrl: { type: String },
    shortCode: { type: String },
    customAlias: { type: String, default: null },
    expiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Link', linkSchema);
