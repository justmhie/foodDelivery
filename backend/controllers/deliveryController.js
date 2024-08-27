import deliveryModel from "../models/deliveryModel.js";

const addDelivery = async (req, res) => {
        const delivery = new deliveryModel({
            customerName: req.body.customerName,
            street: req.body.street,
            city: req.body.city,
            province: req.body.province,
            zipCode: req.body.zipCode,
        });
    
        try {
            await delivery.save();
            res.json({success: true, message: "Address Added"});
        } catch (error) {
            console.log(error);
            res.json({success: false, message: "Error"});
        }
    }




const listDelivery = async (req,res) => {
    try {
        const deliveries = await deliveryModel.find({});
        res.json({success:true,data:deliveries})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removeDelivery = async (req, res) => {
    try {
        const delivery = await deliveryModel.findById(req.body.id);

        await deliveryModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Delivery Removed"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}


const updateDelivery = async (req, res) => {
    try {
        const delivery = await deliveryModel.findById(req.body.id);
        if (!delivery) {
            return res.json({success: false, message: "Delivery not found"});
        }
        delivery.customerName = req.body.customerName || delivery.customerName;
        delivery.street = req.body.street || delivery.street;
        delivery.city = req.body.city || delivery.city;
        delivery.province = req.body.province || delivery.province;
        delivery.zipCode = req.body.zipCode || delivery.zipCode;

        await delivery.save();
        res.json({success: true, message: "Address Updated", data: delivery});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error updating delivery"});
    }
}


export {addDelivery,listDelivery,removeDelivery,updateDelivery}