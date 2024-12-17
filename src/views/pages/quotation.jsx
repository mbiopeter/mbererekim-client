import React, { useEffect, useState } from "react";
import SubHeading from "../components/SubHeading";
import EnhancedTable from "../components/Table";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../consts/urls";

const Quotations = () => {
    const [expand, setExpand] = useState(false);
    const [apiData,setapiData]  = useState([]);
    const [reload,setReload] = useState(true);
    const [quotation, setQuotation] = useState({
        name:'',
        phone:'',
        description:'',
    });
    const handleinputOnChange = (e,key) => {
        setQuotation(prev => ({
            ...prev,
            [key]:e.target.value
        }))
    }

    const TableBtn = ({ id }) => (
        <button
            className="bg-red-500 text-white text-sm font-[500] p-2 rounded"
            onClick={() => handleDelete(id)}>
            DELETE
        </button>
    );

    const DetailsBtn = ({ id }) => (
        <Link to={`/quotations/${id}`}>
            <button className="bg-blue-500 text-white text-sm font-[500] p-2 rounded">
                DETAILS
            </button>
        </Link>
    );

    const EditBtn = ({ id }) => (
        <Link to={`/quoteEdit/${id}`}>
            <button className="bg-green-600 text-white text-sm font-[500] p-2 rounded">
                EDIT
            </button>
        </Link>
    );


    const rows = apiData.map((row) => ({
        ...row,
        editBtn: <EditBtn id={row.id} />,
        detailBtn: <DetailsBtn id={row.id} />,
        deleteBtn: <TableBtn id={row.id} />,
    }));

    const columns = [
        { id: "QuoteNo", label: "Quote No", align: "left" },
        { id: "desc", label: "Description", align: "left" },
        { id: "toName", label: "To Name", align: "left" },
        { id: "toPhone", label: "To Phone", align: "left" },
        { id: "editBtn", label: "#", align: "left" },
        { id: "detailBtn", label: "#", align: "left" },
        { id: "deleteBtn", label: "#", align: "left" },
    ];

    const handleOnClick = () => {
        setExpand(!expand);
    };
    
    const handleSubmit = async () => {
        try{
            const response = await axios.post(`${url}/quotation/create`,quotation );
            setReload(!reload);
            toast.success(response.data.message)
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    const handleFetchQuotations = async () => {
        try{
            const response = await axios.get(`${url}/quotation/all`);
            setapiData(response.data);
        }catch(error){
            return error;
        }
    }

    useEffect(() => {
        handleFetchQuotations();
    },[reload]);

    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`${url}/quotation/remove`,{params: {id}})
            setReload(!reload);
            toast.success(response.data.message)
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    return (
        <>
            <ToastContainer />
            <div 
                className="flex w-[100%] justify-center">
                <div 
                    className="w-[90%] md:w-[80%] flex flex-col gap-5">
                    <SubHeading 
                        name={"Create Quotation"} 
                        handleOnClick={handleOnClick} />
                    <div
                        className={`w-full flex mb-10 justify-center overflow-hidden transition-all duration-500 ${
                            expand ? "max-h-[600px]" : "max-h-0"
                        }`}>
                        <div 
                            className="w-full px-2 lg:px:0 lg:w-3/4 flex flex-col gap-4 pt-6">
                            <input
                                onChange={(e) => handleinputOnChange(e, 'name')}
                                type="text"
                                placeholder="Quotation To Name"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                onChange={(e) => handleinputOnChange(e, 'phone')}
                                type="text"
                                placeholder="Quotation To Phone Number"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <textarea
                                onChange={(e) => handleinputOnChange(e, 'description')}
                                placeholder="Quotation Description"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"></textarea>
                            <button 
                                onClick={handleSubmit}
                                className="bg-blue-500 w-full p-3 pl-4 text-white font-[600]">SUBMIT</button>
                        </div>
                    </div>
                    {apiData.length > 0 && <EnhancedTable 
                        rows={rows} 
                        columns={columns} 
                        title={"Quotations"} />}
                </div>
            </div>
        </>
    );
};

export default Quotations;
