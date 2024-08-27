import express from "express"
import { addDelivery, listDelivery, removeDelivery, updateDelivery } from "../controllers/deliveryController.js"

const deliveryRouter = express.Router();

deliveryRouter.post("/addDelivery",addDelivery)
deliveryRouter.get("/listDelivery",listDelivery)
deliveryRouter.post("/removeDelivery",removeDelivery)
deliveryRouter.post("/updateDelivery",updateDelivery)

export default deliveryRouter;