import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../user/Loading";
import { NavLink, useParams } from "react-router-dom";

function EditProfile() {
  const [data, setData] = useState(null);

  const user = useParams().userHandle;

  const [formData, setFormData] = useState({});

  const submitHandler = async (event) => {
    event.preventDefault();

    try{

      const token = Cookies.get('token')

      const res = await axios.post(`${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_EDIT_PROFILE_API}` , {
          data: formData,
          token:token,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      console.log(res);
      toast.success('Profile updated successfully')
    }catch(err){
      console.log(err);
      toast.error('Error updating profile')
    }

  };

  const changeHandler = (event) => {
    setFormData((prev) => {
      const { name, value } = event.target;
      return {
        ...prev,
        [name]: value,
      };
    });
    
    console.log(formData);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = Cookies.get("token");

        const res = await axios.post(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_GET_USER_PROFILE_API
          }`,
          {
            token: token,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(Object.entries(res.data.profile));
        setFormData(res.data.profile);
        setData(Object.entries(res.data.profile));
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div>
      {data ? (
        <div className="flex justify-center items-center bg-mainBg h-[85vh]">
          <form onSubmit={submitHandler} className="flex flex-col bg-white overflow-hidden rounded-lg shadow-lg shadow-black">
          <p className="text-center bg-navColor text-white py-2 font-bold">@<NavLink to={`/dashboard/${user}`} className='italic underline hover:text-blue-500'>{user}</NavLink> Profile</p>
            {data.map((item, index) => {
              return (
                <div key={index}>
                  {item[0] != "_id" && item[0] != "__v" && (
                    <div className="my-2 flex justify-between gap-4 px-3">
                      <label htmlFor={`${item[0]}`} className="font-semibold capitalize">{item[0]}: </label>
                      <input
                        id={`${item[0]}`}
                        type="text"
                        name={item[0]}
                        value={formData[item[0]] ? formData[item[0]] : ''}
                        onChange={changeHandler}
                        key={index}
                        className=" bg-yellow-200 px-4 py-1 rounded-lg"
                        placeholder={`Enter your ${item[0]}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <input type="Submit" className="my-2 bg-navColor text-white mx-auto px-3 py-1 rounded-lg hover:scale-95"/>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default EditProfile;
