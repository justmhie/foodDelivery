import ingredientsModel from "../models/ingredientsModel.js";

// add ingredient
const addIngredient = async (req,res) => {
    const ingredient = new ingredientsModel({
        ingredient:req.body.ingredient,
        amount:req.body.amount,
        unitOfMeasurement:req.body.unitOfMeasurement,
        pricePerUnit:req.body.pricePerUnit,
        expirationDate:req.body.expirationDate,
        status:req.body.status
    })
    try {
        await ingredient.save();
        res.json({success:true,message:"Ingredient Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all ingredients list
const listIngredients = async (req,res) => {
    try {
        const ingredients = await ingredientsModel.find({});
        res.json({success:true,data:ingredients})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove ingredient item
const removeIngredient = async (req,res) => {
    try {
        const ingredient = await ingredientsModel.findById(req.body.id);

        await ingredientsModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Ingredient Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// update ingredient item
const updateIngredient = async (req,res) => {
    try {
        const ingredient = await ingredientsModel.findById(req.body.id);
        if (!ingredient) {
            return res.json({sucess: false, message: "Ingredient not found"});
        }
        ingredient.ingredient = req.body.ingredient || ingredient.ingredient;
        ingredient.amount = req.body.amount || ingredient.amount;
        ingredient.unitOfMeasurement = req.body.unitOfMeasurement || ingredient.unitOfMeasurement;
        ingredient.pricePerUnit = req.body.pricePerUnit || ingredient.pricePerUnit;
        ingredient.expirationDate = req.body.expirationDate || ingredient.expirationDate;
        ingredient.status = req.body.status || ingredient.status;

        await ingredient.save();
        res.json({success: true, message: "Ingredient Updated", data: ingredient});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error updating ingredient"})
    }
}

export {addIngredient,listIngredients,removeIngredient,updateIngredient}