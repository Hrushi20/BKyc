import React from 'react';
import { toast } from 'react-toastify';
import '../styles/user-role.css';

function UserRole({role, setRole}) {
    
    const onRoleSelect = (roles) => {
        toast.success(`${roles} role selected !`);
        setRole(roles);
    }      

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
