import React, { useState,useEffect } from 'react';
import LoginContainer from '../components/Login';

const Login = ({
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full h-screen flex justify-center items-center">        
            <LoginContainer/>
        </div>
    );
};

export default Login;
