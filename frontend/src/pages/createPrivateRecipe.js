import {UseUserContext} from '../hooks/useUserContext.js';
import {useState} from 'react';

const CreatePrivateRecipe = () => {
    const {user} = UseUserContext();
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [meal, setMeal] = useState('any');
    const [ingredients, setIngredients] = useState([{name: '', amount: 0}]);

    const addIngredientInput = () => {
        setIngredients([...ingredients, {name: "", amount: 0}]);
    }

    const removeIngredientInput = (index) => {
        const tempList = [...ingredients];
        tempList.splice(index, 1);
        setIngredients(tempList);
    }

    const handleNameChange = (e, index) => {
        const tempList = [...ingredients];
        tempList[index].name = e.target.value;
        setIngredients(tempList);
    }

    const handleAmountChange = (e, index) => {
        const tempList = [...ingredients];
        tempList[index].amount = e.target.value;
        setIngredients(tempList);
    }

    const submitRecipe = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({title, instructions, meal, ingredients}));
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
                        <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleNameChange(e, index)}
                        >
                        </input>
                        <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(e, index)}
                        >
                        </input>
                        {ingredients.length !== 1 && <button onClick={() => removeIngredientInput(index)}>Remove</button>}
                        {ingredients.length - 1 === index && <button onClick={addIngredientInput}>Add</button>}
                </div>
                )
            })}

            <div>{JSON.stringify(ingredients)}</div>
            <button>Submit</button>
        </form>
    )
}

export default CreatePrivateRecipe;