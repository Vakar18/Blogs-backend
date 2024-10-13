const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI, // MongoDB connection URI
  JWT_SECRET: process.env.JWT_SECRET, // JWT secret key for token signing
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID, // Razorpay key (optional, if using Razorpay)
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET, // Razorpay secret (optional, if using Razorpay)
};
