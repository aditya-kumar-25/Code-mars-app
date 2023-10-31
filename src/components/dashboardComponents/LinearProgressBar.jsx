import React from "react";
import "./LinearProgressBar.css";
function LinearProgressBar({ data }) {
  const { label, value, solved, total } = data;

  console.log(data);

  return (
    <div className="flex flex-col">
      <p className="font-bold text-lg">{label}: </p>
      <div className="flex items-center gap-3">
        <div className="h-2 w-[100px] rounded-md bg-[#5c5050]">
          {typeof value === "number" && value > 0 && (
            <div
              className={`h-full rounded-md ${label}`}
              style={{ width: `${value}%` }}
            ></div>
          )}
        </div>
        <p className={`font-semibold ${label}`}>
          {solved} / {total}
        </p>
      </div>
    </div>
  );
}

export default LinearProgressBar;
