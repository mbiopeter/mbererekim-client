import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SubHeading from "../components/SubHeading";
import EnhancedTable from "../components/Table";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { url } from "../../consts/urls";

const QuotationDetails = () => {
    const { id } = useParams();

    const [expand, setExpand] = useState(false);
    const [quotation, setQuotation] = useState({});
    const [reload, setReload] = useState(true);
    const [apiData, setApiData] = useState([]);
    const [quotItems,setQuotItems] = useState({
        quoteId:id,
        unit:"",
        quantity:0,
        rate:0,
        cts:"",
        description:""

    });

    const handleinputOnChange = (e,key) => {
        setQuotItems(prev => ({
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

    const EditBtn = ({ id }) => (
        <Link to={`/editItem/${id}`}>
            <button className="bg-green-500 text-white text-sm font-[500] p-2 rounded">
                EDIT
            </button>
        </Link>
    );

    const rows = apiData.map((row) => ({
        ...row,
        detailaBtn: <EditBtn id={row.id} />,
        deleteBtn: <TableBtn id={row.id} />,
    }));

    const columns = [
        { id: "ItemNo", label: "Item No", align: "left" },
        { id: "desc", label: "Description", align: "left" },
        { id: "quantity", label: "Quantity", align: "left" },
        { id: "unit", label: "Unit", align: "left" },
        { id: "rate", label: "Rate(Ksh)", align: "left" },
        { id: "total", label: "Total(Ksh)", align: "left" },
        { id: "cts", label: "Cts", align: "left" },
        { id: "detailaBtn", label: "#", align: "left" },
        { id: "deleteBtn", label: "#", align: "left" },
    ];

    const handleOnClick = () => {
        setExpand(!expand);
    };

    const handleDownload = () => {
        window.open(`/recept/${id}`, '_blank');
    };

    const fetchQuotationDetails = async () => {
        try{
            const responseData = await axios.get(`${url}/quotation/one`,{params:{id}});
            setQuotation(responseData.data);
        }catch(error){
            return error;
        }
    }

    const handleSubmit = async () => {
        try{
            const response = await axios.post(`${url}/item/create`,quotItems );
            setReload(!reload);
            toast.success(response.data.message);
            setQuotItems({
                quoteId: id,
                unit: "",
                quantity: 0,
                rate: 0,
                cts: "",
                description: ""
            });
                    }catch(error){
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        fetchQuotationDetails();
    },[]);

    const fetchItemsDetails = async () => {
        try{
            const responseData = await axios.get(`${url}/item/all`, {params:{quoteId: id}});
            setApiData(responseData.data);
        }catch(error){
            return error;
        }
    }
    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`${url}/item/remove`,{params: {id}})
            setReload(!reload);
            toast.success(response.data.message)
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        fetchItemsDetails();
    },[reload]);

    let grandTotal = 0;

    apiData.map((item) => {
        grandTotal += item.total
    })
    return (
        <>
            <ToastContainer />
            <div className="flex w-[100%] justify-center">
                <div className="w-[90%] md:w-[80%] flex flex-col gap-5">
                    <SubHeading
                        name={`${quotation.QuoteNo}; To: ${quotation.toName}; Grand Total: Ksh ${grandTotal}`}
                        handleOnClick={handleOnClick}
                        handleDownload={handleDownload}
                        download={true}/>
                    <div
                        className={`w-full flex mb-10 justify-center overflow-hidden transition-all duration-500 ${
                            expand ? "max-h-[600px]" : "max-h-0"}`}>
                        <div 
                            className="w-full px-2 lg:px:0 lg:w-3/4 flex flex-col gap-4 pt-6">
                            <textarea
                                value={quotItems.description} 
                                onChange={(e) => handleinputOnChange(e, 'description')}
                                placeholder="Description"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"></textarea>
                            <input
                                value={quotItems.quantity} 
                                onChange={(e) => handleinputOnChange(e, 'quantity')}
                                type="number"
                                placeholder="Quantity"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={quotItems.unit} 
                                onChange={(e) => handleinputOnChange(e, 'unit')}
                                type="text"
                                placeholder="Unit"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={quotItems.rate} 
                                onChange={(e) => handleinputOnChange(e, 'rate')}
                                type="number"
                                placeholder="Rate"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>
                            <input
                                value={quotItems.cts} 
                                onChange={(e) => handleinputOnChange(e, 'cts')}
                                type="text"
                                placeholder="Cts"
                                className="p-2 pl-4 bg-[#f1f0f0] rounded focus:outline-none focus:border-[#4956e2] focus:ring-2 focus:ring-[#4956e2]"/>

                            <button 
                                onClick={handleSubmit}
                                className="bg-blue-500 w-full p-3 pl-4 text-white font-[600]">SUBMIT</button>
                        </div>
                    </div>
                    {apiData.length > 0 && <EnhancedTable 
                        rows={rows} 
                        columns={columns} 
                        title={"Quotation Items"} />}
                </div>
            </div>
        </>
    );
};

export default QuotationDetails;
