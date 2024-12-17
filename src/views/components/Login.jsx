import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../../consts/urls';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [logins, setLogins] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputOnChange = (e, key) => {
        setLogins((prev) => ({
        ...prev,
        [key]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(`${url}/auth/login`, logins);
        if (response) {
            localStorage.setItem('token', response.data.token);
            navigate('/');
        }
        } catch (error) {
        setError(error.response?.data?.error || 'An error occurred');
        setShowError(true);

        setTimeout(() => {
            setShowError(false);
        }, 5000);
        }
    };

    return (
        <div 
            className="flex h-screen items-center justify-center bg-gray-100">
            <div 
                className="w-[95%] md:w-[80%] lg:w-[60%] bg-white rounded-lg shadow-card grid grid-cols-1 lg:grid-cols-2">

                <div
                    className="hidden lg:flex items-center justify-center bg-primary rounded-l-lg">
                    <div 
                        className="text-center text-white space-y-4 px-10">
                        <h2 className="text-4xl font-bold">Welcome Back!</h2>
                        <p className="text-lg">We are excited to have you again. Login to continue.</p>
                    </div>
                </div>

                <div 
                    className="flex w-[90vw] lg:w-auto items-center justify-center px-10 py-16">
                    <div 
                        className="w-full max-w-sm">
                        <h3 
                            className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h3>
                        <form 
                            className="space-y-6">
                            <div>
                                <label 
                                    className="block text-gray-600 font-medium mb-1">Email</label>
                                <input
                                    onChange={(e) => handleInputOnChange(e, 'email')}
                                    type="text"
                                    placeholder="Enter your email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                            </div>
                            <div>
                                <label 
                                    className="block text-gray-600 font-medium mb-1">Password</label>
                                <input
                                    onChange={(e) => handleInputOnChange(e, 'password')}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:shadow-hover transition">Sign In</button>
                        </form>

                        <div 
                            className="h-6 mt-4 flex items-center justify-center">
                            {showError && (
                                <span 
                                    className="text-danger text-2sm font-small animate-fadeInOut text-center">{error}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
