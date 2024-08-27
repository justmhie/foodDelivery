import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeFirstName: {type: String, required: false},
    employeeLastName: {type: String, required: true},
    employeeEmail: {type: String, required: true},
    employeeUsername: {type: String, required: true},
    employeePassword: {type: String, required: true},
});

const employeeModel = mongoose.models.employees || mongoose.model("employees",employeeSchema);

export default employeeModel;