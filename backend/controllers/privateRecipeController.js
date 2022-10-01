

const getAllPrivateRecipes = async (req, res) => {
    res.status(200).json({message: "This is get all recipes"}); 
}

const getOnePrivateRecipe = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `This is get one recipe, to get ${id}`}); 
}

const createPrivateRecipe = async (req, res) => {
    res.status(200).json({message: "This is create one recipe"}); 
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

