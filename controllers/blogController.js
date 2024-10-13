const Blog = require('../models/Blog');

// Get blogs based on user location
exports.getBlogsByLocation = async (req, res) => {
  const location = req.params.location;
  try {
    const blogs = await Blog.find({ location });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

// Create a new blog post
exports.createBlog = async (req, res) => {
  const { title, content, location } = req.body;
  try {
    const newBlog = new Blog({ title, content, author: req.userId, location, published: false });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created', blogId: newBlog._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog' });
  }
};

// Update blog content
exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    Object.assign(blog, req.body);
    await blog.save();
    res.json({ message: 'Blog updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog' });
  }
};
