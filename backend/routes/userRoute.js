import express from "express";
import { loginUser, registerUser, getAllUsers, updatePassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers); 
userRouter.post("/updatePassword", updatePassword);

export default userRouter;
