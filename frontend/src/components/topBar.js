import {useLogout} from '../hooks/useLogout.js';
import {Link} from 'react-router-dom';

const TopBar = () => {
    const {logout} = useLogout();

    const clickHandler = () => {
        logout();
    }

    return (
        <header className='top-bar'>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/createPrivate">Add New Private Recipe</Link>
                <button onClick={clickHandler}>Logout</button>
            </nav>
        </header>
    )
}

export default TopBar;