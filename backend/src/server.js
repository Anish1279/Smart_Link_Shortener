// Entry point — loads env, connects DB, starts server
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

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


