console.log('🔍 Starting debug script...');

// Test 1: Basic console log
console.log('✅ Basic console.log works');

// Test 2: Check if file is being executed
console.log('✅ Script is running');

// Test 3: Test require statements one by one
try {
  console.log('🔄 Testing express...');
  const express = require('express');
  console.log('✅ Express loaded successfully');
} catch (e) {
  console.error('❌ Express load failed:', e.message);
  process.exit(1);
}

try {
  console.log('🔄 Testing cors...');
  const cors = require('cors');
  console.log('✅ CORS loaded successfully');
} catch (e) {
  console.error('❌ CORS load failed:', e.message);
  process.exit(1);
}

try {
  console.log('🔄 Testing helmet...');
  const helmet = require('helmet');
  console.log('✅ Helmet loaded successfully');
} catch (e) {
  console.error('❌ Helmet load failed:', e.message);
  process.exit(1);
}

try {
  console.log('🔄 Testing morgan...');
  const morgan = require('morgan');
  console.log('✅ Morgan loaded successfully');
} catch (e) {
  console.error('❌ Morgan load failed:', e.message);
  process.exit(1);
}

// Test 4: Create minimal server
console.log('🔄 Creating minimal server...');
const app = require('express')();
const PORT = 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Debug server working!' });
});

console.log('🔄 Starting server...');
const server = app.listen(PORT, () => {
  console.log('🎉 DEBUG SERVER SUCCESS!');
  console.log(`📍 http://localhost:${PORT}`);
  console.log('⏰ Server started at:', new Date().toISOString());
});

// Keep alive
const keepAlive = setInterval(() => {
  console.log('💓 Server heartbeat:', new Date().toISOString());
}, 30000);

// Handle shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down debug server...');
  clearInterval(keepAlive);
  server.close();
  process.exit(0);
});

console.log('🔍 Debug script completed setup');