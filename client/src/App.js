import React, { createContext, useContext, useEffect, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost';
import { initialState, reducer } from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';

export const UserContext = createContext();  // TODO: What is createContext?

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);  // TODO: What is useContext?

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); 

    if (user) {
      dispatch({ type: "USER", payload: user });  // TODO: What is dispatch?
    }
    else {
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={
        <div>
          <Home />
        </div>
      }>
      </Route>
      <Route path='/login' element={
        <div>
          <Login />
        </div>
      }>
      </Route>
      <Route path='/profile' element={
        <div>
          <Profile />
        </div>
      }>
      </Route>
      <Route path='/signup' element={
        <div>
          <Signup />
        </div>
      }>
      </Route>
      <Route path='/createpost' element={
        <div>
          <CreatePost />
        </div>
      }>
      </Route>

      <Route path='/profile/:userid' element={
        <div>
          <UserProfile />
        </div>
      }>
      </Route>

    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);   // TODO: What is useReducer?
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
