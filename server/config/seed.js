const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdminUser = async () => {
  try {
    // Check if an admin already exists by email
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env to seed an admin user.');
      return;
    }

    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('Admin user already exists. Skipping seeding.');
    } else {
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create new admin user
      const adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
      });

      await adminUser.save();
      console.log('Admin user seeded successfully!');
    }
  } catch (error) {
    console.error(`Error seeding admin user: ${error.message}`);
  }
};

module.exports = seedAdminUser;
