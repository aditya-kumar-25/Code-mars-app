import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Spinner from "../ideComponents/Spinner";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProfileInfo({ user, questionInfo }) {
  const [userHandle, setUserHandle] = useState(null);

  const rk = questionInfo.rank.split('/')[0] , total = questionInfo.rank.split('/')[1];

  const topPercentage = rk/total * 100;
  topPercentage.toFixed(2);

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_USER_VERIFICATION_API
          }`,
          {
            token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        setUserHandle(res.data.userHandle);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_GET_USER_INFO_API
          }/${user}`
        );
        const date = new Date(res.data.profile.dob);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        res.data.profile.dob = formattedDate;
        setData(Object.entries(res.data.profile));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchData();
    fetchUser();
  }, []);

  function editHandler() {
    navigate(`/dashboard/${userHandle}/edit`);
  }
  return (
    <div className="bg-white rounded-lg overflow-hidden mx-2 my-3 shadow-md shadow-black h-[100%]">
      {!isLoading && (
        <div>
          <div className="bg-navColor text-white text-center py-3 flex justify-around px-2 items-center flex-wrap">
            <div>
              <Avatar
                className="cursor-pointer"
                name={userHandle}
                size="50"
                round={true}
              />
            </div>
            <p className="font-bold underline italic text-2xl">{user}</p>
          </div>

          {questionInfo && data && (
            <div className="px-2">
              <div className="text-center font-bold text-2xl bg-blue-200 py-2 rounded-full my-2">
                Gloal ranking
              </div>
              <div className="w-[60%] flex justify-center mx-auto my-4">
                <CircularProgressbar
                  className="font-bold rounded-full global-rank"
                  text={`${questionInfo.rank.split("/")[0]}/${
                    questionInfo.rank.split("/")[1]
                  }`}
                  styles={{
                    path: {
                      stroke: `#FFD700`,
                    },
                    text: {
                      fill: `#000000`,
                    },
                  }}
                />
              </div>
              <div className="text-center font-bold text-2xl bg-blue-200 py-2 rounded-full">
                Top: <span className="italic">{topPercentage}%</span>
              </div>
            </div>
          )}

          {data && questionInfo && (
            <div className="flex flex-col gap-1 mt-3 px-2 bg-yellow-100 rounded-lg m-2 shadow-md shadow-black">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    {item[0] != "_id" && item[0] != "__v" && (
                      <p className=" capitalize">
                        <span className="col-span-[1.5]">{item[0]}</span> : <span className="font-semibold">{item[1] ? item[1] : "NA"}</span>
                      </p>
                    )}
                  </div>
                );
              })}
               {user == userHandle && <button onClick={editHandler} className=" bg-blue-500 shadow-md shadow-black mx-auto px-3 py-1 rounded-lg text-white mb-3 hover:scale-95">Edit</button>}
            </div>
          )}

         
        </div>
      )}

      {isLoading && <Spinner />}
    </div>
  );
}

export default ProfileInfo;
