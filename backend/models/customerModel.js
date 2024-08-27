import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const customerModel = mongoose.models.customers || mongoose.model("customers",customerSchema);

export default customerModel;