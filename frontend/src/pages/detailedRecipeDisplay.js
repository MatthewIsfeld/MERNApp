import {useLocation} from 'react-router-dom';

const DetailedRecipeDisplay = () => {
    const location = useLocation();
    console.log(location.state);
}

export default DetailedRecipeDisplay;