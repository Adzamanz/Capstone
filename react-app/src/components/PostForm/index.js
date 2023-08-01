import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, updatePostThunk } from "../../store/posts";

import { useModal } from "../../context/Modal";

import './PostForm.css'

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
        <div className="postform_main">
            <h1>Post</h1>
            <form onSubmit={handleSubmit}>
                    <div className="text_box">
                        <label>
                            Title
                            <input
                                type="text"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="text_box">
                        <label>
                            Body
                            <textarea
                                value={body}
                                onChange={(e)=>setBody(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Type:
                            <select
                                name="type"
                                value={type}
                                onChange={(e)=>setType(e.target.value)}
                            >
                            <option key={'None'} value={'none'} defaultValue={true}>None</option>
                            <option key={'Event'} value={'event'}>Event</option>
                            <option key={'Donate'} value={'donate'}>Donate</option>
                            <option key={'Event/Donate'} value={'event/donate'}>Event/Donate</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        {(type == 'event' || type == 'event/donate') && <label>
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(e)=>setDate(e.target.value)}
                            />
                        </label>}
                    </div>
                    <div>
                        <label>
                            Public: 
                            <input
                                type="checkbox"
                                onChange={(e)=>{
                                    setReply(!reply)
                                }}
                                checked={reply}
                            />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
            </form>
        </div>
    )
}
