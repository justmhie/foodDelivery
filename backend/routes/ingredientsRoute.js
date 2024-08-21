import express from "express"
import { addIngredient, listIngredients, removeIngredient } from "../controllers/ingredientsController.js"

const ingredientsRouter = express.Router();

ingredientsRouter.post("/addIngredient",addIngredient)
ingredientsRouter.get("/listIngredients",listIngredients)
ingredientsRouter.post("/removeIngredient",removeIngredient)

export default ingredientsRouter;