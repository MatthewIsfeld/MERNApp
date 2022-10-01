const mongoose = require('mongoose');

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
        type: Map,
        of: Number,
        required: true
    }
});

module.exports = mongoose.model("PrivateRecipe", privateRecipeSchema);