import {createContext, useReducer, useEffect} from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }

}

export const UserContextComponent = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    })

    //sice this wraps the entire application we can print the reducer here
    console.log(state);
    
    //set up a useEffect so that every time a page is first rendered the frontend checks to see if the user is logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({type: "LOGIN", payload: user});
        }
    }, []);

    //return a component that will provide the total state of our reducer, as well as the dispatch function
    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}