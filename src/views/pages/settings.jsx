import React, { useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import EnhancedTable from "../components/Table";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { url } from "../../consts/urls";


const Settings = () => {


    const [expand, setExpand] = useState(false);
    const [reload, setReload] = useState(true);
    const [details , setDetails] = useState([]);
    const [inputDetails, setInputDetails] = useState({
        name:'',
        address:'',
        email:'',
        phone:'',
        kra:'',
        Signature:'',
        equityAccount:'',
        equityName:'',
        paybill:'',
        paybillAccount:'',
        sendMoneyNumber:'',
        sendMoneyName:''
    });

    const handleinputOnChange = (e,key) => {
        setInputDetails(prev => ({
            ...prev,
            [key]:e.target.value
        }))
    }



    const handleOnClick = () => {
        setExpand(!expand);
    };

    const handleSubmit = async () => {
        try {
            const isAllEmpty = Object.values(inputDetails).every(value => value === undefined || value === '');
            if (isAllEmpty) {
                toast.error("At least one field is required.");
                return;
            }

            const filteredDetails = Object.fromEntries(
                Object.entries(inputDetails).filter(([key, value]) => value !== undefined && value !== '')
            );

            const response = await axios.post(`${url}/profile/update`, filteredDetails);
            setReload(!reload);
            toast.success(response.data.message);
            setInputDetails({
                name:'',
                address:'',
                email:'',
                phone:'',
                kra:'',
                Signature:'',
                equityAccount:'',
                equityName:'',
                paybill:'',
                paybillAccount:'',
                sendMoneyNumber:'',
                sendMoneyName:''
            })
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    const handleFecthDaetails = async () => {
        try{
            const results = await axios.get(`${url}/profile/all`);
            setDetails(results.data);
        }catch(error){
            return error;
        }
    }

    useEffect(() => {
        handleFecthDaetails();
    },[reload])

    return (
        <>
            <ToastContainer />
            <div 
                className="flex w-[100%] justify-center">
                <div 
                    className="w-[90%] md:w-[80%] flex flex-col gap-5">
                    <SubHeading name={"Company Profile Information"} handleOnClick={handleOnClick} />
                    {/* input form */}
                    <div
                        className={`w-full flex mb-10 justify-center overflow-hidden transition-all duration-500 ${
                            expand ? "max-h-[1500px]" : "max-h-0"
                        }`}>
                        <div className="w-full px-2 lg:px:0 lg:w-3/4 flex flex-col gap-4 pt-6">
                            <div className="w-full flex flex-col md:flex-row gap-5">
                                <input
                                    value={inputDetails.name}
                                    onChange={(e) => handleinputOnChange(e, 'name')}
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                                <input
                                    value={inputDetails.address}
                                    onChange={(e) => handleinputOnChange(e, 'address')}
                                    type="text"
                                    placeholder="Address"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5">
                                <input
                                    value={inputDetails.email}
                                    onChange={(e) => handleinputOnChange(e, 'email')}
                                    type="text"
                                    placeholder="Email"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                                <input
                                    value={inputDetails.phone}
                                    onChange={(e) => handleinputOnChange(e, 'phone')}
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5">
                                <input
                                    value={inputDetails.kra}
                                    onChange={(e) => handleinputOnChange(e, 'kra')}
                                    type="text"
                                    placeholder="KRA PIN"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                                <input
                                    value={inputDetails.Signature}
                                    onChange={(e) => handleinputOnChange(e, 'signature')}
                                    type="text"
                                    placeholder="Signature"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5">
                                <input
                                    value={inputDetails.equityAccount}
                                    onChange={(e) => handleinputOnChange(e, 'equityAccount')}
                                    type="text"
                                    placeholder="Equity Bank Account Nuumber"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                                <input
                                    value={inputDetails.equityName}
                                    onChange={(e) => handleinputOnChange(e, 'equityName')}
                                    type="text"
                                    placeholder="Equity Account Name"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5">
                                <input
                                    value={inputDetails.paybill}
                                    onChange={(e) => handleinputOnChange(e, 'paybill')}
                                    type="text"
                                    placeholder="Paybill Number"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                                <input
                                    value={inputDetails.paybillAccount}
                                    onChange={(e) => handleinputOnChange(e, 'paybillAccount')}
                                    type="text"
                                    placeholder="Paybill Account Number"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5">
                                <input
                                    value={inputDetails.sendMoneyNumber}
                                    onChange={(e) => handleinputOnChange(e, 'sendMoneyNumber')}
                                    type="text"
                                    placeholder="Send Money Number"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                                <input
                                    value={inputDetails.sendMoneyName}
                                    onChange={(e) => handleinputOnChange(e, 'sendMoneyName')}
                                    type="text"
                                    placeholder="Send Money Name"
                                    className="w-[100%] md:w-[48%] p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 w-full p-3 pl-4 text-white font-[600]">SUBMIT</button>
                        </div>
                    </div>

                    {/* company information */}
                    {details.length > 0 &&<div className="w-full flex items-center shadow-lg">
                        <span className="text-2xl p-5 text-gray-600 font-[500]">Profile Information</span>
                    </div>}
                    <div className="w-full flex flex-wrap flex-col lg:flex-row justify-between gap-5 p-4 bg-gray-100">
                        {details.length > 0 && details.map((item) => (
                            <div key={item.id} className="w-full lg:w-[48%] flex flex-col gap-5 p-4 rounded-md">
                                <div className="w-full flex flex-row justify-between items-center">
                                <div className="w-1/2">
                                    <span className="text-sm text-gray-700 font-medium">{item.title}:</span>
                                </div>
                                <div className="w-1/2">
                                    <span className="text-sm text-gray-700 font-medium">{item.value}</span>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
