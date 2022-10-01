const express = require('express');
const authorizationCheck = require('../middleware/authorizationWare.js');
const {getAllPrivateRecipes, getOnePrivateRecipe, createPrivateRecipe, deletePrivateRecipe, updatePrivateRecipe} = require('../controllers/privateRecipeController.js');

//create a router using express
const router = express.Router();

//validate that the user is signed in to a valid account
router.use(authorizationCheck);

//get all private recipes
router.get('/', getAllPrivateRecipes);

//get a single recipe
router.get('/:id', getOnePrivateRecipe)

//create a private recipe
router.post('/', createPrivateRecipe);

//delete a recipe
router.delete('/:id', deletePrivateRecipe);

//update a recipe
router.patch('/:id', updatePrivateRecipe);

//export the router
module.exports = router;