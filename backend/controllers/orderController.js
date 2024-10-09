import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import salesModel from "../models/salesModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order from fronted
const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,    
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"php",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"php",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url})
        } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}   

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            const order = await orderModel.findById(orderId);
            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            // Create a sales entry
            const newSale = new salesModel({
                orderId: order._id,
                amount: order.amount,
                items: order.items,
            });
            await newSale.save();

            res.json({ success: true, message: "Paid and Sale Recorded" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 });
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (order) {
            if (status === "Out for Delivery" && order.status === "Brewing your Coffee" ||
                status === "Delivered" && order.status === "Out for Delivery") {
                await orderModel.findByIdAndUpdate(orderId, { status, statusTimestamp: Date.now() });
                res.json({ success: true, message: "Status Updated" });
            } else {
                res.json({ success: false, message: "Invalid status transition" });
            }
        } else {
            res.json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// api for canceling order
const cancelOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (order && order.status === "Brewing your Coffee") {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: true, message: "Order Canceled" });
        } else {
            res.json({ success: false, message: "Cannot cancel at this stage" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,cancelOrder}