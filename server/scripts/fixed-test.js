require('dotenv').config();

const mongoose = require('mongoose');

console.log('🔍 DEBUG: Checking environment...\n');

// Force check if .env is loaded
console.log('📋 ACTUAL Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 'NOT FOUND');

// Check if .env file exists
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env');
console.log('📁 .env file exists:', fs.existsSync(envPath));
if (fs.existsSync(envPath)) {
  console.log('📄 .env file content:');
  console.log(fs.readFileSync(envPath, 'utf8'));
}

console.log('\n🔄 Testing connection with actual string...');

if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost')) {
  console.error('❌ CRITICAL: .env file not loaded or wrong MONGODB_URI!');
  console.log('💡 The connection string should start with: mongodb+srv://');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
  console.log('📍 Cluster:', mongoose.connection.host);
  process.exit(0);
})
.catch(error => {
  console.error('❌ Connection failed:', error.message);
  process.exit(1);
});