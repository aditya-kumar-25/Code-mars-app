import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import assets from '../assets/index';
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BASE_API;
const userLoginUrl = import.meta.env.VITE_USER_LOGIN_API;
const adminLoginUrl = import.meta.env.VITE_ADMIN_LOGIN_API;

const Login = ({setIsLoggedin}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isUser, setUser] = useState(true);

  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    try {
      let res = null;
      if (isUser) {
        res = await axios.post(`${baseUrl}${userLoginUrl}`, formData);
      } else {
        res = await axios.post(`${baseUrl}${adminLoginUrl}`, formData);
      }
      
      Cookies.set("token", res.data.token);

      setIsLoggedin(true)

      if (isUser) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      console.log("Error while logging in: ", err);
      toast.warn(`${err?.response?.data?.message}`)
    }
  }

  return (
    <div className="bg-mainBg h-[100vh] py-1 px-3">
      <form
        onSubmit={submitHandler}
        className="max-w-md mx-auto mt-5 bg-navColor text-white border border-navColor rounded-lg shadow-lg shadow-black px-2"
      >
        <div className="flex justify-center gap-4 mt-5 pt-4 bg-navColor items-center">
          <img src={assets.RemoveBg} className="w-16"></img>
          <div className=" font-bold font-sans text-3xl">Log In</div>
        </div>

        <div className="flex justify-center gap-4 items-center mt-5">
          <p className="">Log in as?</p>
          <div className="grid grid-cols-2 gap-3 justify-center bg-gray-600 rounded-3xl hover:cursor-pointer">
            {isUser ? (
              <div
                className="px-5 py-1 bg-black rounded-3xl transition duration-300 "
                onClick={() => {
                  setUser(!isUser);
                }}
              >
                User
              </div>
            ) : (
              <div
                className="px-5 py-1  rounded-3xl transition duration-300"
                onClick={() => {
                  setUser(!isUser);
                }}
              >
                User
              </div>
            )}

            {!isUser ? (
              <div
                className="px-5 py-1 bg-black rounded-3xl transition duration-300"
                onClick={() => {
                  setUser(!isUser);
                }}
              >
                Admin
              </div>
            ) : (
              <div
                className="px-5 py-1 rounded-3xl transition duration-300"
                onClick={() => {
                  setUser(!isUser);
                }}
              >
                Admin
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4  px-8">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={changeHandler}
            required
            className="shadow text-black bg-mainbg appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label htmlFor="password" className="block">
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          {isUser && (
            <NavLink
              to="/account-recovery"
              className="block text-right text-mainBg"
            >
              <i>Forgot your password?</i>
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
