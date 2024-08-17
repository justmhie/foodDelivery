import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tokiodev:030804@cluster0.36aqu.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}