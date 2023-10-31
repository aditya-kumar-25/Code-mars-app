import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import DiscussionCard from "./DiscussionCard";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Discussion({ qid, isLoggedin }) {
  const [discussions, setDiscussions] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [temp, setTemp] = useState(true);

  const [postButton, setPostButton] = useState(true);

  const [user , setUser] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API}${
          import.meta.env.VITE_DISCUSSIONS_API
        }/${qid}`
      );

      setDiscussions(res.data?.data);
    };

    const getUser = async () => {
      const token = Cookies.get("token");

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_API}${
            import.meta.env.VITE_USER_VERIFICATION_API
          }`,
          {
            token: token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.userHandle);
        fetchDiscussions();
      } catch (err) {
        fetchDiscussions();
      }
    };
    getUser();
  }, [temp]);

  function postClickHandler(event) {
    setShowForm(!showForm);
    setPostButton(!postButton);
  }

  async function postDiscussion(event) {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API}${
          import.meta.env.VITE_DISCUSSIONS_API
        }`,
        {
          id: qid,
          title: formData.title,
          body: formData.body,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowForm(false);
      toast.success("Discussion posted successfully");
      setTemp(!temp);
      setPostButton("Post");
      console.log(res);
    } catch (err) {
      toast.error(err.message);
    }
  }

  function changeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  }

  return (
    <div className="flex flex-col">
      {isLoggedin && (
        <div className="flex gap-2 items-center mb-4">
          <p>Want to share your ideas to the community?</p>
          {postButton && (
            <button
              onClick={postClickHandler}
              className="bg-navColor text-white px-3 py-1 rounded-md border-[2px] border-white"
            >
              Post
            </button>
          )}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={postDiscussion}
          className="flex flex-col gap-2 items-start mb-5"
        >
          <div>
            <label htmlFor="title" className="block">
              Title:
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={changeHandler}
              className="text-black px-3 py-1 rounded-md border border-black"
              placeholder="Title"
            />
          </div>

          <div>
            <label htmlFor="body" className="block">
              Comment:
            </label>
            <input
              type="text"
              id="body"
              required
              value={formData.body}
              onChange={changeHandler}
              className="text-black px-3 py-1 rounded-md border border-black"
              placeholder="Enter your ideas.."
            />
          </div>

          <input
            type="submit"
            value="Post"
            className="bg-navColor text-white px-3 py-1 rounded-lg border-[2px] border-white"
          />
        </form>
      )}

      {discussions && discussions.length > 0 ? (
        <div className="flex flex-col gap-2 p-3">
          {discussions.map((obj, index) => {
            return <DiscussionCard data={obj} key={index} user={user} temp={temp} setTemp={setTemp}/>;
          })}
        </div>
      ) : discussions ? (
        <div>No Posts Yet</div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Discussion;
