import React , { useState }from 'react';
import { toast } from 'react-toastify';
import assets from '../../../assets';

const Footer = () => {

  const [feedBack , setFeedBack] = useState('')

  function submitHandler(event){
    event.preventDefault()
    
    if(feedBack != '')
    toast.success('Feedback submitted successfully!')    
  }

  function changeHandler(event){
    setFeedBack(event.target.value)
  }
  

  return (
    <footer className="bg-navColor pt-10 sm:mt-10">

      <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12 -translate-x-3">
          <img src={assets.RemoveBg} className="text-white "></img>
          <div className="my-4">
            <p className="text-white text-sm">
              Grow your coding skills with CodeMars
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-white font-medium mb-6">
            Links
          </div>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            About
          </a>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            Services
          </a>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            Projects
          </a>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            Contact Us
          </a>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-white font-medium mb-6">
            Other Links
          </div>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            FAQ
          </a>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            Terms of Use
          </a>
          <a href="#" className="my-3 block text-white text-sm hover:text-gray-500">
            Privacy Policy
          </a>
        </div>

        {/* Column 4 */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <form onSubmit={submitHandler} className='flex flex-col items-center justify-center'>
              <label htmlFor='feedback' className='text-white'>Send us your feedback:</label>
              <textarea id='feedback' value={feedBack} onChange={changeHandler}  className='bg-navColor text-white p-2 mt-3 border-2 border-white w-[66%]' placeholder='Enter feedback here...'/>
              <input type='submit' value='Submit' className='text-white block hover:cursor-pointer border border-white py-1 px-3 rounded-2xl mt-3'/>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 
          border-t border-gray-500 text-gray-400 text-sm 
          flex-col md:flex-row max-w-6xl"
        >
          <div className="mt-2">
            © 2021 Company, Inc. All Rights Reserved.
          </div>

          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="#" className="w-6 mx-1">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            
            <a href="#" className="w-6 mx-1">
              <i className="fab fa-youtube fa-lg"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>

        </div>
      </div>


    </footer>
  );
};

export default Footer;
