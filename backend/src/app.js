// Express app — middleware stack + route mounting
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global middleware
app.use(helmet());
app.use(cors({
  origin:  'http://localhost:3000',
  credentials: true,
}));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/', redirectRoutes); // Must be last — /:code is a wildcard

// Error handler (must be after all routes)
app.use(errorHandler);

module.exports = app;
