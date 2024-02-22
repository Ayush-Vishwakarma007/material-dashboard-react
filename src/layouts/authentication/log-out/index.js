/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../sign-in/index';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout called")
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        navigate('/authentication/sign-in');
    };

    handleLogout();

    return (
        <SignIn />
    );
};

export default Logout;
