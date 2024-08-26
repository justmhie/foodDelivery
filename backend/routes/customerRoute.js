import express from "express"
import { addCustomer, listCustomer, removeCustomer, updateCustomer } from "../controllers/ingredientsController.js"

const customerRouter = express.Router();

customerRouter.post("/addCustomer",addCustomer)
customerRouter.post("/listCustomer",listCustomer)
customerRouter.post("/updateCustomer",updateCustomer)

export default customerRouter;