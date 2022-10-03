import {useLogout} from '../hooks/useLogout.js';

const TopBar = () => {
    const {logout} = useLogout();

    const clickHandler = () => {
        logout();
    }

    return (
        <button onClick={clickHandler}>Logout</button>
    )
}

export default TopBar;