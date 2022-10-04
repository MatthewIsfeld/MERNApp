import {useLocation} from 'react-router-dom';
import {UseUserContext} from '../hooks/useUserContext.js';

const DetailedRecipeDisplay = () => {
    const location = useLocation();
    const {user} = UseUserContext();
    const {recipe} = location.state;

    return (
        <div className="detailed-recipe">
            <h3>{recipe.title}</h3>
            <p>Meal: {recipe.meal}</p>
            <article>{recipe.instructions}</article>
            <div className="ingredients-display">
                {recipe.ingredients.map((ingredient, index) => (
                    <div className="ingredient" key={index}>
                        <p>{ingredient.name}: {ingredient.amount}g</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailedRecipeDisplay;