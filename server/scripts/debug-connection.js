require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Debugging MongoDB Connection...\n');

// Show what's actually in the environment variables
console.log('📋 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 
  process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://USER:PASSWORD@') : 
  'NOT FOUND'
);

const testConnection = async () => {
  try {
    console.log('\n🔄 Attempting to connect...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    // Test connection with detailed options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
    });

    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('📍 Cluster:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    console.log('👤 User:', conn.connection.user);
    
    // Test if we can actually perform operations
    console.log('\n🧪 Testing database operations...');
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('🗂️ Available collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('\n🎉 All tests passed! Your database is ready.');
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED!');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    console.log('\n🔧 Detailed troubleshooting:');
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('💡 This usually means:');
      console.log('   - Network access not configured in MongoDB Atlas');
      console.log('   - Wrong connection string format');
      console.log('   - Cluster is not running');
    } else if (error.name === 'MongooseServerSelectionError') {
      console.log('💡 This usually means:');
      console.log('   - Cannot reach MongoDB Atlas servers');
      console.log('   - Check your internet connection');
      console.log('   - Firewall blocking connection');
    } else if (error.name === 'MongoParseError') {
      console.log('💡 This usually means:');
      console.log('   - Invalid connection string format');
      console.log('   - Special characters in password need URL encoding');
    } else {
      console.log('💡 General connection issue');
    }
    
    console.log('\n📝 Your current connection string:');
    console.log(process.env.MONGODB_URI);
    
    console.log('\n🚀 Quick fixes to try:');
    console.log('1. Go to MongoDB Atlas → Network Access → Add IP Address → "Allow Access from Anywhere"');
    console.log('2. Verify your username and password in the connection string');
    console.log('3. Check if your cluster is in "Paused" state');
    console.log('4. Try using a different network (some corporate networks block MongoDB)');
  }
};

testConnection();