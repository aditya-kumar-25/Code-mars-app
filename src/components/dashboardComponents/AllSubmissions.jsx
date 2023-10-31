import axios from "axios";
import React, { useEffect, useState } from "react";
import MySubmissionCard from "../ideComponents/MySubmissionCard";
import Spinner from "../ideComponents/Spinner";

function AllSubmissions({ user }) {
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1);

  const [range, setRange] = useState([0, 4]);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_GET_ALL_SUBMISSIONS_API
          }/${user}`
        );
        setData(res.data?.submissions);
        setTotalPages(Math.ceil(res.data.submissions.length / 5));
        setRange([0, Math.min(4, res.data.submissions.length - 1)]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubmissions();
  }, []);

  function prevHandler(event) {
    if (range[0] == 0) return;

    setPage(page - 1);

    let r = range[0] - 1,  l = r - 4;

    l = Math.max(0, l);
    r = Math.max(0, r);

    l = Math.min(data.length-1 , l);
    r = Math.min(data.length-1 , r);

    setRange([l, r]);


  }

  function nextHandler(event) {
    console.log(data.length);

    if (range[1] == data.length - 1) return;

    setPage(page + 1);

    let l = range[1] + 1 , r = l + 4;
    
    l = Math.max(0, l);
    r = Math.max(0, r);

    l = Math.min(data.length-1 , l);
    r = Math.min(data.length-1 , r);

    setRange([l, r]);
  }

  return (
    <div className="flex flex-col gap-2 shadow-lg shadow-black rounded-lg bg-white overflow-hidden pb-3">
      {!data && <Spinner />}

      {data && (
        <div>
          <div className="text-center font-bold text-xl bg-navColor text-white py-3 min-h-full">
            Recent Submissions
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="p-3 flex flex-col">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    {index >= range[0] && index <= range[1] && (
                      <MySubmissionCard data={item} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between px-4 py-2 items-center">
              <button
                onClick={prevHandler}
                className="px-3 py-1 rounded-lg shadow-md shadow-black hover:scale-90"
              >
                Previous
              </button>
              <p className="font-semibold">
                Page: {page} / {totalPages}
              </p>
              <button
                onClick={nextHandler}
                className="px-3 py-1 rounded-lg shadow-md shadow-black bg-[#3b83ff] text-white hover:scale-90"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllSubmissions;
