// MongoDB connection
const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('[db] MONGO_URI not set; skipping database connection. Set it in your .env file to enable auth persistence.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[db] Connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
