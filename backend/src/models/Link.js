// Link model — shortened URLs with optional alias and expiry
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    longUrl: { type: String },
    shortCode: { type: String },
    customAlias: { type: String, default: null },
    expiresAt: { type: Date,index: {
      expires: 0,
    }, default: null },
    isActive: { type: Boolean, default: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Link', linkSchema);
