const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create a schema for a private recipe
const privateRecipeSchema = new Schema({
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
        type: [String],
        required: true
    }
});

module.exports = mongoose.model("PrivateRecipe", privateRecipeSchema);