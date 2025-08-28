const Blog = require("../model/blog.model")

const blogController = {
    test: (req, res) => {
        console.log("Test Routes is working")
        res.status(200).json({ message: "Test Routes is working Properly" })
    },

   // controller/blog.controller.js
create: async (req, res) => {
  const { title, author, content, tags } = req.body;

  if (!title || !author || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const blog = new Blog({
      title,
      author,
      content,
      tags,
      userId: req.user._id  // store creator's id
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
},


    getBlog: async (req, res) => {
        try {
            const blog = await Blog.find()
            res.status(200).json({ message: "fetch data Successfully", blog })
        } catch (error) {
            res.status(500).json({ message: "Unable to fetch data", error })
        }
    },


    // update 

// blog.controller.js

updateblog: async (req, res) => {
  const { id } = req.params; // blog ID from URL
  const { title, author, content, tags } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🛡️ Check if requester is admin or the blog owner
    const userIdFromToken = req.user._id;
    const userRole = req.user.role;

    if (userRole !== "admin" && blog.userId.toString() !== userIdFromToken) {
      return res.status(403).json({ message: "Unauthorized to edit this blog" });
    }

    // ✅ Proceed to update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, author, content, tags },
      { new: true }
    );

    res.status(200).json({
      message: "Blog edited successfully",
      blog: updatedBlog
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating blog",
      error: error.message
    });
  }
},





 deleteblog: async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (req.user.role !== "admin" && blog.userId.toString() !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
},


    getblogById: async (req, res) => {
        const { id } = req.params

        try {
            const blog = await Blog.findById(id)
            if (!blog) {
                return res.status(404).json({ message: "Blog Not found" })
            }
            res.status(200).json({ blog })
        } catch (error) {
            res.status(500).json({message: "Internal Server Error", error})
        }
    }

}

module.exports = blogController