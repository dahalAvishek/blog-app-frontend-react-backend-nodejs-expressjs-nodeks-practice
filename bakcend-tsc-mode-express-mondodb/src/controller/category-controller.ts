import Category from "../model/Category";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  let categories;
  try {
    categories = await Category.find();
  } catch (err) {
    console.log(err);
  }
  if (!categories) {
    return res.status(404).json({ message: "No categories Found" });
  }
  return res.status(200).json({ categories });
};
