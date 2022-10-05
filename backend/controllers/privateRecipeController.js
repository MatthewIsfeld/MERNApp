const mongoose = require('mongoose');
const PrivateRecipe = require('../models/privateRecipeModel.js');

const getAllPrivateRecipes = async (req, res) => {
    //get the user id
    const userId = req.user._id;
    //get the page from the user via a query
    const page = req.query.p || 0;


    try {
        const privateRecipes = await PrivateRecipe.find({ userId }).sort({createdAt: -1})
            .skip(page * 10)
            .limit(10);
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
            return res.status(400).json({error: "No recipe exists with this id"});
        }
        
        if (!mongoose.Types.ObjectId(userId).equals(mongoose.Types.ObjectId(recipe.userId))) {
            return res.status(400).json({error: "You must be logged in to the account that created this recipe to view it!"});
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

    //check if the user inputted a valid mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid ID!"});   
    }
    
    //get user id from request
    const userId = req.user._id;

    try {
        const recipe = await PrivateRecipe.findOneAndDelete({_id: id});

        if (!recipe) {
            return res.status(400).json({error: "No recipe exists with this id"});
        }
        
        if (!mongoose.Types.ObjectId(userId).equals(mongoose.Types.ObjectId(recipe.userId))) {
            return res.status(400).json({error: "You must be logged in to the account that created this recipe to delete it!"});
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({error: error.message});       
    }
}

const updatePrivateRecipe = async (req, res) => {
    const {id} = req.params;

    //check if the user inputted a valid mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid ID!"});   
    }
        
    //get user id from request
    const reqUserId = req.user._id;

    //check our request for fields that cannot be updated
    const {_id, userId} = req.body;
    if (_id || userId) {
        return res.status(400).json({error: "Cannot update these properties!"});
    }
    
    try {
        const recipe = await PrivateRecipe.findOneAndUpdate({_id: id}, {...req.body});
    
        if (!recipe) {
            return res.status(400).json({error: "No recipe exists with this id"});
        }
            
        if (!mongoose.Types.ObjectId(reqUserId).equals(mongoose.Types.ObjectId(recipe.userId))) {
            return res.status(400).json({error: "You must be logged in to the account that created this recipe to update it!"});
        }
    
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({error: error.message});       
    }
}

module.exports = {
    getAllPrivateRecipes,
    getOnePrivateRecipe,
    createPrivateRecipe,
    deletePrivateRecipe,
    updatePrivateRecipe
}

