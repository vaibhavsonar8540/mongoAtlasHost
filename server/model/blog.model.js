// models/blog.model.js or similar
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
