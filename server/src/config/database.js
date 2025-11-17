const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    // Log the connection string (without password for security)
    const loggableUri = process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://USER:PASSWORD@') : 
      'Not found';
    console.log('📡 Connection:', loggableUri);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Check MONGODB_URI in .env file');
    console.log('   2. Verify MongoDB Atlas network access (0.0.0.0/0)');
    console.log('   3. Check database user credentials');
    console.log('   4. Ensure cluster is running');
    process.exit(1);
  }
};

module.exports = connectDB;