import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup'


function App() {
  return (
    <Router>
      <Navbar />
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
      </Routes>
    </Router>
  );
}

export default App;
