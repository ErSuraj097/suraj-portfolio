const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables manually
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(process.cwd(), '.env.local');
  const envFile = fs.readFileSync(envPath, 'utf8');
  
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.log('Could not load .env.local file');
}

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function initAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists with email:', adminEmail);
      console.log('Role:', existingAdmin.role);
      
      // Update to admin role if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Updated user role to admin');
      }
      
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user
    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');
    console.log('🌐 Access admin panel at: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

initAdmin();