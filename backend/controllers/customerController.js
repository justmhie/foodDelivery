import customerModel from "../models/customerModel.js";

// add ingredient
const addCustomer = async (req,res) => {
    const customers = new customerModel({
        customers:req.body.customers,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })
    try {
        await ingredient.save();
        res.json({success:true,message:"Customer Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all ingredients list
const listCustomer = async (req,res) => {
    try {
        const customer = await customerModel.find({});
        res.json({success:true,data:customer})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove ingredient item
const removeCustomer = async (req,res) => {
    try {
        const customers = await customerModel.findById(req.body.id);

        await customerModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Customer Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// update ingredient item
const uopdateCustomer = async (req,res) => {
    try {
        const customers = await customerModel.findById(req.body.id);
        if (!customers) {
            return res.json({sucess: false, message: "Customer not found"});
        }
        customers.customers = req.body.customers || customers.customers;
        customers.firstName = req.body.firstName || customers.firstName;        
        customers.lastName = req.body.lastName || customers.lastName;
        customers.username = req.body.username || customers.username;  
        customers.password = req.body.password || customers.password;
        await customers.save();
        res.json({success: true, message: "Customer Updated", data: customers});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error updating customer"})
    }
}

export {addCustomer,listCustomer,removeCustomer,uopdateCustomer}