import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    customerName: {type: String, required: false},
    street: {type: String, required: true},
    city: {type: String, required: true},
    province: {type: String, required: true},
    zipCode: {type: String, required: true},
});

const deliveryModel = mongoose.models.deliveries || mongoose.model("deliveries",deliverySchema);

export default deliveryModel;