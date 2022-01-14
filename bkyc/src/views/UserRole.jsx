import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useKyc from '../hooks/useKyc';
import useMetamask from '../hooks/useMetamask';
import '../styles/user-role.css';

function UserRole({role, setRole}) {

    const {setStatus } = useKyc();
    const { initMetamask } = useMetamask();
    const authData = useAuth0();
  
    const uData = {
        authData: authData,
        role: role
      }
    
    console.log(uData);

    const onRoleSelect = (roles) => {
        toast(`${roles} role selected !`);
        setRole(roles);
    }

    React.useEffect(() => {
        async function storeUserinMongoose() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(uData)
            }
                const data = await (await fetch(`${process.env.REACT_APP_PORTAL}/users/store-user`, requestOptions)).json();
                localStorage.setItem("userId", uData.authData.user.sub);
            
                initMetamask(); 
                setStatus(data.status);
                setRole(data.role);
            }
        role!=null && storeUserinMongoose();
    }, [role])

    return (
        <div className="role">
            <p className="selrole"> Who are you ? </p>
            <div className="dialog">
                <div onClick={() => onRoleSelect('user')} className="roles">
                    <img src={require('../assets/user.png')} alt="user" width='80%' />
                    <p className="rolename"> User </p>
                    <p className="roledesc">One who uses our app - the client</p>
                </div>
                <div onClick={() => onRoleSelect('authorizer')} className="roles">
                    <img src={require('../assets/ageng.png')} alt="user" width='80%' />
                    <p className="rolename"> Authorizer </p>
                    <p className="roledesc">One who verifies the docs online</p>
                </div>
                <div onClick={() => onRoleSelect('bank')} className="roles">
                     <img src={require('../assets/bank.png')} alt="user" width='80%' />
                    <p className="rolename"> Bank </p>
                    <p className="roledesc">Bank authority</p>
                </div>
            </div>
        </div>
    )
}

export default UserRole
