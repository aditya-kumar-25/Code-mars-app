import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
// import RemoveBg from '../../assets/removebg.png';
import { NavLink, useNavigate } from "react-router-dom";
import assets from "../../assets";
import Avatar from "react-avatar";

const baseUrl = import.meta.env.VITE_BASE_API;
const verificationUrl = import.meta.env.VITE_USER_VERIFICATION_API;

const NavBar = ({ isLoggedin, setIsLoggedin }) => {
  const [userHandle, setUserHandle] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    const verifyUser = async () => {
      try {
        const res = await axios.post(
          `${baseUrl}${verificationUrl}`,
          {
            token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserHandle(res.data.userHandle);
        setIsLoggedin(true);
      } catch (err) {
        console.log("Error while verifying user: ", err);
      }
    };

    verifyUser();
  }, [isLoggedin]);

  return (
    <div className="flex w-full justify-between bg-navColor text-white items-center px-4 h-[18%] py-2">
      <div className="flex items-center">
        <NavLink to="/">
          <img src={assets.RemoveBg} alt="loading.." className="h-20" />
        </NavLink>
      </div>

      <div className="sm:flex gap-4 hidden items-center">
        <NavLink
          to="/problems"
          className="bg-[#297e3b] px-2 py-1 rounded-md hover:cursor-pointer hover:bg-[#205d2d]"
        >
          Problems
        </NavLink>
        <NavLink
          to="/contact-us"
          className="bg-[#0858f8] px-2 py-1 rounded-md hover:cursor-pointer hover:bg-[#739df0]"
        >
          Contact Us
        </NavLink>
      </div>

      <div className="flex items-center">
        {!isLoggedin ? (
          <div className="flex flex-wrap gap-3 font-[600]">
            <NavLink
              to="/login"
              className="bg-white text-navColor px-3 py-1 rounded-md hover:cursor-pointer"
            >
              Log in
            </NavLink>
            <NavLink
              to="/sign-up"
              className="bg-slate-500 px-3 py-1 rounded-md"
            >
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <NavLink
              to='/login'
              className="font-[600] bg-white text-navColor px-3 py-1 rounded-md hover:cursor-pointer"
              onClick={() => {
                Cookies.remove("token");
                setIsLoggedin(false);
              }}
            >
              Logout
            </NavLink>
         {userHandle && <div className="rounded-full overflow-hidden">
          <Avatar
              onClick={() => {
                navigate(`/dashboard/${userHandle}`);
              }}
              className="cursor-pointer"
              name={userHandle}
              size="50"
              round="20px"
            ></Avatar></div>}
          </div>
        )}
        <button
          className="sm:hidden ml-4 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4">
          <NavLink to={'/problems'}>Problems</NavLink>
          <NavLink to={'/problems'}>Contact Us</NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
