import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/home.js';
import {UseUserContext} from './hooks/useUserContext.js';
import TopBar from './components/topBar.js';
import CreatePrivateRecipe from './pages/createPrivateRecipe.js';
import DetailedRecipeDisplay from './pages/detailedRecipeDisplay.js';

function App() {
  const {user} = UseUserContext();

  return (
  <div className="app">
    <BrowserRouter>
      <TopBar></TopBar>
        <div className='page-content'>
          <Routes>
            <Route path="/" element={user ? <Home></Home> : <Navigate to="/login"></Navigate>}>
            </Route>
            <Route path="/login" element={!user ? <Login></Login> : <Navigate to="/"></Navigate>}>
            </Route>
            <Route path="/signup" element={!user ? <Signup></Signup> : <Navigate to="/"></Navigate>}>
            </Route>
            <Route path="/createPrivate" element={user ? <CreatePrivateRecipe></CreatePrivateRecipe> : <Navigate to="/login"></Navigate>}>
            </Route>
            <Route path="/recipe/view" element={user ? <DetailedRecipeDisplay></DetailedRecipeDisplay>: <Navigate to="/login"></Navigate>}>
            </Route>
          </Routes>
        </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
