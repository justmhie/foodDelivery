import express, { response } from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import ingredientsRouter from "./routes/ingredientsRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import customerRouter from "./routes/customerRoute.js"
import employeeRouter from "./routes/employeeRoute.js";
import deliveryRouter from "./routes/deliveryRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import salesRouter from "./routes/salesRoute.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/ingredients",ingredientsRouter)
app.use("/api/user",userRouter)
app.use("/api/employees", employeeRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/sales", salesRouter);

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

