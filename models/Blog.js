const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: Array, // For block content (rich text, images, videos)
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: String,
  published: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
