import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedThunk } from "../../store/feeds";
import { useModal } from "../../context/Modal";

import './FeedForm.css'

export default function FeedForm(){
	const { closeModal } = useModal();
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)
    const [feed, setFeed] = useState({description, public: isPublic})
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({})
    useEffect(()=>{
        setFeed({description, public: isPublic})
    },[description, isPublic])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!submitted){
            setSubmitted(true)
            if(description?.length <= 50 && description?.length > 0){
                setErrors({})
                const data = await dispatch(createFeedThunk(feed));
                if(data){
                    closeModal()
                }
            }
            else{
                setErrors({descError: "Feed title must be between 1 and 50 characters"})
                setSubmitted(false)
            }
        }
    }
    return (
        <div className="feed_form_main">
            <h1>Create Feed</h1>
            <form onSubmit={handleSubmit} className="feed_form">
                <div className="feed_input_form">

                    <div className="feed_input_box">
                        <div className="feed_input_label">Title</div>
                        <div className="feed_input">
                            <input
                            type="text"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    {errors.descError && <div className="error">{errors.descError}</div>}
                    <div className="feed_input_box">
                        <div className="feed_input_label">Public</div>
                        <div className="feed_input">
                            <input
                            type="checkbox"
                            value={isPublic}
                            onChange={(e)=>setIsPublic(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="feed_form_button_box">
                    <div onClick={handleSubmit}>Submit</div>
                </div>
            </form>
        </div>
    )
}
