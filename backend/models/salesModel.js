import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    amount: { type: Number, required: true },
    items: { type: Array, required: true },
    date: { type: Date, default: Date.now },
});

const salesModel = mongoose.models.sales || mongoose.model("sales", salesSchema);

export default salesModel;
