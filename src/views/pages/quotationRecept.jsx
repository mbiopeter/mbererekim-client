import React, { useEffect, useState } from 'react';
import '@fontsource/great-vibes'; // Import the signature font
import axios from 'axios';
import { url } from '../../consts/urls';
import { useParams } from 'react-router-dom';

const QuotationReceipt = () => {
    useEffect(() => {
        window.print();
    }, []);

    const { id } = useParams();

    const [companyInfo, setCompanyInfo] = useState({});
    const [items, setItems] = useState([]);
    const [ quotation, setQuotation] = useState({});
    
    let grandTotal = 0
    items.map((item) => {
        grandTotal += item.total
    })

    //fetch company profile information
    const handleFetchDetails = async () => {
        try {
            const results = await axios.get(`${url}/profile/all`);
            
            // Transform the data into an object
            const transformedData = results.data.reduce((acc, { title, value }) => {
                const formattedTitle = title.replace(/\s+/g, '_');
                acc[formattedTitle] = value;
                return acc;
            }, {});
            setCompanyInfo(transformedData);
        } catch (error) {
            return error;
        }
    };
    const handleFetchItemsDetails = async () => {
        try{
            const responseData = await axios.get(`${url}/item/all`, {params:{quoteId: id}});
            setItems(responseData.data);
        }catch(error){
            return error;
        }
    }
    const handleFetchQuotationDetails = async () => {
        try{
            const res = await axios.get(`${url}/quotation/one`, {params:{id}});
            setQuotation(res.data);
        }catch(error){
            return error;
        }
    }
    useEffect(() => {
        handleFetchDetails();
        handleFetchItemsDetails();
        handleFetchQuotationDetails();
    },[])
    return (
        <div 
            className="p-6 max-w-3xl mx-auto bg-white shadow-md border rounded-md print:border-none print:shadow-none print:border-none">
            {/* Header Section */}
            <div 
                className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                    <h1 
                        className="text-2xl font-bold text-gray-800">Quotation</h1>
                    <p 
                        className="text-gray-600">Quotation #: {quotation.QuoteNo}</p>
                    <p 
                        className="text-gray-600">Date: {quotation.date}</p>
                </div>
                <div>
                    <h2 
                        className="text-xl font-semibold text-gray-800">{companyInfo.Company_Name}</h2>
                    <h1 
                        className="text-2sm font-semibold text-gray-800">{companyInfo.Address}</h1>
                    <h1 
                        className="text-2sm font-semibold text-gray-800">EMAIL: {companyInfo.Email_Address}</h1>
                    <h1 
                        className="text-2sm font-semibold text-gray-800">PHONE NUMBER: {companyInfo.Phone_Number}</h1>
                    <h1 
                        className="text-2sm font-semibold text-gray-800">KRA PIN: {companyInfo.KRA}</h1>
                    <div className="flex flex-row gap-4 items-center">
                        <h1
                            className="text-2sm font-semibold text-gray-800">Authorized Signature:</h1>
                        <span
                            className="text-2xl text-gray-800"
                            style={{ fontFamily: '"Great Vibes", cursive' }}>
                            {companyInfo.Signature}
                        </span>
                    </div>
                </div>
            </div>

            {/* Recipient Section */}
            <div className="mb-6">
                <p className="text-gray-800 font-semibold">To:</p>
                <p className="text-gray-600"> {quotation.toName}</p>
                <p className="text-gray-600"> {quotation.toPhone}</p>
            </div>

            {/* Table Section */}
            <div className="overflow-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Qty</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length >0 && items.map((item, index) => (<tr>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{item.desc}</td>
                            <td className="border px-4 py-2">{item.quantity} {item.unit}</td>
                            <td className="border px-4 py-2">Ksh{item.rate}</td>
                            <td className="border px-4 py-2">Ksh{item.total}</td>
                        </tr>))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="border px-4 py-2 text-right font-semibold">Grand Total</td>
                            <td className="border px-4 py-2 font-semibold">Ksh{grandTotal}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Payment Instructions */}
            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800">Payment Instructions</h3>
                <p className="text-gray-600">Equity Bank</p>
                <p className="text-gray-600">Acc No.: {companyInfo.Equity_Account}</p>
                <p className="text-gray-600">Name: {companyInfo.Equity_Name}</p>
                <p className="text-gray-600 font-[800] mt-4">Alternatives</p>
                <p className="text-gray-600">Pay Bill: {companyInfo.Paybill}</p>
                <p className="text-gray-600">A/C Number: {companyInfo.Paybill_Account}</p>
                <p className="text-gray-600 mt-4">Send Money: {companyInfo.Send_Money_Number}</p>
                <p className="text-gray-600 ">Name: {companyInfo.Send_Money_Name}</p>
            </div>
        </div>
    );
};

export default QuotationReceipt;
