import {useState} from 'react';
import {UseUserContext} from '../hooks/useUserContext.js';

const Signup = () => {
    //create state hooks to manage the input to our forms
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {dispatch} = UseUserContext();

    const submitForSignup = async (e) => {
        //prevent the default form submit action of refreshing the page
        e.preventDefault();

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

            <button>Sign Up</button>
        </form>
    )
}

export default Signup;