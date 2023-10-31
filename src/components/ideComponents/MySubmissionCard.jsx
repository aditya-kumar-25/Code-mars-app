import React from 'react'
import './MySubmissionCard.css'
import { NavLink } from 'react-router-dom';

function MySubmissionCard({data}) {

    const { title , verdict , date } = data;

    let vClass = 'correct';
    if(verdict.includes('Wrong'))vClass = 'wrong';

    return (
        <div className={`flex flex-col px-3 py-1 ${vClass} shadow-md shadow-[#b59b9b] text-black rounded-md my-1 border border-black`}>
            <div className='flex justify-between px-2 gap-7 items-center'>
                <NavLink to={`/ide/${data.qid}`} className='font-bold text-xl italic underline hover:text-[#6259d8]'>{title}</NavLink>
                <div className=" font-semibold">{verdict}</div>
            </div>
            <div className="text-right">Submitted on: {new Date(date).toLocaleDateString()}</div>
        </div>
    );
}

export default MySubmissionCard
