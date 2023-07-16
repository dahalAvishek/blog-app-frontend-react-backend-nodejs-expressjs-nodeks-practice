import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getByCategoryId,
  getById,
  getByUserId,
  updateBlog,
} from "../controller/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);
blogRouter.get("/category/:id", getByCategoryId);
export default blogRouter;
