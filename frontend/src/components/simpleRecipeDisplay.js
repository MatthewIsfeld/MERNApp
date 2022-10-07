import {Link} from 'react-router-dom';

const SimpleRecipeDisplay = ({ recipe }) => {
    return (
        <div className="simple-recipe">
            <h4>{recipe.title}</h4>
            <p>Meal: {recipe.meal}</p>
            <p>{recipe.createdAt}</p>
            <Link to="/recipe/view" state={{recipe}}>View</Link>
        </div>
    )
}

export default SimpleRecipeDisplay;