import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/buttons/Logout';
import LoginButton from '../components/buttons/Login';


function Nav() {
    const { isAuthenticated } = useAuth0();
    const user = localStorage.getItem("user-data");
    const roleName = user ? JSON.parse(user).role : null;
    console.log(roleName);
    return (
        <div className="nav">
            <ul className="links">
                <Link className="li" to='/'> HOME </Link>
                {roleName && roleName === 'user' && <Link className="li" to='/'> NOTIFICATIONS </Link> }
                { isAuthenticated ?
                <>
                    {roleName && roleName === 'authorizer' && <Link className="li" to='/status'> STATUS </Link> }
                    {roleName && roleName === 'user' && <Link className="li" to='/profile'> PROFILE </Link> }
                    {roleName && roleName === 'bank' && <Link className="li" to='/profile'> ADD CLIENTS </Link> }
                    <LogoutButton />
                </>
                : <LoginButton /> }
            </ul>
        </div>
    )
}

export default Nav;
