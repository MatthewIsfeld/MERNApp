import {useState} from 'react';
import {UseUserContext} from '../hooks/useUserContext.js';

const Signup = () => {
    //create state hooks to manage the input to our forms
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch} = UseUserContext();
    //some state to check for errors, and change the form depending on whether or not we are loading information
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const submitForSignup = async (e) => {
        //prevent the default form submit action of refreshing the page
        e.preventDefault();

        //we are now loading so we setIsLoading to true
        setIsLoading(true);
        setError(null);
        //get the response from signing up, this should be the user's email and their token
        const response = await fetch('/app/user/signup', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email, password})
        });

        //convert the response to json
        const jsonResponse = await response.json();

        if (response.ok) {
            //save the user's token to local storage
            localStorage.setItem('user', JSON.stringify(jsonResponse));

            //set the global context to be logged in
            dispatch({type: "LOGIN", payload: jsonResponse});
            setIsLoading(false);
        } else {
            setError(jsonResponse.error);
            setIsLoading(false);
        }
    }

    return (
        <form className="signup" onSubmit={submitForSignup}>
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}>
            </input>

            <label>Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}>
            </input>

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup;