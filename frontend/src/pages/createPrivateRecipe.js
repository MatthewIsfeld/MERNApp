import {UseUserContext} from '../hooks/useUserContext.js';
import {useState} from 'react';

const CreatePrivateRecipe = () => {
    const {user} = UseUserContext();
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [meal, setMeal] = useState('any');
    //set our ingredients to a list of javascript objects containing the name of each ingredient and the amount in grams
    const [ingredients, setIngredients] = useState([{name: '', amount: 0}]);
    const [error, setError] = useState(null);

    //This function will add more ingredient input fields at the user's request, it does this by updating the list of ingredients, which causes the page to re-run the .map in the jsx
    const addIngredientInput = () => {
        setIngredients([...ingredients, {name: "", amount: 0}]);
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

    const submitRecipe = async (e) => {
        e.preventDefault();
        setError(null);
        //Check to see if we are logged in
        if (!user) {
            setError('You must be logged in to submit a private recipe!');
            return;
        }

        //send a post request to our backend api to create a new recipe
        const response = await fetch('/app/privateRecipes/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({title, instructions, meal, ingredients})
        })
        const jsonResponse = await response.json();

        if (response.ok) {
            setError(null);
            setTitle('');
            setMeal('any');
            setInstructions('');
            setIngredients([{name: '', amount: 0}]);
        } else {
            setError(jsonResponse.error);
        }
    }

    return (
        <form className="create-private-recipe" onSubmit={submitRecipe}>
            <h2>Create New Recipe</h2>
            
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

            <label>Meal:</label>
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
                    <div className="ingredients" key={index}>
                        <label>Ingredient Name:</label>
                        <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleNameChange(e, index)}
                        >
                        </input>
                        <label>Ingredit Amount (g):</label>
                        <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(e, index)}
                        min="0"
                        >
                        </input>
                        {ingredients.length !== 1 && <button onClick={() => removeIngredientInput(index)}>Remove</button>}
                        {ingredients.length - 1 === index && <button onClick={addIngredientInput}>Add</button>}
                </div>
                )
            })}

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CreatePrivateRecipe;