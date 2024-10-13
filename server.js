const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./config');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

// Initialize express app
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB connection error:', err));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// Default route to ensure server is running
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Set the port
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
