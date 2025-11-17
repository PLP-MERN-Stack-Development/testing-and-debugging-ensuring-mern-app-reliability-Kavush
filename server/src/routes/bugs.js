const express = require('express');
const router = express.Router();

// GET /api/bugs - Get all bugs
router.get('/', async (req, res) => {
  try {
    console.log('📨 GET /api/bugs - Fetching bugs');
    
    // Mock data for now
    const bugs = [
      {
        _id: '1',
        title: 'Login button not working',
        description: 'The login button does nothing when clicked',
        status: 'open',
        priority: 'high',
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Mobile responsive issue',
        description: 'Layout breaks on mobile devices',
        status: 'in-progress', 
        priority: 'medium',
        createdAt: new Date().toISOString()
      }
    ];
    
    console.log(`✅ Returning ${bugs.length} bugs`);
    
    res.json(bugs);
  } catch (error) {
    console.error('❌ Error fetching bugs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch bugs'
    });
  }
});

// POST /api/bugs - Create new bug
router.post('/', async (req, res) => {
  try {
    console.log('📨 POST /api/bugs - Creating bug:', req.body);
    
    const newBug = {
      _id: Date.now().toString(),
      ...req.body,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({
      message: 'Bug created successfully',
      bug: newBug
    });
  } catch (error) {
    console.error('❌ Error creating bug:', error);
    res.status(500).json({ 
      error: 'Failed to create bug'
    });
  }
});

module.exports = router;