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
    
    //check if the user inputted a valid mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid ID!"});   
    }

    //get user id from request
    const userId = req.user._id;

    try {
        const recipe = await PrivateRecipe.findById(id);

        if (!recipe) {
            return res.status(200).json({message: "No recipe exists with this id"});
        }
        
        if (!mongoose.Types.ObjectId(userId).equals(mongoose.Types.ObjectId(recipe.userId))) {
            return res.status(400).json({message: "You must be logged in to the account that created this recipe to view it!"});
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({error: error.message});       
    }
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

