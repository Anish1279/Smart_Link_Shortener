// MongoDB connection
const mongoose = require('mongoose');

const connectDB = async () => {
<<<<<<< HEAD
  if (!process.env.MONGO_URI) {
    console.warn('[db] MONGO_URI not set; skipping database connection. Set it in your .env file to enable auth persistence.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[db] Connection failed: ${error.message}`);
=======
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[db] Connection failed: ${error.message}`);
    process.exit(1);
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
  }
};

module.exports = connectDB;
