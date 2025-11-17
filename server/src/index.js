require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

console.log('✅ Middleware configured');

// Debug route imports
console.log('🔍 Debugging route imports...');

try {
  console.log('🔄 Importing auth routes...');
  const authRoutes = require('./routes/auth');
  console.log('✅ Auth routes loaded successfully');
  console.log('📊 Auth routes type:', typeof authRoutes);
  console.log('📊 Auth routes constructor:', authRoutes?.constructor?.name);
  console.log('📊 Is authRoutes a function?', typeof authRoutes === 'function');
  console.log('📊 Auth routes keys:', Object.keys(authRoutes));
  
  console.log('🔄 Importing bug routes...');
  const bugRoutes = require('./routes/bugs');
  console.log('✅ Bug routes loaded successfully');
  console.log('📊 Bug routes type:', typeof bugRoutes);
  console.log('📊 Bug routes constructor:', bugRoutes?.constructor?.name);
  console.log('📊 Is bugRoutes a function?', typeof bugRoutes === 'function');
  console.log('📊 Bug routes keys:', Object.keys(bugRoutes));
  
  // Use routes - ONLY ONCE!
  console.log('🔄 Mounting routes...');
  app.use('/api/auth', authRoutes);
  app.use('/api/bugs', bugRoutes);
  
  console.log('✅ All routes mounted successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error);
  process.exit(1);
}

// ⚠️ REMOVE THESE DUPLICATE LINES - THEY CAUSE THE ERROR! ⚠️
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);
// const bugRoutes = require('./routes/bugs');
// app.use('/api/bugs', bugRoutes);

// Basic routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🐛 Bug Tracker Server is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      bugs: {
        list: 'GET /api/bugs',
        create: 'POST /api/bugs'
      }
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    availableRoutes: ['/api/auth/register', '/api/auth/login', '/api/bugs']
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🎉 Bug Tracker Server is RUNNING!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log('🔐 Auth routes: /api/auth/register, /api/auth/login');
  console.log('🐛 Bug routes: /api/bugs');
});