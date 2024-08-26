import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    customer: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const customerModel = mongoose.models.customer || mongoose.model("customer",customerSchema);

export default customerModel;