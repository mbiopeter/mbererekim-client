import React from 'react'
import { Link } from 'react-router-dom'

const DescBox = ({
    title, value, icon,route, enabled,
}) => {
    return(
        <div className="w-full sm:w-[45%] lg:w-[23%] min-w-[200px] h-[150px] flex flex-col shadow-lg">
            <div className="w-full items-center h-[75%] flex flex-row">
                <div className="w-1/4 h-full flex items-center justify-center">
                    {icon}
                </div>
                <div className="w-3/4 h-full p-2 flex flex-col gap-2">
                    <span className='text-[#333333] text-[15px] md:text-[16px] font-[700] uppercase'>{title}</span>
                    <span className='text-[#ecb330d2] text-[20px] mdtext-[25px] font-[800] uppercase'>{value}</span>
                </div>
            </div>
            <Link to={enabled ? route: null} className='h-[25%]'>
                <div className={`w-full h-[100%] flex items-center justify-center bg-blue-500 ${enabled ?'cursor-pointer':'cursor-not-allowed'}`}>
                    <span className='text-[13px] md:text-2sm text-[#3333333] uppercase text-center font-[600] text-white'>View details</span>
                </div>
            </Link>
        </div>
    )
}

export default DescBox
