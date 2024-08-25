import express from "express"
import { addIngredient, listIngredients, removeIngredient, updateIngredient } from "../controllers/ingredientsController.js"

const ingredientsRouter = express.Router();

ingredientsRouter.post("/addIngredient",addIngredient)
ingredientsRouter.get("/listIngredients",listIngredients)
ingredientsRouter.post("/removeIngredient",removeIngredient)
ingredientsRouter.post("/updateIngredient",updateIngredient)

export default ingredientsRouter;