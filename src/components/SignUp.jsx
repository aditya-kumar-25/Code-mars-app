import React, { useState } from "react";
import { toast } from "react-toastify";
import AccountVerification from "./user/AccountVerification";
import { NavLink } from "react-router-dom";
import axios from "axios";
import assets from "../assets";

const baseUrl = import.meta.env.VITE_BASE_API;
const signupOtpUrl = import.meta.env.VITE_USER_SIGN_UP_OTP_API;

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userHandle: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}${signupOtpUrl}`, {
        email: formData.email,
        userHandle: formData.userHandle,
      });

      toast.success("OTP sent successfully!");

      setIsSubmitted(true);
    } catch (err) {
      console.log("Error while sending OTP: ", err);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <AccountVerification formData={formData} setIsSubmitted={setIsSubmitted} />
      ) : (
        <div className="bg-mainBg h-[110vh] py-5">
          <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto my-5 bg-navColor border rounded-md text-white border-navColor shadow-lg shadow-black"
      >
        <div className="flex justify-center gap-4 mt-5 pt-4 bg-navColor items-center">
          <img src={assets.RemoveBg} className="w-16"></img>
          <div className=" font-bold font-sans text-3xl items-baseline">
            Sign Up
          </div>
        </div>
        <div className="flex flex-col gap-2 py-4  px-8">
          <label htmlFor="userHandle" className="block ">
            User Handle:
          </label>
          <input
            type="text"
            id="userHandle"
            value={formData.userHandle}
            placeholder="Enter your user handle"
            onChange={changeHandler}
            required
            className="shadow text-black bg-mainbg appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label htmlFor="email" className="block ">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            placeholder="Enter your email address"
            onChange={changeHandler}
            required
            className="shadow appearance-none text-black bg-mainbg border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label htmlFor="password" className="block  ">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={changeHandler}
            required
            className="shadow appearance-none text-black bg-mainbg border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label htmlFor="confirmPassword" className="block">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={changeHandler}
            required
            className="shadow appearance-none text-black bg-mainbg border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <NavLink to="/login" className="text-right color-mainBg">
            <i>Already have an account?</i>
          </NavLink>
        </div>
         </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
