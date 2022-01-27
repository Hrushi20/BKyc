import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const onLogin = () => {
      loginWithRedirect();
    }

    return (
      <button
        className="authButton"
        onClick={onLogin}
      >
        Log In
      </button>
    );
  };
  
  export default LoginButton;