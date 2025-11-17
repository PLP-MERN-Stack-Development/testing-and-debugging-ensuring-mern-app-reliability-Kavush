require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🧪 Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://USER:PASSWORD@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('📍 Cluster:', mongoose.connection.host);
    console.log('📊 Database:', mongoose.connection.name);
    
    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('🗂️ Collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('✅ Test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ FAILED: Connection test failed!');
    console.error('Error:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your connection string in .env file');
    console.log('2. Verify MongoDB Atlas cluster is running');
    console.log('3. Check network access allows your IP (0.0.0.0/0)');
    console.log('4. Verify database user credentials');
    console.log('5. Check if your password has special characters (may need URL encoding)');
    process.exit(1);
  }
};

testConnection();