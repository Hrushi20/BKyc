import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/buttons/Logout';
import LoginButton from '../components/buttons/Login';
import Logo from '../assets/logo.svg';


function Nav({roleName}) {
    const { isAuthenticated } = useAuth0();
    console.log(roleName);
    return (
        <div className="nav">
            <img src={Logo} alt='bkyc logo' width={200} />
            <ul className="links">
                { isAuthenticated && 
                <>
                    <Link className="li" to='/'> HOME </Link>
                    {roleName && roleName === 'user' && <Link className="li" to='/notifications'> NOTIFICATIONS </Link> }   
                    {roleName && roleName === 'authorizer' && <Link className="li" to='/status'> STATUS </Link> }
                    {roleName && roleName === 'user' && <Link className="li" to='/profile'> PROFILE </Link> }
                    {roleName && roleName === 'bank' && <Link className="li" to='/add-clients'> ADD CLIENTS </Link> }
                </>
                 }
            </ul>
            { isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    )
}

export default Nav;
