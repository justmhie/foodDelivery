import express from "express";
import { loginUser, registerUser, getAllUsers, updatePassword } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers); 
userRouter.put("/updatePassword", authMiddleware, updatePassword);

export default userRouter;
