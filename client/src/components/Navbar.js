import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);

    // renderList is allowing user to access Posts only if valid user is logged in
    const renderList = () => {
        if (state) {    // User is logged in, then 
            return [
                <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/createpost">Create Post</Link></li>
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
                <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
