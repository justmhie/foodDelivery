import express from "express"
import { addCustomer, listCustomer, removeCustomer, updateCustomer } from "../controllers/customerController.js"

const customerRouter = express.Router();

customerRouter.post("/addCustomer",addCustomer)
customerRouter.get("/listCustomer",listCustomer)
customerRouter.post("/removeCustomer",removeCustomer)
customerRouter.post("/updateCustomer",updateCustomer)

export default customerRouter;