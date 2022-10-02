import {UseUserContext} from '../hooks/useUserContext.js';
import {useEffect, useState} from 'react';

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
                console.log("%j", returnedJson);
            } else {
                //if the response is not ok show an error
                setError(returnedJson.error);
            }
        }

        if (user) {
            getAllRecipes();
        }
    }, [user]);

    return (
        <div className="home">
            {recipes && <div>{recipes[0].title}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Home;