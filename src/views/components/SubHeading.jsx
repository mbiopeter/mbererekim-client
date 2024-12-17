import React from 'react'
import { Button } from 'primereact/button';
import AddIcon from '@mui/icons-material/Add';

const SubHeading = ({
    name, handleOnClick, handleDownload, download
}) => {
    return (
        <div className='w-[100%] flex flex-wrap gap-5 justify-between items-center shadow-lg py-3 px-1'>
            <span className='text-sm md:text-lg text-[#333333] font-[500]'>{name}</span>
            <div
            className='flex flex-row gap-2'>
                {download && <Button onClick={handleDownload} label='DOWNLOAD' className=' text-sm bg-teal-700 uppercase text-white font-[600] py-2 px-5 rounded'/>}
                <Button onClick={handleOnClick} label={<AddIcon />}  className='text-sm bg-blue-500 uppercase text-white font-[600] py-2 px-5 rounded'/>
            </div>
        </div>
    )
}

export default SubHeading
