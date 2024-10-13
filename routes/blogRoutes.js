const express = require('express');
const { getBlogsByLocation, createBlog , updateBlog } = require('../controllers/blogController');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');

// Get blogs by location
router.get('/:location', getBlogsByLocation );

// Create blog (protected route)
router.post('/',authenticateUser, createBlog);

// Update a blog (protected route)
router.put('/:id', authenticateUser, updateBlog);

module.exports = router;
