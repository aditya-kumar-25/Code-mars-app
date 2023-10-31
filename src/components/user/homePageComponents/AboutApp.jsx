import React from 'react'

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function AboutApp() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const textToPrint = "with CodeMars :)";

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < textToPrint.length && !reverse) {
        setText((prevText) => prevText + textToPrint.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      } else if (index > 0 && reverse) {
        setText((prevText) => prevText.slice(0, -1));
        setIndex((prevIndex) => prevIndex - 1);
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setReverse((prevReverse) => !prevReverse);
        }, 500);
      }
    }, reverse ? 25 : 100);

    return () => clearInterval(intervalId);
  }, [index, reverse, textToPrint]);

  return (
      <div className='grid grid-cols-2 items-center bg-mainBg'>
        <div className=' pl-3 translate-x-4'>
          <div className='h-[250px] font-bold text-5xl'>
            <p>Hello,</p>
            <p>Start your <br/> Coding Journey</p>
            <p className='text-navColor'>{text}</p>
          </div>

          <NavLink to='/problems' className='bg-[#4c8126] text-white border-[2px] border-[#4c8126] hover:bg-white hover:text-[#4c8126] py-2 px-6 rounded-3xl font-[700] transition duration-300'>Get Started</NavLink>

        </div>
        <img src='./aboutlogo.png' alt='loading' loading='lazy'/>
      </div>
      
  );
}

export default AboutApp
