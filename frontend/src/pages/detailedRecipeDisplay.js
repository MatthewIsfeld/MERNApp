import {useLocation} from 'react-router-dom';
import {UseUserContext} from '../hooks/useUserContext.js';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const DetailedRecipeDisplay = () => {
    //variables for displaying/deleting a recipe
    const location = useLocation();
    const {user} = UseUserContext();
    const {recipe} = location.state;
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //state variables for updating our recipe
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [meal, setMeal] = useState('any');
    const [ingredients, setIngredients] = useState([{name: '', amount: ''}]);

    //This functions handles deleting a recipe
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

    //we use a useEffect function to handle the case where a user tries to enter this url directly, we also use this to set default values for updating
    useEffect(() => {
        if (!recipe) {
            navigate('/');
            return;
        }
        
        setTitle(recipe.title);
        setInstructions(recipe.instructions);
        setMeal(recipe.meal);

        let tempIngredients = [];
        recipe.ingredients.map((ingredient) => {
            tempIngredients.push({name: ingredient.name, amount: ingredient.amount});
            return true;
        });
        setIngredients(tempIngredients);
    }, [recipe, navigate]);

    //Functions for updating a recipe
    
    //This function will add more ingredient input fields at the user's request, it does this by updating the list of ingredients, which causes the page to re-run the .map in the jsx
    const addIngredientInput = () => {
        setIngredients([...ingredients, {name: "", amount: ''}]);
    }
    
    //remove an ingredient in a similar way to how we add it
    const removeIngredientInput = (index) => {
        const tempList = [...ingredients];
        tempList.splice(index, 1);
        setIngredients(tempList);
    }
    
    //if we change the name of a particular ingredient we take the index of where that ingredient is in the list and change the value, to codify this we setIngredients
    const handleNameChange = (e, index) => {
        const tempList = [...ingredients];
        tempList[index].name = e.target.value;
        setIngredients(tempList);
    }
    
    //we change amount in the same fashion as name
    const handleAmountChange = (e, index) => {
        const tempList = [...ingredients];
        tempList[index].amount = e.target.value;
        setIngredients(tempList);
    }

    //function that will send a fetch request to update our recipe
    const updateRecipe = async (e) => {
        //prevent default action of refreshing page
        e.preventDefault();

        //check to see if we are logged in
        if (!user) {
            navigate('/');
            return
        }

        setError(null);
        const response = await fetch(`/app/privateRecipes/${recipe._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({title, instructions, meal, ingredients})
        }); 

        const jsonResponse = await response.json();

        if (response.ok) {
            setError(null);
            navigate('/');
            return;
        } else {
            setError(jsonResponse.error);
            return;
        }
    }

    return (
        <div className="detailed-recipe-page">
            <div className="detailed-recipe">
                <h2>{recipe.title}</h2>
                <p>Meal: {recipe.meal}</p>
                <h4>Instructions</h4>
                <article>
                    {recipe.instructions}
                </article>
                <h4>Ingredients</h4>
                <div className="ingredients-display">
                    {recipe.ingredients.map((ingredient, index) => (
                        <div className="ingredient" key={`displayIngredient${index}`}>
                            <p>{ingredient.name}: {ingredient.amount}</p>
                        </div>
                    ))}
                </div>

                <button onClick={handleDelete}>Delete Recipe</button>
            </div>
            <div className="update-form">
                <form className="update-private-recipe" onSubmit={updateRecipe}>
                    <h2>Update This Recipe</h2>
                    
                    <label>Title:</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}>
                    </input>

                    <label>Intructions:</label>
                    <textarea
                    value={instructions}
                    onChange={(e) => {setInstructions(e.target.value)}}>
                    </textarea>

                    <label className="meal-label">Meal:</label>
                    <select
                    value={meal}
                    onChange={(e) => {setMeal(e.target.value)}}
                    >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="breakfast/lunch">Breakfast/Lunch</option>
                        <option value="lunch/dinner">Lunch/dinner</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                        <option value="any">Any</option>
                    </select>

                    <label>Ingredients:</label>
                    {ingredients.map((item, index) => {
                        return (
                            <div className="ingredients" key={`formIngredient${index}`}>
                                <label>Ingredient Name:</label>
                                <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleNameChange(e, index)}
                                >
                                </input>
                                <label>Ingredient Amount:</label>
                                <input
                                type="text"
                                value={item.amount}
                                onChange={(e) => handleAmountChange(e, index)}
                                >
                                </input>
                                {ingredients.length !== 1 && <button onClick={() => removeIngredientInput(index)}>Remove</button>}
                                {ingredients.length - 1 === index && <button onClick={addIngredientInput}>Add</button>}
                        </div>
                        )
                    })}

                    <button>Submit</button>
                </form>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default DetailedRecipeDisplay;