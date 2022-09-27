import {UseUserContext} from './useUserContext.js';

export const useLogout = () => {
    //get the dispatch function so we can remove the user from our global context
    const {dispatch: userDispatch} = UseUserContext();

    const logout = () => {
        //remove the user from storage and remove them from the context using our dispatch function
        localStorage.removeItem('user');
        userDispatch({type: "LOGOUT"});
    }

    return {logout};
}