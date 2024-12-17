import React, { useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { url } from "../../consts/urls";
import { jwtDecode } from "jwt-decode";
import profileImg from '../../assets/images/profile.jpg';

const Profile = ({
    setRefetchUser,
    refetchUser
}) => { 
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    const [profile, setProfile] = useState({});
    const [expand, setExpand] = useState();
    const [reload, setReload] = useState();
    const [editData, setEditData] = useState({
        userId:decodedToken.id,
        firstName: "",
        secondNme: "",
        email:"",
        prevPassword:"",
        password: ""
    });

    const handleInputChange = (e, key) => {
        setEditData((prev) => ({
            ...prev,
            [key]: e.target.value
        }))
    }
    const handleFetchProfileInfo = async () => {
        try {
            const response = await axios.get(`${url}/user/one`, { params: { id: decodedToken.id } });
            setProfile(response.data);

        } catch (error) {
            return error;
        }
    }

    const handleOnClick = () => {
        setExpand(!expand);
    };


    useEffect(() => {
        handleFetchProfileInfo();
    }, [reload]);

    const handleSubmit = async () => {
        
        try {
            const filteredDetails = Object.fromEntries(
                Object.entries(editData).filter(([key, value]) => value !== undefined && value !== '')
            );
            if (filteredDetails.userId) {
                const response = await axios.post(`${url}/user/update`, filteredDetails);
                setReload(!reload); 
                setRefetchUser(!refetchUser);
                toast.success(response.data.message);
                console.log(filteredDetails);
            } else {
                toast.error("Please provide a field to .");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating item.");
        }
    }


    return (
        <>
            <ToastContainer />
            <div className="flex w-[100%] justify-center">
                <div className="w-[90%] md:w-[80%] flex items-center flex-col gap-5">
                    <SubHeading
                        name={"Profile Information"}
                        handleOnClick={handleOnClick}
                    />
                    <div className={`w-full flex mb-10 justify-center overflow-hidden transition-all duration-500 ${expand ? "max-h-[600px]" : "max-h-0"}`}>
                        <div className="w-full px-2 lg:px:0 lg:w-3/4 flex flex-col gap-4 pt-6">

                            <input
                                onChange={(e) => handleInputChange(e, 'firstName')}
                                type="text"
                                placeholder="First Name"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />
                            <input
                                onChange={(e) => handleInputChange(e, 'secondName')}
                                type="text"
                                placeholder="Second Name"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />
                            <input
                                onChange={(e) => handleInputChange(e, 'email')}
                                type="text"
                                placeholder="Email"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />
                            <input
                                onChange={(e) => handleInputChange(e, 'prevPassword')}
                                type="text"
                                placeholder="Previous Password"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />
                            <input
                                onChange={(e) => handleInputChange(e, 'password')}
                                type="text"
                                placeholder="Password"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />

                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 w-full p-3 pl-4 text-white font-[600]">SUBMIT</button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-center w-[90%] lg:w-[70%] shadow-lg mb-5 bg-white rounded-lg overflow-hidden">
                    {/* Profile Image Section */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
                        <img 
                        src={profileImg} 
                        alt="Profile" 
                        className="w-40 h-40 rounded-full object-cover shadow-md"
                        />
                    </div>

                    {/* Profile Information Section */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4 p-6">
                        <h2 className="text-xl lg:text-2xl text-gray-700 font-bold border-b pb-2">
                        Profile Information
                        </h2>
                        <p className="text-2sm lg:text-lg text-gray-600 font-medium">
                        <strong className="text-gray-800">First Name:</strong> {profile.firstName}
                        </p>
                        <p className="text-2sm lg:text-lg text-gray-600 font-medium">
                        <strong className="text-gray-800">Second Name:</strong> {profile.secondName}
                        </p>
                        <p className="text-2sm lg:text-lg text-gray-600 font-medium">
                        <strong className="text-gray-800">Email:</strong> {profile.email}
                        </p>
                    </div>
                </div>

                </div>
            </div>
        </>
    );
};

export default Profile;
