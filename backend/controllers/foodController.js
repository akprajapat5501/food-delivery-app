import foodModel from "../models/foodModel.js"
import fs from "fs"


// Add Food

export const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "Image not uploaded" });
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price), // Convert string to Number
            category: req.body.category,
            image: req.file.filename
        });

        const data = await food.save();
        res.json({ success: true, message: "Food Added", data });
    } catch (error) {
        console.error("Error details:", error); // Check your terminal for this!
        res.json({ success: false, message: error.message });
    }
}

export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.error("Error details:", error);
        res.json({ success: false, message: error.message });
    }
}
 
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { });
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food remove" });
    } catch (error) {
        console.error("Error details:", error);
        res.json({ success: false, message: error.message });
    }
}
