const mongoose = require('mongoose');
const PrivateRecipe = require('../models/privateRecipeModel.js');

const getAllPrivateRecipes = async (req, res) => {
    //get the user id
    const userId = req.user._id;

    try {
        const privateRecipes = await PrivateRecipe.find({ userId }).sort({createdAt: -1});
        res.status(200).json(privateRecipes);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getOnePrivateRecipe = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `This is get one recipe, to get ${id}`}); 
}

const createPrivateRecipe = async (req, res) => {
    //check to make sure all fields are present
    const {title, instructions, meal, ingredients} = req.body;

    if (!title || !instructions || !meal || !ingredients) {
        return res.status(400).json({error: "One of the fields is not filled in! All fields must be filled in!"});
    }

    try {
        const userId = req.user._id;
        const privateRecipe = await PrivateRecipe.create({userId, title, instructions, meal, ingredients});
        res.status(200).json(privateRecipe);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deletePrivateRecipe = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `This is delete one recipe, to delete ${id}`}); 
}

const updatePrivateRecipe = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `This is update one recipe, to update ${id}`}); 
}

module.exports = {
    getAllPrivateRecipes,
    getOnePrivateRecipe,
    createPrivateRecipe,
    deletePrivateRecipe,
    updatePrivateRecipe
}

