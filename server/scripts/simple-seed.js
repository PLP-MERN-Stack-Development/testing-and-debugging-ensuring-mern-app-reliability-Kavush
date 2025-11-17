require('dotenv').config();
const mongoose = require('mongoose');

console.log('🌱 Starting simple database seeding...');

// Simple Bug schema for seeding
const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
  project: String,
  createdBy: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
});

const Bug = mongoose.model('Bug', bugSchema);

// Simple User schema for seeding
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

const seedData = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Bug.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Data cleared');

    // Create demo user
    console.log('👤 Creating demo user...');
    const demoUser = await User.create({
      username: 'demo',
      email: 'demo@bugtracker.com',
      password: 'password123',
      role: 'admin'
    });
    console.log('✅ Demo user created:', demoUser._id);

    // Create sample bugs
    console.log('🐛 Creating sample bugs...');
    const sampleBugs = [
      {
        title: 'Login button not working',
        description: 'The login button does nothing when clicked on the homepage',
        status: 'open',
        priority: 'high',
        createdBy: demoUser._id,
        project: 'Website'
      },
      {
        title: 'Mobile responsive issue',
        description: 'Layout breaks on mobile devices below 768px width',
        status: 'in-progress',
        priority: 'medium',
        createdBy: demoUser._id,
        project: 'Mobile App'
      },
      {
        title: 'API timeout error',
        description: 'Some API calls timeout after 30 seconds',
        status: 'open',
        priority: 'critical',
        createdBy: demoUser._id,
        project: 'Backend API'
      }
    ];

    const createdBugs = await Bug.insertMany(sampleBugs);
    console.log(`✅ Created ${createdBugs.length} sample bugs`);

    await mongoose.connection.close();
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();