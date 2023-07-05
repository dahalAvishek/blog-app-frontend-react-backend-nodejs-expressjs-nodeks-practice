import { getAllCategories } from "../controller/category-controller";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
export default categoryRouter;
