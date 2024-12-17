import React, { useState, useEffect } from 'react';
import { logo } from '../../model/images';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const UpBar = ({fullName}) => {
    const [expand, setExpand] = useState(false);
    const location = useLocation(); 

    const navigate = useNavigate();

    useEffect(() => {
        setExpand(false);
    }, [location]);
    

    const toggleExpand = () => setExpand((prev) => !prev);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="sticky top-0 left-0 z-10 w-full bg-white shadow-sm">
            {/* Top Bar */}
            <div className="relative w-full py-4 px-10 flex justify-between items-center border-b border-gray-200">
                <div className="hidden lg:flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold text-gray-600">
                        MBEREREKIM INSTALLATION CO.LTD
                    </span>
                </div>
                <div className="relative flex w-full lg:w-auto justify-end">
                    <div className="flex items-center gap-1 md:gap-3">
                            <Person2OutlinedIcon
                                sx={{
                                    fontSize: {
                                    xs: 20,
                                    sm: 24, 
                                    md: 32,
                                    },
                                }}/>
                            <span className="text-sm lg:text-lg font-medium text-gray-600 capitalize">{fullName}</span>
                        <button
                            onClick={toggleExpand}
                            className="flex items-center justify-center bg-yellow-500 text-white p-1 md:p-2 rounded-full focus:outline-none"
                            aria-expanded={expand}
                            aria-label="Toggle navigation"
                        >
                            {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    <div
                        className={`absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-4 z-20 transition-[opacity,transform] duration-300 ease-in-out ${
                            expand
                                ? 'opacity-100 translate-y-0 visible'
                                : 'opacity-0 -translate-y-4 invisible'
                        }`}>
                        <div className="flex flex-col gap-3">
                            <Link to="/setting">
                                <div className="flex cursor-pointer items-center gap-3">
                                    <SettingsIcon className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-600 capitalize">
                                        Settings
                                    </span>
                                </div>
                            </Link>
                            <Link to="/profile">
                                <div className="flex cursor-pointer items-center gap-3">
                                    <AccountCircleIcon className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-600 capitalize">
                                        Profile
                                    </span>
                                </div>
                            </Link>
                            <Link to="/">
                                <div className="flex cursor-pointer items-center gap-3">
                                    <AccountCircleIcon className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-600 capitalize">
                                        Home
                                    </span>
                                </div>
                            </Link>
                            <Link to="/quotations">
                                <div className="flex cursor-pointer items-center gap-3">
                                    <AccountCircleIcon className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-600 capitalize">
                                        Quotations
                                    </span>
                                </div>
                            </Link>
                            <div className="flex cursor-pointer items-center gap-3" onClick={handleLogout}>
                                <LogoutIcon className="text-gray-600" />
                                <span className="text-sm font-medium text-gray-600 capitalize">
                                    Log Out
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpBar;
