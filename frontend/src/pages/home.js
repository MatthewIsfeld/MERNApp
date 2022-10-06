import {UseUserContext} from '../hooks/useUserContext.js';
import {useEffect, useState} from 'react';
import SimpleRecipeDisplay from '../components/simpleRecipeDisplay.js';

const Home = () => {
    const {user} = UseUserContext();
    const [error, setError] = useState();
    const [recipes, setRecipes] = useState();
    const [page, setPage] = useState(0);
    const [meal, setMeal] = useState('any');

    const incrementPage = () => {
        setPage(page + 1);
    }

    
    const decrementPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const getAllRecipes = async () => {
            setError(null);
            //default fetch is a GET request so we do not need to specify method
            const response = await fetch(`/app/privateRecipes?m=${meal}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            //convert our response into json
            const returnedJson = await response.json();
            
            //if the response is ok proceed
            if (response.ok) {
                setError(null);
                setRecipes(returnedJson);
            } else {
                //if the response is not ok show an error
                setError(returnedJson.error);
            }
        }

        if (user) {
            getAllRecipes();
        }
    }, [user, meal]);

    //if we have recipes we use the .map() method to display each recipe
    return (
        <div className="home">
            <div className="sort-form">
                <form>
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
                </form>
            </div>
            <div className="recipes">
                { recipes && recipes.slice(page*6, page*6+6).map((recipe) => (
                    <SimpleRecipeDisplay key={recipe._id} recipe={recipe}></SimpleRecipeDisplay>
                ))}
            </div>
            <div className = "page-buttons">
                <button onClick={decrementPage}>Previous Page</button>
                <button onClick={incrementPage}>Next Page</button>
            </div>
            <div className = "page-form">
                <form>
                    <input
                    type="Number"
                    value={page}
                    onChange={(e) => {setPage(e.target.value)}}
                    min="0">
                    </input>
                </form>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Home;