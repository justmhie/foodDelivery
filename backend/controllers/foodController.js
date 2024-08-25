import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
    let image_filename = req.file ? `${req.file.filename}` : null;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log(err);
            });
        }
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// update food item
const updateFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }
        if (req.file) {
            if (food.image) {
                fs.unlink(`uploads/${food.image}`, (err) => {
                    if (err) console.log(err);
                });
            }
            food.image = `${req.file.filename}`;
        }
        food.name = req.body.name || food.name;
        food.description = req.body.description || food.description;
        food.price = req.body.price || food.price;
        food.category = req.body.category || food.category;

        await food.save();
        res.json({ success: true, message: "Food Updated", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food" });
    }
};

export { addFood, listFood, removeFood, updateFood };
