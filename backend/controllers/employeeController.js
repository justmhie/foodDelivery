import employeeModel from "../models/employeeModel.js";

const addEmployee = async (req,res) => {
    const employee = new employeeModel({
        employeeFirstName:req.body.employeeFirstName,
        employeeLastName:req.body.employeeLastName,
        employeeEmail:req.body.employeeEmail,
        employeeUsername:req.body.employeeUsername,
        employeePassword:req.body.employeePassword,
    })
    try {
        await employee.save();
        res.json({success:true,message:"Employee Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


const listEmployee = async (req,res) => {
    try {
        const employees = await employeeModel.find({});
        res.json({success:true,data:employees})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removeEmployee = async (req,res) => {
    try {
        const employee = await employeeModel.findById(req.body.id);

        await employeeModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Employee Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updateEmployee = async (req,res) => {
    try {
        const employee = await employeeModel.findById(req.body.id);
        if (!employee) {
            return res.json({success: false, message: "Employee not found"});
        }
        employee.employeeFirstName = req.body.employeeFirstName || employee.employeeFirstName;
        employee.employeeLastName = req.body.employeeLastName || employee.employeeLastName;
        employee.employeeEmail = req.body.employeeEmail || employee.employeeEmail;
        employee.employeeUsername = req.body.employeeUsername || employee.employeeUsername;
        employee.employeePassword = req.body.employeePassword || employee.employeePassword;

        await employee.save();
        res.json({success: true, message: "Employee Updated", data: employee});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error updating employee"})
    }
}

export {addEmployee,listEmployee,removeEmployee,updateEmployee}