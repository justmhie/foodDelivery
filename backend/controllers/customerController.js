import customerModel from "../models/customerModel.js";

// add ingredient
const addCustomer = async (req,res) => {
    const customer = new customerModel({
        customer:req.body.customer,
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
        const customer = await customerModel.findById(req.body.id);

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
        const customer = await customerModel.findById(req.body.id);
        if (!customer) {
            return res.json({sucess: false, message: "Customer not found"});
        }
        customer.customer = req.body.customer || customer.customer;
        customer.firstName = req.body.firstName || customer.firstName;        
        customer.lastName = req.body.lastName || customer.lastName;
        customer.username = req.body.username || customer.username;  
        customer.password = req.body.password || customer.password;
        await customer.save();
        res.json({success: true, message: "Customer Updated", data: customer});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error updating customer"})
    }
}

export {addCustomer,listCustomer,removeCustomer,uopdateCustomer}