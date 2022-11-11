import {Link} from 'react-router-dom';

const SimpleRecipeDisplay = ({ recipe }) => {
    const date = new Date(recipe.createdAt);

    return (
        <div className="simple-recipe">
            <h4>{recipe.title}</h4>
            <p>Meal: {recipe.meal}</p>
            <p>{`${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`}</p>
            <Link to="/recipe/view" state={{recipe}}>View</Link>
        </div>
    )
}

export default SimpleRecipeDisplay;