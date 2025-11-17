const express = require('express');
const router = express.Router();

console.log('🔐 INITIALIZING AUTH ROUTES...');

// Simple in-memory storage
const users = [];

// 1. Test route
router.get('/test', (req, res) => {
  console.log('✅ GET /api/auth/test called');
  res.json({ 
    success: true, 
    message: 'Auth test route is working!' 
  });
});

// 2. Register route
router.post('/register', (req, res) => {
  try {
    console.log('✅ POST /api/auth/register called');
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required' 
      });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'User already exists' 
      });
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

// 3. Login route
router.post('/login', (req, res) => {
  try {
    console.log('✅ POST /api/auth/login called');
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password required' 
      });
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

// 4. ME ROUTE - THIS WAS MISSING
router.get('/me', (req, res) => {
  console.log('✅ GET /api/auth/me called');
  res.json({
    success: true,
    message: 'Get current user endpoint',
    data: { 
      user: null,
      note: 'Implement authentication to get real user data'
    }
  });
});

// 5. USERS ROUTE - THIS WAS MISSING
router.get('/users', (req, res) => {
  console.log('✅ GET /api/auth/users called');
  res.json({
    success: true,
    data: {
      users: users.map(u => ({ 
        id: u.id, 
        username: u.username, 
        email: u.email 
      }))
    }
  });
});

// ===== DEBUG: Log all registered routes =====
console.log('📋 AUTH ROUTES REGISTERED:');
router.stack.forEach((layer, index) => {
  if (layer.route) {
    const method = Object.keys(layer.route.methods)[0].toUpperCase();
    const path = layer.route.path;
    console.log(`   ${index + 1}. ${method} ${path}`);
  }
});

console.log('✅ AUTH ROUTES INITIALIZATION COMPLETE');

module.exports = router;