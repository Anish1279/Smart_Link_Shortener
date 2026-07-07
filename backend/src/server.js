// Entry point — loads env, connects DB, starts server
<<<<<<< HEAD
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const authRoutes = require('./routes/authRoutes');
=======
const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`[server] Running on port ${PORT}`);
  connectDB();
});


=======
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('[server] Failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
