import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/buttons/Logout";
import LoginButton from "../components/buttons/Login";

const Home = () => {
    const { isAuthenticated } = useAuth0();
    console.log(useAuth0());

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default Home;