import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../store/posts";

import { useModal } from "../../context/Modal";

export default function PostForm(props){
    const {feedId} = props
    const dispatch = useDispatch()
    const [date, setDate] = useState()
    const [type, setType] = useState("none")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [reply, setReply] = useState(false)
    const [post, setPost] = useState({feedId,title,body,type,reply})

    const [submitted, setSubmitted] = useState(false);
    const { closeModal } = useModal();
    useEffect(()=>{
        date ? setPost({feedId,title,body,type,date,reply}): setPost({feedId,title,body,type,reply});
    },[feedId,title,body,type,date,reply])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(post)
        if(feedId && title && body && type){
            // setSubmitted(true)
            const data = await dispatch(createPostThunk(post));
            console.log(data)
            if(data){
                closeModal()
            }
            else{
                // setSubmitted(false)
                console.log(data)
            }
        }
    }
    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Body
                        <input
                            type="text"
                            value={body}
                            onChange={(e)=>setBody(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Date
                        <input
                            type="date"
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Type
                        <select
                            name="type"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                        >
                        <option key={'None'} value={'none'} selected={true}>None</option>
                        <option key={'Event'} value={'event'}>Event</option>
                        </select>
                    </label>
                    <label>
                        Public
                        <input
                            type="checkbox"
                            value={reply}
                            onChange={(e)=>setReply(!reply)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
