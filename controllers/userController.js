const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, location } = req.body;
  
  const hashedPassword = bcrypt.hashSync(password, 10); 
  
  try {
    const newUser = new User({ name, email, password: hashedPassword, location });
    await newUser.save();
    res.status(201).json({ message: 'User created', userId: newUser._id });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = bcrypt.compareSync(password, user.password); 
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error in loginUser:', error); // Log the error
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};
