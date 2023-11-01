import React, { useState } from "react";
import { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LinearProgressBar from "./LinearProgressBar";

function ProgressBars({ data }) {
  const { easy, medium, hard, total, totalEasy, totalMedium, totalHard } = data;

  console.log(data);

  console.log(easy, medium, hard, total);

  let a = total.split("/");

  const percentage = ((a[0] / a[1]) * 100).toFixed(2);

  const [percentSolved, setPercentSolved] = useState([
    easy / totalEasy * 100,
    medium / totalMedium * 100,
    hard / totalHard * 100,
  ]);

  setTimeout(() => {
    console.log(percentSolved);
  }, 3000);

  const progressData = [
    {
        label: "Easy",
        value: percentSolved[0],
        solved: easy,
        total: totalEasy,

    }, 
    {
        label: "Medium",
        value: percentSolved[1],
        solved: medium,
        total: totalMedium,
    }, 
    {
        label: "Hard",
        value: percentSolved[2],
        solved: hard,
        total: totalHard,
    },
];

  return (
    <div className="bg-navColor text-white rounded-lg shadow-lg shadow-black flex items-center justify-between gap-2 p-3 hover:scale-105 transition duration-[0.5s]">
      <div className="flex flex-col w-[50%] h-[100%] items-center gap-3 justify-center">
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
        <p className="font-bold text-lg text-green-500"> Total solved</p>
      </div>

        <div>
            {
                progressData.map((item , index)=>{
                    return <LinearProgressBar data={item} key={index} />
                })
            }
        </div>

    </div>
  );
}

export default ProgressBars;
