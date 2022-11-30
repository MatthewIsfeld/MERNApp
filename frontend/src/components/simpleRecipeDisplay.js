import {Link} from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const SimpleRecipeDisplay = ({ recipe }) => {

    return (
        <div className="simple-recipe">
            <h4>{recipe.title}</h4>
            <p>Meal: {recipe.meal}</p>
            <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
            <Link to="/recipe/view" state={{recipe}}>View</Link>
        </div>
    )
}

export default SimpleRecipeDisplay;