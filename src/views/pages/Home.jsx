import React, { useEffect, useState } from 'react';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Chart } from 'primereact/chart';
import DescBox from '../components/DescBox';
import Sales from '../components/Sales';
import axios, { Axios } from 'axios';
import { url } from '../../consts/urls';
        
const Home = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [mostSalesData, setMostSalesData] = useState([]);    
    const [dashboradDetails, setDashboradDetails] = useState({});

    const dashboardDescData = [
        { id: 1, title: 'Total Quots', value: `${dashboradDetails.totalQuotations}`, route:'/quotations',enabled:true,icon:<AttachMoneyRoundedIcon style={{ fontSize: '50px', color: '#EC6530FF' }}/> },
        { id: 2, title: 'Quots Totals', value: `KSH ${dashboradDetails.totalAmount}`,enabled:false,icon:<LaptopChromebookRoundedIcon style={{ fontSize: '50px', color: '#EC6530FF' }}/>  },
        { id: 3, title: 'avg Monthly Quots', value: `${dashboradDetails.avgMonthlyQuotationsCount}`,enabled:false,icon:<PersonRoundedIcon style={{ fontSize: '50px', color: '#EC6530FF' }}/>  },
        { id: 4, title: 'avg Quots Totals', value: `KSH ${dashboradDetails.avgMonthlyQuotationsTotal}`,enabled:false,icon:<AddCircleRoundedIcon style={{ fontSize: '50px', color: '#EC6530FF' }}/>  }
    ];


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartOptions(options);
    }, []);


    const handleFetchDashboardDetails = async () => {
        try{
            const response = await axios.get(`${url}/dashboard/details`);
            setDashboradDetails(response.data);
            setChartData(response.data.chartData);
            setMostSalesData(response.data.recentQuotations);
        }catch(error){
            return error;
        }
    }
    useEffect(() => {
        handleFetchDashboardDetails();
    },[])
    return (
        <div className="flex items-center flex-col gap-5 w-full mt-6">
            <div className="w-[90%] md:w-[80%] flex flex-row flex-wrap items-center justify-between gap-5">
                {dashboardDescData.map(item => (
                    <DescBox 
                        key={item.id}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        enabled={item.enabled}
                        route={item.route}
                    />    
                ))}        
            </div>
            <div className="w-[90%] md:w-[80%] flex flex-row flex-wrap  justify-between my-5 gap-5">
                <div className="w-full xl:w-[55%] py-6 px-5 shadow-2xl">
                    <Chart type="line" data={chartData} options={chartOptions} />
                </div>
                <div className="w-full xl:w-[43%] flex flex-col gap-5 shadow-2xl p-5">
                    <span className="text-[15px] md:text-xl text-[#333333] font-[600]">Recent Quotations</span>
                    <div className="flex flex-col">
                        <div className="flex justify-between border-b-2 border-grey-50">
                            <div className="w-[40%]"><span className='text-[13px] md:text-3sm text-[#333333] text-[#33333] font-[700]'>#    Quote No</span></div>
                            <div><span className='text-[13px] md:text-3sm text-[#333333] text-[#33333] font-[700]'>Name</span></div>
                            <div><span className='text-[13px] md:text-3sm text-[#333333] text-[#33333] font-[700]'>Total Amount</span></div>
                        </div>
                        {mostSalesData.map((item, index) => (
                            <Sales 
                                key={item.id} 
                                id={index +1}
                                name={`Quote-${item.id}`}
                                sales={item.name}
                                amount={`ksh. ${item.totalAmount}`}
                                
                            />
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Home;
