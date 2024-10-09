import express from "express";
import { createSaleFromOrder, viewSales } from "../controllers/salesController.js";

const salesRouter = express.Router();

salesRouter.post("/create", createSaleFromOrder);
salesRouter.get("/list", viewSales); // Add route for listing sales


export default salesRouter;
