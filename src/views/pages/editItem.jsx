import React, { useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import EnhancedTable from "../components/Table";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { url } from "../../consts/urls";
import { useParams } from "react-router-dom";

const EditItem = () => {

    const { id } = useParams();
    const [expand, setExpand] = useState(false);
    const [item, setItem] = useState({});
    const [reload, setReload] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        itemId: id,
        description: undefined,
        quantity: undefined,
        unit: undefined,
        rate: undefined,
        cts: undefined
    });

    // Handle input changes and update state
    const handleInputChange = (e, key) => {
        setEditedDetails(prev => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    const rows = [item];
    const columns = [
        { id: "itemNo", label: "Item No", align: "left" },
        { id: "desc", label: "Description", align: "left" },
        { id: "quantity", label: "Quantity", align: "left" },
        { id: "unit", label: "Unit", align: "left" },
        { id: "rate", label: "Rate (Ksh)", align: "left" },
        { id: "total", label: "Total (Ksh)", align: "left" },
        { id: "cts", label: "Cts", align: "left" },
    ];

    const handleOnClick = () => {
        setExpand(!expand);
    };

    const fetchItemDetails = async () => {
        try {
            const itemData = await axios.get(`${url}/item/one`, { params: { id } });
            setItem(itemData.data);
            setEditedDetails(prev => ({
                ...prev,
                description: itemData.data.description,
                quantity: itemData.data.quantity,
                unit: itemData.data.unit,
                rate: itemData.data.rate,
                cts: itemData.data.cts,
            }));
        } catch (error) {
            console.error("Error fetching item details:", error);
            toast.error("Failed to fetch item details.");
        }
    };

    useEffect(() => {
        fetchItemDetails();
    }, [reload]);

    const handleSubmit = async () => {
        try {
            const filteredDetails = Object.fromEntries(
                Object.entries(editedDetails).filter(([key, value]) => value !== undefined && value !== '')
            );

            if (filteredDetails.itemId) {
                const response = await axios.post(`${url}/item/update`, filteredDetails);
                setReload(!reload); 
                toast.success(response.data.message);
                setEditedDetails({
                    itemId: id,
                    description: undefined,
                    quantity: undefined,
                    unit: undefined,
                    rate: undefined,
                    cts: undefined
                })
            } else {
                toast.error("Please provide a field to update.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating item.");
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="flex w-[100%] justify-center">
                <div className="w-[90%] md:w-[80%] flex flex-col gap-5">
                    <SubHeading name={`EDIT: ${item.quoteNo}; To: ${item.name}; Phone: ${item.phone}`} handleOnClick={handleOnClick} />
                    <div className={`w-full flex mb-10 justify-center overflow-hidden transition-all duration-500 ${expand ? "max-h-[600px]" : "max-h-0"}`}>
                        <div className="w-full px-2 lg:px:0 lg:w-3/4 flex flex-col gap-4 pt-6">
                            <textarea
                                value={editedDetails.description}
                                onChange={(e) => handleInputChange(e, 'description')}
                                placeholder="Description"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={editedDetails.quantity}
                                onChange={(e) => handleInputChange(e, 'quantity')}
                                type="text"
                                placeholder="Quantity"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={editedDetails.unit}
                                onChange={(e) => handleInputChange(e, 'unit')}
                                type="text"
                                placeholder="Unit"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={editedDetails.rate}
                                onChange={(e) => handleInputChange(e, 'rate')}
                                type="text"
                                placeholder="Rate"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={editedDetails.cts}
                                onChange={(e) => handleInputChange(e, 'cts')}
                                type="text"
                                placeholder="Cts"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
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

export default EditItem;
