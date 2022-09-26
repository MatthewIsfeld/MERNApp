import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/login.js';
import Signup from './pages/signup.js';

function App() {
  return (
  <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}>
        </Route>
        <Route path="/signup" element={<Signup></Signup>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
