import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    ingredient: {type: String, required: false},
    amount: {type: Number, required: true},
    unitOfMeasurement: {type: String, required: true},
    pricePerUnit: {type: Number, required: true},
    expirationDate: {type: Date},
    status: {type: String, enum: ['In Stock', 'Out of Stock', 'Expired'], default: 'In Stock'}
});

const ingredientsModel = mongoose.models.ingredients || mongoose.model("ingredients",ingredientsSchema);

export default ingredientsModel;