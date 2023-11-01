import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import Loading from "./Loading";
import ProblemsNavBar from "./ProblemsNavBar";
import QuestionCardSolved from "./QuestionCardSolved";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Problems() {
  const [data, setData] = useState(null);

  const [showTags, setShowTags] = useState(true);

  useEffect(() => {

    let userHandle = null;

    const fetchAll = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_FETCH_ALL_QUESTIONS_API
          }`,
          {
            userHandle: userHandle,
          }
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
        toast.warn("Could not fetch questions, try reloading your page");
      }
    };

    const getUserHandle = async () => {
      const token = Cookies.get("token");
      try {

        const res = await axios.post(`${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_USER_VERIFICATION_API}`, {
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        )

        userHandle = res.data.userHandle;
        fetchAll();
      } catch (err) {
        console.log(err);
        fetchAll();
      }
    };

    
    getUserHandle()
  }, []);

  return (
    <div className="bg-mainBg">
      {!data && <Loading />}
      {data && (
        <div className="bg-mainBg mt-0">
          <ProblemsNavBar showTags={showTags} setShowTags={setShowTags} />
          <div className="flex flex-col p-4 bg-mainBg min-h-[100vh] gap-2 px-2 sm:px-9">
            {data.map((question, index) =>
              !question.solved ? (
                <QuestionCard
                  question={question}
                  index={index}
                  key={index}
                  showTags={showTags}
                />
              ) : (
                <QuestionCardSolved
                  question={question}
                  index={index}
                  key={index}
                  showTags={showTags}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Problems;
