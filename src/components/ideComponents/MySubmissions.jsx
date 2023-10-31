import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import MySubmissionCard from "./MySubmissionCard";
import { useNavigate } from "react-router-dom";

function MySubmissions({ qid, isLoggedin}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = Cookies.get("token");
      console.log(
        `${import.meta.env.VITE_BASE_API}${
          import.meta.env.VITE_MY_SUBMISSIONS_API
        }/${qid}`
      );
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_MY_SUBMISSIONS_API
          }`,
          {
            id: qid,
            token: token,
          }
        );
        setData(res.data?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSubmissions();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {!isLoggedin ? (
        <div className="flex flex-col justify-between gap-2">
          <div className="text-2xl font-bold">My Submissions</div>
          <div className="text-xl font-semibold">
            Please login to view your submissions
          </div>
          <button onClick={(e)=>navigate('/login')} className="bg-[#1e47fc] text-white px-3 py-1 rounded-lg w-[50%] font-semibold">Log in</button>
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="px-1 flex flex-col gap-2 mb-[300px] mt-[50px]">
                {
                  data.map( (obj , index) => {
                    return <MySubmissionCard data={obj} key={index} />;
                  } )
                }
            </div>
          ) : data ? (
            <div>No submissions yet..</div>
          ) : (
            <div className="mt-[150px]">
                <Spinner />
            </div>
          
          )}
        </>
      )}
    </div>
  );
}

export default MySubmissions;
