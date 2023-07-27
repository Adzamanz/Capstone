import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedThunk } from "../../store/feeds";
import { useModal } from "../../context/Modal";

export default function FeedForm(){
	const { closeModal } = useModal();
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)
    const [feed, setFeed] = useState({description, public: isPublic})
    const [submitted, setSubmitted] = useState(false);
    useEffect(()=>{
        setFeed({description, public: isPublic})
    },[description, isPublic])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        if(description){
            console.log(feed)
            const data = await dispatch(createFeedThunk(feed));
            if(data){
                closeModal()
            }
        }
    }
    return (
        <div>
            <h1>Create Feed</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title
                        <input
                            type="text"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Public
                        <input
                            type="checkbox"
                            value={isPublic}
                            onChange={(e)=>setIsPublic(e.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={submitted}>Submit</button>
                </div>
            </form>
        </div>
    )
}
