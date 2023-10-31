import React from "react";
import "./ProblemStatement.css";

function ProblemStatement({ question }) {
  const {
    title,
    description,
    author,
    sample,
    main,
    sampleAnswer,
    mainAnswer,
    tags,
    difficulty,
  } = question;

  return (
    <div
      className={`border-r-[3px] flex flex-col gap-3`}
    >
      <div>
        <div className="font-bold text-3xl">{title}</div>

        <div className="flex flex-col justify-start items-start text-sm mt-2 gap-1">
          <div className=" font-semibold">Authored by: {author}</div>
          <div className={`${difficulty}`}>{difficulty}</div>
        </div>
      </div>

      <div className="font-[600]">{description}</div>

      <p>Sample input: </p>

      <div>{sample}</div>

      <p>Sample Output: </p>

      <div>{sampleAnswer}</div>
    </div>
  );
}

export default ProblemStatement;
