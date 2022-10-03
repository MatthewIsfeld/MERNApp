
const SimpleRecipeDisplay = ({ recipe }) => {
    return (
        <div className="simple-recipe">
            <h4>{recipe.title}</h4>
            <p>{recipe.meal}</p>
            <p>{recipe.createdAt}</p>
        </div>
    )
}

export default SimpleRecipeDisplay;