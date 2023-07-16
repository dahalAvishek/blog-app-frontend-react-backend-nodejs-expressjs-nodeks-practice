import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/user";
import Category from "../model/Category";
import { Request, Response } from "express";
import { BlogI } from "../model/Blog";

export const getAllBlogs: (
  req: Request,
  res: Response
) => Promise<void | Response<any, Record<string, any>>> = async (
  req: Request,
  res: Response
) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req: Request, res: Response) => {
  const { title, description, image, user, categories } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser.id) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }

  let existingCategory;
  try {
    existingCategory = await Category.findById(categories);
  } catch (err) {
    return console.log(err);
  }

  if (!existingCategory) {
    console.log(categories);
    debugger;
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
    categories,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const newBlog = await blog.save({ session });
    console.log(">>>>", newBlog._id.toString());
    existingUser.blogs.push(newBlog.id);
    existingCategory.blogs.push(newBlog.id);
    await existingUser.save({ session });
    await existingCategory.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req: Request, res: Response) => {
  const { title, description, categories } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      categories,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to find blog by this ID" });
  }
  let existingUser;
  try {
    existingUser = await User.findById(blog.user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser.id) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }
  let existingCategory;
  try {
    existingCategory = await Category.findById(blog.categories);
  } catch (err) {
    return console.log(err);
  }

  if (!existingCategory) {
    return res
      .status(400)
      .json({ message: "Unable to find category by this ID" });
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.blogs.splice(existingUser.blogs.indexOf(blog.id), 1);
    existingCategory.blogs.splice(existingCategory.blogs.indexOf(blog.id), 1);
    await existingUser.save({ session });
    await existingCategory.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ message: "Sucessfully deleted!!" });
};

export const getByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};

export const getByCategoryId = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  let categoryBlogs;
  try {
    categoryBlogs = await Category.findById(categoryId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!categoryBlogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs: categoryBlogs });
};
