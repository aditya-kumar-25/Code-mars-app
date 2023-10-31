import React, { useEffect } from "react";
import './DiscussionCard.css'
import {AiOutlineDelete} from 'react-icons/ai'
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function DiscussionCard({ data , user , temp , setTemp }) {
    const { title, body, date , userHandle , _id} = data;

    async function deleteHandler() {
        try{
            const token = Cookies.get("token");
            const res = await axios.post(`${import.meta.env.VITE_BASE_API}${import.meta.env.VITE_DELETE_DISCUSSION_API}`,{
                token,
                id: _id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success(res.data.message);
            setTemp(!temp)
        } catch(err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col px-3 py-1 discuss-card shadow-md shadow-[#b59b9b] text-black rounded-md">
            <div className="font-bold">{title}</div>
            <div className="font-600">{body}</div>
            <div className="text-right">Posted by: <span className="font-[600] text-[#4a9c49] underline italic">{userHandle}</span></div>
            <div className="text-right">Posted on: {new Date(date).toLocaleDateString()}</div>
            {user == userHandle && 
            <div className="bg-[#ff3333] w-fit rounded-full p-1 hover:bg-[#963e3e]">
                <AiOutlineDelete onClick={deleteHandler} className=" text-white text-xl hover:cursor-pointer" title="Delete post"/>
            </div>}
        </div>
    );
}

export default DiscussionCard;
