import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/buttons/Logout';
import LoginButton from '../components/buttons/Login';


function Nav() {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="nav">
            <ul className="links">
                <Link className="li" to='/'> Home </Link>
                <Link className="li" to='/'> Wallet </Link>
                { isAuthenticated ?
                <>
                    <Link className="li" to='/status'> status </Link>
                    <Link className="li" to='/profile'> Profile </Link>
                    <LogoutButton />
                </>
                : <LoginButton /> }
            </ul>
        </div>
    )
}

export default Nav;
