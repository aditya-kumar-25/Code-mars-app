import React from 'react'

function Card({title , icon , description , link}) {
  return (
    <div className=' bg-navColor text-white flex flex-col items-center border-[5px] rounded-2xl justify-between  text-center gap-3 px-2 py-3 hover:scale-105 transition duration-300' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
        
          <img src={icon} alt='loading...' loading='lazy' height='20rem' />
        
        <p className='font-bold text-2xl'>{title}</p>

        <p className=' font-sans'>{description}</p>

        <a className='bg-[#4c8126] text-white border-[2px] border-[#4c8126] hover:bg-white hover:text-[#4c8126] py-2 px-6 rounded-3xl font-[700] transition duration-300' href={link} target='_blank' rel='noreferrer'>Learn More</a>

    </div>
  )
}

export default Card
