// routes/blog.router.js
const express = require("express");
const blogController = require("../controller/blog.controller");
const authorizeRoles = require("../middleware/rolemiddleware");
const authmiddleware = require("../middleware/authmiddleware");
const blogRouter = express.Router();

blogRouter.post("/createpost", authmiddleware, blogController.create);
blogRouter.get("/getpost", blogController.getBlog);
blogRouter.get("/detail/:id", blogController.getblogById);
blogRouter.get("/:id", blogController.getblogById);

// routes/blog.router.js
blogRouter.put(
  "/update/:id",
  authmiddleware,
  authorizeRoles("admin", "user"),
  blogController.updateblog
);


blogRouter.delete(
  "/delete/:id",
  authmiddleware,
  authorizeRoles("admin", "user"),
  blogController.deleteblog
);

module.exports = blogRouter;
