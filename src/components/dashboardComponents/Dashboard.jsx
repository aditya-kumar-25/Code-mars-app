import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../ideComponents/Spinner";
import "./Dashboard.css";
import ProfileInfo from "./ProfileInfo";
import PiChart from "./PiChart";
import GlobalRank from "./GlobalRank";
import HeatMap from "./HeatMap";
import AllSubmissions from "./AllSubmissions";
import Cookies from "js-cookie";
import ProgressBars from "./ProgressBars";

function Dashboard() {
  const user = useParams("userHandle").userHandle;

  const [obj, setObj] = useState(null);

  const [questionInfo , setQuestionInfo] = useState(null);

  useEffect(() => {
    const fetchQuestionInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_GET_USER_API
          }/${user}`
        );
        setQuestionInfo(res.data.data);
        setObj([
          { label: "Easy", value: res.data.data.easy },
          { label: "Medium", value: res.data.data.medium },
          { label: "Hard", value: res.data.data.hard },
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestionInfo();
  }, []);

  return (
    <div className="bg-mainBg min-h-[95vh] grid grid-cols-4 gap-4 p-2">
      {questionInfo && <div className="col-span-1 border-r-[3px] border-black h-[100%]">
        <ProfileInfo user={user} questionInfo={questionInfo} />
      </div>}
      {obj && (
        <div className="col-span-3">
          <div className="flex gap-5 py-3 h-[50vh]">
          <PiChart user={user} data={obj} />
          <ProgressBars data={questionInfo} />
          </div>
          <GlobalRank user={user} />
          <HeatMap user={user} />
          <AllSubmissions user={user} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
