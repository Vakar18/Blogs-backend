const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, location } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ name, email, password: hashedPassword, location });
    await newUser.save();
    res.status(201).json({ message: 'User created', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};
