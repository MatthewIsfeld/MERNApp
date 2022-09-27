import {useContext} from 'react';
import {UserContext} from '../context/userContext.js';

export const UseUserContext = () => {
    //get the values of the context
    const context = useContext(UserContext);

    //check for errors
    if (context) {
        return context;
    } else {
        throw Error("UserContext must be used in UserContextComponent");
    }
}