import React from 'react'

const Sales = ({
    id,name,sales,amount
}) => {
    return(
        <div className="flex justify-between border-b-2 border-grey-50 py-2">
            <div className='w-[40%]'><span className='text-[13px] md:text-3sm text-[#333333] text-[#33333] font-[400]'>{id}.   {name}</span></div>
            <div><span className='text-[13px] md:text-3sm text-[#333333] text-[#33333] font-[400]'>{sales}</span></div>
            <div><span className='text-[13px] md:text-3sm text-[#333333] text-[#33333] font-[400]'>{amount}</span></div>
        </div>
    )
}

export default Sales
