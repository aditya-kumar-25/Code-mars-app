import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const anurag = 'https://code-mars-server.onrender.com/admin/pushDirect';
const adi = 'https://code-mars-yqwf.onrender.com/modify-questions/push-direct';

const InputField = ({ heading, type, label, placeHolder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{heading}</label>
      <input
        className="h-10 p-4"
        type={type}
        required
        name={label}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange(label, e.target.value)}
      />
    </div>
  );
};

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className='flex flex-col'>
      <label>Select Difficulty:</label>
      <div className='flex gap-2'>
        {difficulties.map((difficulty) => (
          <div key={difficulty} className="flex items-center">
            <input
              type="radio"
              id={difficulty}
              value={difficulty}
              checked={selectedDifficulty === difficulty}
              className="p-4"
              onChange={() => onDifficultyChange(difficulty)}
            />
            <label htmlFor={difficulty} className="ml-2">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const PushDirect = () => {
  const [cnt, setCnt] = useState(3);
  const [tags, setTags] = useState("");
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    sample: "",
    constraints: "",
    sampleAnswer: "",
    description: "",
    difficulty: "medium",
    main: Array.from({ length: 3 }, () => ""),
    mainAnswer: Array.from({ length: 3 }, () => ""),
    tags: [],
  });

  const changeHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const descriptionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDifficultyChange = (difficulty) => {
    setFormData({ ...formData, difficulty });
  };

  const renderInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < cnt; i++) {
      inputFields.push(
        <div key={i}>
          <div>Main TestCase {i + 1}</div>
          <InputField
            type="text"
            label={`Question ${i + 1}`}
            placeHolder={`Question ${i + 1}`}
            value={formData.main[i] || ""}
            onChange={(label, value) => {
              const newMain = [...formData.main];
              newMain[i] = value;
              setFormData({ ...formData, main: newMain });
            }}
            className='p-4'
          />
          <InputField
            type="text"
            label={`Main Answer ${i + 1}`}
            placeHolder={`Main Answer ${i + 1}`}
            value={formData.mainAnswer[i] || ""}
            className='p-4'
            onChange={(label, value) => {
              const newMainAnswer = [...formData.mainAnswer];
              newMainAnswer[i] = value;
              setFormData({ ...formData, mainAnswer: newMainAnswer });
            }}
          />
        </div>
      );
    }
    return inputFields;
  };

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const response = await axios.post(anurag, formData);
      const res = await axios.post(adi, formData);

      console.log(response);
      toast.success("Question Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error in Adding Question");
    }
  }

  const addTag = () => {
    if (tags) {
      setFormData({ ...formData, tags: [...formData.tags, tags] });
      setTags("");
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <form className="flex flex-col justify-center mx-auto gap-3 pt-3 w-2/4">
        <InputField
          heading="Your Name"
          type="text"
          label="author"
          value={formData.author}
          onChange={changeHandler}
          placeHolder="Enter Your Name"
          className='p-4'
        />
        <InputField
          heading="Enter Question Title"
          type="text"
          label="title"
          value={formData.title}
          onChange={changeHandler}
          placeHolder="Question Title"
          className='p-4'
        />
        <DifficultySelector
          selectedDifficulty={formData.difficulty}
          onDifficultyChange={handleDifficultyChange}
        />
        <label htmlFor="description">Question Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="Enter Question Description"
          onChange={descriptionChange}
          className='p-4'
        ></textarea>
        <InputField
          heading="Constraints"
          type="text"
          label="constraints"
          placeHolder="Constraints"
          value={formData.constraints}
          onChange={changeHandler}
          className='p-4'
        />
        <InputField
          heading="Enter Sample Testcase"
          type="text"
          label="sample"
          placeHolder="Sample testcase"
          value={formData.sample}
          onChange={changeHandler}
          className='p-4'
        />
        <InputField
          heading="Enter Sample Answer"
          type="text"
          label="sampleAnswer"
          value={formData.sampleAnswer}
          placeHolder="Sample testcase Answer"
          onChange={changeHandler}
          className='p-4'
        />
        <p>
          Tags:{" "}
          {formData.tags.map((tag, index) => 
            <span key={index} className="bg-gray-200 rounded-full px-2 py-1 mx-1">
              {tag}
            </span>
          )}
        </p>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          placeholder="Enter the tags of questions"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <button onClick={addTag}>Add tags</button>
        {renderInputFields()}
      </form>
      <div className="flex justify-center gap-40 py-4">
        <button onClick={() => setCnt(cnt + 1)}>Add More testcase</button>
        <button onClick={() => setCnt(Math.max(cnt - 1, 3))}>Remove testcase</button>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
};

export default PushDirect;
