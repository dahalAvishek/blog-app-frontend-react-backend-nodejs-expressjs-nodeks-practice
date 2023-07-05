import express from "express";
import { getAllUser, login, signup } from "../controller/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
export default userRouter;
