import React from 'react'
import './ProblemStatement.css'

function CustomTestCase({obj , backlightMode}) {

    const {testcase , setTestcase, output , setOutput} = obj;

  return (
    <div className='mt-5 pr-3 flex flex-col gap-4 pb-5'>
        <form onSubmit={(event)=>event.preventDefault()} className='flex flex-col '>
            <label htmlFor="custom-input">Custom Input:</label>
            <textarea id='custom-input' value={testcase} onChange={(e)=>setTestcase(e.target.value)} className={`min-w-[300px] p-3 min-h-[200px] border-[2px] rounded-md background-color-${backlightMode}`}/>
        </form>

        <form onSubmit={(event)=>event.preventDefault()} className='flex flex-col '>
            <label htmlFor="output">Output:</label>
            <textarea id='output' value={output} onChange={(e)=>setOutput(e.target.value)} className={`min-w-[300px] p-3 min-h-[200px] border-[2px] rounded-md background-color-${backlightMode}`}/>
        </form>
    </div>
  )
}

export default CustomTestCase
