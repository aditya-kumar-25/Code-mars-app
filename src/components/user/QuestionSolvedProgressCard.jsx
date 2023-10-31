import React from 'react';
import './QuestionSolvedProgressCard.css'

function QuestionSolvedProgressCard({ title, data }) {
  const temp = data[title].split('/');

  if (title === 'total') {
    console.log('temp --> ', temp);
  }

  const ratio = temp[1] > 0 ? (temp[0] / temp[1]) * 100 : 0;

  return (
    <div className={`min-w-[200px] min-h-[200px] flex flex-col items-center p-4 ${title} border-none progress-card gap-2 justify-center`}>
      <p className=' first-letter:uppercase font-bold text-2xl'>{title}: </p>
      <p>{data[title]}</p>
      <div className='w-[100px] h-[7px] bg-[#3f07f7]'>
        <div
          className='h-[7px] bg-[#72ff07]'
          style={{ width: `${ratio}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuestionSolvedProgressCard;
