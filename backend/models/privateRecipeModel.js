const mongoose = require('mongoose');

//create a variable to store our ingredient
const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
}, {_id: false});

//create a schema for a private recipe
const privateRecipeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    meal: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'breakfast/lunch', 'lunch/dinner', 'dessert', 'snack', 'any'],
        default: 'any',
        required: true
    },
    ingredients: {
        type: [ingredientSchema],
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("PrivateRecipe", privateRecipeSchema);