import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../user/Loading";
import { toast } from "react-toastify";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";
import "./Ide.css";

// LIGHT AND DARK MODE SELECTION
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import Discussion from "./Discussion";
import MySubmissions from "./MySubmissions";
import CustomTestCase from "./CustomTestCase";
import Spinner from "./Spinner";
import Cookies from "js-cookie";

function Ide({ isLoggedin }) {
  const id = useParams("id").id;

  const [question, setQuestion] = useState(null);

  const [testcase, setTestcase] = useState("");
  const [output, setOutput] = useState("");

  const inputOutput = {
    testcase,
    setTestcase,
    output,
    setOutput,
  };

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_FETCH_QUESTION_API
          }/${id}`
        );
        setQuestion(res.data.question);
        setTestcase(res.data.question.sample);
      } catch (err) {
        toast.warn("Unknow error while loading the question");
      }
    };

    getQuestion();
  }, []);

  const [backlightMode, setBackLightMode] = useState("light");

  const modeClickHandler = () => {
    if (backlightMode == "light") setBackLightMode("dark");
    else setBackLightMode("light");
  };

  const [nav, setNav] = useState("description");

  const [full, setFull] = useState(false);

  const [code, setCode] = useState("");

  const [language, setLanguage] = useState("cpp");

  const [running, setRunning] = useState(false);

  function getLanguage(lang) {
    if (lang == "cpp") return "c_cpp";
    else return lang;
  }

  function removeComments(code) {
    let inComment = false;
    let newCode = "";
  
    for (let i = 0; i < code.length; i++) {
      if (inComment) {
        if (code[i] === "*" && code[i + 1] === "/") {
          inComment = false;
          i++;
        }
      } else {
        if (code[i] === "/" && code[i + 1] === "/") {
          // Single-line comment, skip to end of line
          while (code[i] !== "\n" && i < code.length) {
            i++;
          }
        } else if (code[i] === "/" && code[i + 1] === "*") {
          // Multi-line comment, skip until end of comment
          inComment = true;
          i++;
        } else {
          newCode += code[i];
        }
      }
    }
  
    return newCode;
  }

  const runHandler = async () => {
    if (!isLoggedin) {
      toast.warn("Please login to run or submit code!");
      return;
    }
    const token = Cookies.get("token");
    const lg = getLanguage(language);

    try {
      setRunning(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_RUN_CODE_API}`,
        {
          code: `${code}`,
          language: `${lg}`,
          input: `${testcase}`,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRunning(false);
      setOutput(res?.data?.message?.output);
    } catch (e) {
      setRunning(false);
      toast.error("Couldn't run code. Try removing comments from beginning of the code !");
    }
  };

  const submitHandler = async () => {
    if (!isLoggedin) {
      toast.warn("Please login to run or submit code!");
      return;
    }

    let sourceCode = code;

    if(language == 'c_cpp'){
      sourceCode = removeComments(sourceCode)
  }

    const lg = getLanguage(language);

    const token = Cookies.get("token");

    JSON.stringify(sourceCode);

    try {
      setRunning(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_RUN_CODE_API}`,
        {
          code: `${sourceCode}`,
          language: `${lg}`,
          input: `${testcase}`,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const op = res?.data?.message?.output;

      if (op.includes("error") || op.includes("Error")) {
        toast.error("Compilation or runtime error detected !!");
      } else {
        try {
          const verdict = await axios.post(
            `${import.meta.env.VITE_BASE_API}${
              import.meta.env.VITE_GET_VERDICT_API
            }`,
            {
              code: sourceCode,
              language: lg,
              qid: question._id,
              token: token,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if(verdict.data?.message.includes('Correct')){
            toast.success('Accepted');
          }
          else toast.error('Wrong Answer');
          setRunning(false);
        } catch (e) {
          setRunning(false);
          console.log(e);
        }
      }
    } catch (e) {
      setRunning(false);
      toast.error("Internal server error while submitting code !");
      console.log(e.message);
    }
  };

  return question ? (
    <div>
      {full ? (
        <div className="">
          <CodeEditor
            full={full}
            setFull={setFull}
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
      ) : (
        <div
          className={`grid sm:grid-cols-2 grid-cols-1 gap-x-3 pt-4 background-color-${backlightMode}  transition duration-[1s]`}
        >
          <div className="sm:ml-6 ml-1">
            <div className="flex gap-4 items-center border-b-[2px] w-fit p-2 mb-3">
              <div className="flex gap-2 items-center hover:cursor-pointer">
                <div onClick={() => setNav("description")} className="p-3 hover:bg-[#806e6e74] rounded-lg">Description</div>
                <div
                  onClick={() => setNav("discuss")}
                  className=" border-l-[2px] border-r-[2px] p-3 hover:bg-[#806e6e74] rounded-lg"
                >
                  Discuss
                </div>
                <div onClick={() => setNav("submissions")} className=" p-3 hover:bg-[#806e6e74] rounded-lg">
                  My submissions
                </div>
              </div>
              <div onClick={modeClickHandler} className="hover:cursor-pointer">
                {backlightMode == "light" ? (
                  <BsFillMoonFill />
                ) : (
                  <BsFillSunFill />
                )}
              </div>
            </div>

            {nav == "description" && (
              <ProblemStatement
                question={question}
                backlightMode={backlightMode}
              />
            )}
            {nav == "discuss" && (
              <Discussion
                qid={question._id}
                backlightMode={backlightMode}
                isLoggedin={isLoggedin}
              />
            )}
            {nav == "submissions" && (
              <MySubmissions
                qid={question._id}
                backlightMode={backlightMode}
                isLoggedin={isLoggedin}
              />
            )}

            {nav == "description" && (
              <CustomTestCase backlightMode={backlightMode} obj={inputOutput} />
            )}
          </div>

          <div className="mb-[300px]">
            <CodeEditor
              full={full}
              setFull={setFull}
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
            />
            <div className="flex justify-between px-3 py-3">
              <button
                className="bg-[#357d93] text-white font-[600] px-3 py-1 rounded-lg w-[100px]"
                onClick={runHandler}
              >
                Run
              </button>
              <button
                className="bg-[#3f9a31] text-white font-[600] px-3 py-1 rounded-lg w-[100px]"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
            {running && (
              <div className="flex justify-start items-center px-4 gap-2">
                <p>Running code...</p>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}

export default Ide;
