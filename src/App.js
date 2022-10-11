import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext.js'
//Pages and Components
import Home from './pages/home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Navbar from './components/Navbar.js';



function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home/> : <Navigate to='/login' />}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
