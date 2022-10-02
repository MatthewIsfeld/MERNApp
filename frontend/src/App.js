import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/home.js';
import {UseUserContext} from './hooks/useUserContext.js';

function App() {
  const {user} = UseUserContext();

  return (
  <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}>
        </Route>
        <Route path="/login" element={!user && <Login></Login>}>
        </Route>
        <Route path="/signup" element={!user && <Signup></Signup>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
