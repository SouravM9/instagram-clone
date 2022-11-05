import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    // renderList is allowing user to access Posts only if valid user is logged in
    const renderList = () => {
        if (state) {    // User is logged in, then 
            return [
                <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/createpost">Create Post</Link></li>
                    <li>
                        <button className="btn waves-effect waves-light #ec407a pink lighten-1"
                            onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" })
                                navigate('/login');
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </>
            ]
        }
        else {
            return [
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                {/* Same list render list i.e., if logged in then only you can go to home screen */}
                <Link to={state ? "/" : "/login"} className="brand-logo left">Instawild</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
