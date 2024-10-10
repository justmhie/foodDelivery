import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {
    const {username,password,email} = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }

        // validate email format $ strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = new userModel({
            username:username,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Fetch all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        // Fetch users without including the password field
        const users = await userModel.find({}, 'username email'); // Removed password
        res.json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to fetch users." });
    }
};

// Update password
const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    
    try {
        // Check if the user with the given email exists
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.json({ success: false, message: "User with this email does not exist." });
        }
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully." });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating password." });
    }
};


export { loginUser, registerUser, getAllUsers, updatePassword };