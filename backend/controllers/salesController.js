import orderModel from "../models/orderModel.js";
import salesModel from "../models/salesModel.js";

// Create sales from orders
const createSaleFromOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        const newSale = new salesModel({
            orderId: order._id,
            amount: order.amount,
            items: order.items,
        });

        await newSale.save();
        res.json({ success: true, message: "Sale created successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating sale" });
    }
};

export { createSaleFromOrder };


// Fetch all sales for listing
const viewSales = async (req, res) => {
    try {
        const sales = await salesModel.find({});
        res.json({ success: true, data: sales });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching sales" });
    }
};

export { viewSales };
