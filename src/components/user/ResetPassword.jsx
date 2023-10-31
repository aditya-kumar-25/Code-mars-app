import axios from "axios";
import React, { useState } from "react";
import OtpInput from "./OtpInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import assets from "../../assets";

const baseUrl = import.meta.env.VITE_BASE_API
const resetPasswordUrl = import.meta.env.VITE_USER_RESET_PASSWORD_API

export default function ResetPassword({formData , setFormData}) {

  const [otp , setOtp] = useState(['','','','','',''])

  function changeHandler(e) {

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  }

  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.warn('Password and confirm password do not match')
      return
    }

    try{

      let otpString = otp.join('')

      if(otpString.length < 6) {
        toast.warn('Please enter a valid OTP')
        return
      }

      formData.otp = otpString

      const res = await axios.post(`${baseUrl}${resetPasswordUrl}` , formData)

      toast.success('Password updated successfully')

      navigate('/login')

    } catch (err) {
      toast.warn(`${err?.response?.data?.message}`)
    }
  }

  return (
      <form
        onSubmit={submitHandler}
        className="flex flex-col mx-auto text-white bg-navColor gap-4 mt-7 border border-navColor rounded-lg p-5 shadow-lg shadow-black"
      >
        <div className="flex pb-2 justify-center gap-4 bg-navColor items-center">
          <img src={assets.RemoveBg} className="w-16"></img>
          <div className=" font-bold font-sans text-3xl items-baseline">
            Reset Password
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="password">New Password:</label>
          <input
            className="w-full shadow appearance-none text-black bg-mainbg border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={formData.password}
            placeholder="Enter New Password"
            required
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="w-full shadow appearance-none text-black bg-mainbg border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Your Password"
            required
            name="confirmPassword"
            onChange={changeHandler}
          />
        </div>

        <div>
          <p>OTP:</p>
          <OtpInput otp={otp} setOtp={setOtp} />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
  );
}
