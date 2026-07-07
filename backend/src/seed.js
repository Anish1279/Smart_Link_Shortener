// Seed script — creates a test user in the database
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require('./models/User');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[seed] Connected to MongoDB');

    // Clear existing users (optional — remove this line if you want to keep existing data)
    await User.deleteMany({});
    console.log('[seed] Cleared existing users');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    });

    console.log('[seed] Created test user:');
    console.log(`       Email:    test@example.com`);
    console.log(`       Password: password123`);
    console.log(`       ID:       ${testUser._id}`);

    await mongoose.disconnect();
    console.log('[seed] Done.');
    process.exit(0);
  } catch (err) {
    console.error('[seed] Error:', err.message);
    process.exit(1);
  }
};

seedDB();
