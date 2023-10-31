import React, { useState } from 'react'
import OtpInput from './OtpInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import assets from '../../assets'

function AccountVerification({formData , setIsSubmitted}) {

  const [otp , setOtp] = useState(['','','','','',''])

  const navigate = useNavigate()


    async function submitHandler(event){
        event.preventDefault()

        let otpString = otp.join('')

        formData.otp = otpString

        try{

          console.log('formData: ', formData);

            const res = await axios.post(`${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_USER_SIGN_UP_API}`, formData)

            toast.success('Account created successfully!')
            navigate('/login')

        }catch(err){
            toast.warn(`${err?.response?.data?.message}`)
            console.log('Error while creating account: ', err);
        }
    }

  return (
    <div className='flex justify-center bg-mainBg h-[110vh] p-1'>

        <form onSubmit={submitHandler} className='flex flex-col justify-center items-center gap-3 p-5 h-fit bg-navColor text-white mt-5 rounded-lg shadow-lg shadow-black'>

        <div className="flex justify-center gap-4 mt-5 items-center">
          <img src={assets.RemoveBg} className="w-16"></img>
          <div className=" font-bold font-sans text-3xl items-baseline">
            Sign Up
          </div>
        </div>

            <p>Enter One Time Verification Password:</p>
            <OtpInput otp={otp} setOtp={setOtp} />
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline block w-full"
            />
            <p className='text-right color-mainBg w-full' onClick={()=>setIsSubmitted(false)}>Edit credentials?</p>
        </form>
    </div>
  )
}

export default AccountVerification
