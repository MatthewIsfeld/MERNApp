import {useLocation} from 'react-router-dom';
import {UseUserContext} from '../hooks/useUserContext.js';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const DetailedRecipeDisplay = () => {
    const location = useLocation();
    const {user} = UseUserContext();
    const {recipe} = location.state;
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async () => {
        //check to see if we are logged in
        if (!user) {
            navigate('/');
            return
        }
        setError(null);
        //if we are logged in make a fetch request to delete
        const response = await fetch(`/app/privateRecipes/${recipe._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const jsonResponse = await response.json();

        if(response.ok) {
            setError(null);
            navigate('/')
            return;
        } else {
            setError(jsonResponse.error);
            return;
        }
    }

    return (
        <div className="detailed-recipe">
            <h3>{recipe.title}</h3>
            <p>Meal: {recipe.meal}</p>
            <article>
                {recipe.instructions}
            </article>
            <div className="ingredients-display">
                {recipe.ingredients.map((ingredient, index) => (
                    <div className="ingredient" key={index}>
                        <p>{ingredient.name}: {ingredient.amount}g</p>
                    </div>
                ))}
            </div>

            <button onClick={handleDelete}>Delete Recipe</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default DetailedRecipeDisplay;