import express from "express"
import { addEmployee, listEmployee, removeEmployee, updateEmployee } from "../controllers/employeeController.js"

const employeeRouter = express.Router();

employeeRouter.post("/addEmployee",addEmployee)
employeeRouter.get("/listEmployee",listEmployee)
employeeRouter.post("/removeEmployee",removeEmployee)
employeeRouter.post("/updateEmployee",updateEmployee)

export default employeeRouter;