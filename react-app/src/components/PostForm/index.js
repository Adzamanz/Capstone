import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, updatePostThunk } from "../../store/posts";

import { useModal } from "../../context/Modal";

export default function PostForm(props){
    const {feedId} = props
    const postData = props.post

    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const thisPost = useSelector(state => state.posts[postData])

    const [date, setDate] = useState(thisPost?.date)
    const [type, setType] = useState(thisPost?.type||"none")
    const [title, setTitle] = useState(thisPost?.title)
    const [body, setBody] = useState(thisPost?.body)
    const [reply, setReply] = useState(thisPost?.reply || false)

    const [post, setPost] = useState({feedId,title,body,type,reply})

    useEffect(()=>{
        date ? setPost({feedId,title,body,type,date,reply}) : setPost({feedId,title,body,type,reply});
    },[type,reply,body,title,date])

    const submition = () => {
        let data;

        postData ? data = dispatch(updatePostThunk(post,thisPost.id)) : data = dispatch(createPostThunk(post));
        console.log(data)
        if(data){
            closeModal()
        }
        else{
            console.log(data.json())
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(feedId, title, body, type)
        if(feedId && title && body && type){
            submition()
        }
    }
    return (
        <div>
            <h1>Post</h1>
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
                        <option key={'None'} value={'none'} defaultValue={true}>None</option>
                        <option key={'Event'} value={'event'}>Event</option>
                        </select>
                    </label>
                    <label>
                        Public
                        <input
                            type="checkbox"
                            onChange={(e)=>{
                                setReply(!reply)
                            }}
                            checked={reply}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
