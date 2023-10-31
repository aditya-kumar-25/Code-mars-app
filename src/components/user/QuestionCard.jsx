import React from "react";
import "./QuestionCard.css";
import { useNavigate, useParams } from "react-router-dom";

function QuestionCard({ question, showTags, index }) {
  const navigate = useNavigate();

  const clickHandler = (event) => {
    navigate(`/ide/${question._id}`);
  };

  return (
    <div
      className={`flex justify-between px-3 py-3 question-card shadow-sm shadow-black border-black border-[2px]`}
    >
      <div className="flex gap-4 items-center">
        <p>{index + 1})</p>
        <p className="font-bold text-xl">{question.title}</p>
        <p className={`${question.difficulty}`}>{question.difficulty}</p>
        {showTags && (
          <div className="flex gap-2 text-sm text-white">
            {question.tags.map((obj, index) => {
              return (
                index < 10 && (
                  <p
                    key={index}
                    className="rounded-lg bg-navColor px-1 py-[.5px]"
                  >
                    {obj}
                  </p>
                )
              );
            })}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-[#3a9b33] text-white px-3 py-1 border-[2px] border-black rounded-2xl font-[600] hover:bg-[#2a6826] ml-2"
          onClick={clickHandler}
        >
          Solve
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
