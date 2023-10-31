import axios from "axios";
import React, { useState } from "react";
import assets from "../../assets";


const baseUrl = import.meta.env.VITE_BASE_API
const sendOtpUrl = import.meta.env.VITE_USER_RESET_PASSWORD_OTP_API


export default function AccountRecoveryEmail({formData , setFormData , setReset}) {

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
      event.preventDefault()

      try{
        const res = await axios.post(`${baseUrl}${sendOtpUrl}`, {
          email : formData.email
        })
        setReset(true)
      } catch(err){
        console.log('Error after sending otp for resetting password: ', err);
        alert(`${err?.response?.data?.message}`)
      }

  }

  return (
    <div className="bg-mainBg h-[100vh] md:p-7 p-2">
       <form
        onSubmit={submitHandler}
        className="flex flex-col min-w-[260px]  mx-auto text-white bg-navColor gap-4 sm:p-4 md:p-8 p-8 mt-9 rounded-lg shadow-lg shadow-black"
      >
        <div className="flex pb-2 justify-center gap-4 bg-navColor items-center">
          <img src={assets.RemoveBg} className="w-16"></img>
          <div className=" font-bold font-sans text-3xl items-baseline">
            Account Recovery
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email">Email:</label>
          <input
            className="w-full shadow appearance-none text-black bg-mainbg border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={formData.email}
            placeholder="Enter your email address"
            required
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </form> 
    </div>
  );
}
