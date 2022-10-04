import {UseUserContext} from '../hooks/useUserContext.js';
import {useEffect, useState} from 'react';
import SimpleRecipeDisplay from '../components/simpleRecipeDisplay.js';

const Home = () => {
    const {user} = UseUserContext();
    const [error, setError] = useState();
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        const getAllRecipes = async () => {
            setError(null);
            //default fetch is a GET request so we do not need to specify method
            const response = await fetch('/app/privateRecipes', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
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
    }, [user]);

    //if we have recipes we use the .map() method to display each recipe
    return (
        <div className="home">
            <div className="recipes">
                { recipes && recipes.map((recipe) => (
                    <SimpleRecipeDisplay key={recipe._id} recipe={recipe}></SimpleRecipeDisplay>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Home;