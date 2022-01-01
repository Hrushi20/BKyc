import React from 'react';
import { Link } from "react-router-dom";


function Nav() {
    return (
        <div className="nav">
            <ul className="links">
                <Link className="li" to='/'> Home </Link>
                <Link className="li" to='/about'> About </Link>
                <Link className="li" to='/'> Wallet </Link>
                <Link className="li" to='/profile'> Profile </Link>
                <button className="authButton" > Logout </button>
            </ul>
        </div>
    )
}

export default Nav;
