import React, { useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import EnhancedTable from "../components/Table";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { url } from "../../consts/urls";
import { useParams } from "react-router-dom";

const EditQuotation = () => {
    const { id } = useParams();

    const [quotations, setQuotations] = useState({});
    const [expand, setExpand] = useState();
    const [reload, setReload] = useState();
    const [editData, setEditData] = useState({
        quoteId:id,
        description: "",
        name: "",
        phone: ""
    });

    const handleInputChange = (e, key) => {
        setEditData((prev) => ({
            ...prev,
            [key]: e.target.value
        }))
    }

    const rows = [quotations];
    const columns = [
        { id: "QuoteNo", label: "Quote No", align: "left" },
        { id: "description", label: "Description", align: "left" },
        { id: "toName", label: "To Name", align: "left" },
        { id: "toPhone", label: "To Phone", align: "left" },
    ];

    const handleFetchQuotation = async () => {
        try {
            const response = await axios.get(`${url}/quotation/one`, { params: { id } });
            setQuotations(response.data);
        } catch (error) {
            return error;
        }
    }

    const handleOnClick = () => {
        setExpand(!expand);
    };


    useEffect(() => {
        handleFetchQuotation();
    }, [reload]);

    const handleSubmit = async () => {
        try {
            const filteredDetails = Object.fromEntries(
                Object.entries(editData).filter(([key, value]) => value !== undefined && value !== '')
            );

            if (filteredDetails.quoteId) {
                const response = await axios.post(`${url}/quotation/update`, filteredDetails);
                setReload(!reload); 
                toast.success(response.data.message);
            } else {
                toast.error("Please provide a field to update.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating item.");
        }
    }


    return (
        <>
            <ToastContainer />
            <div className="flex w-[100%] justify-center">
                <div className="w-[90%] md:w-[80%] flex flex-col gap-5">
                    <SubHeading
                        name={"Create Quotation"}
                        handleOnClick={handleOnClick}
                    />
                    <div className={`w-full flex mb-10 justify-center overflow-hidden transition-all duration-500 ${expand ? "max-h-[600px]" : "max-h-0"}`}>
                        <div className="w-full px-2 lg:px:0 lg:w-3/4 flex flex-col gap-4 pt-6">
                            <textarea
                                onChange={(e) => handleInputChange(e, 'description')}
                                placeholder="Description"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />
                            <input
                                onChange={(e) => handleInputChange(e, 'name')}
                                type="text"
                                placeholder="To Name"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />
                            <input
                                onChange={(e) => handleInputChange(e, 'phone')}
                                type="text"
                                placeholder="To Phone"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]" />

                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 w-full p-3 pl-4 text-white font-[600]">SUBMIT</button>
                        </div>
                    </div>
                    <EnhancedTable rows={rows} columns={columns} title={"Item-1 Details"} />
                </div>
            </div>
        </>
    );
};

export default EditQuotation;
