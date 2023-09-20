import React, { useState, useEffect, useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, updatePostThunk } from "../../store/posts";

import ImageForm from "../ImageForm";
import { useModal } from "../../context/Modal";

import { groupBy } from "../Utility";

import './PostForm.css'
import PostTagForm from "../PostTagForm";
import { createPostTagThunk, deletePostTagThunk, getAllPostTags } from "../../store/postTags";
import OpenModalButton from "../OpenModalButton";
import { createImageThunk, getAllImages } from "../../store/images";

export default function PostForm(props){

    const {feedId} = props
    const postData = props.post

    const dispatch = useDispatch()
    const { closeModal } = useModal();

    let thisPost = useSelector(state => state.posts[postData])
    const allPostTags = useSelector(state => state.postTags)
    const postImages = useSelector(state => state.images)
    const thisPostTags = groupBy(Object.values(allPostTags), ['postId', 'type'])
// post
    const [date, setDate] = useState(new Date(thisPost?.date).toJSON()?.split("T")[0])
    const [type, setType] = useState(thisPost?.type||"none")
    const [title, setTitle] = useState(thisPost?.title)
    const [body, setBody] = useState(thisPost?.body)
    const [reply, setReply] = useState(thisPost?.reply || false)
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState({});

    const [likes, setLikes] = useState(thisPostTags[postData]?.like?.length > 0 || false)
    const [attendance, setAttendance] = useState(thisPostTags[postData]?.attendance?.length > 0 || false)

    const [post, setPost] = useState({feedId,title,body,type,reply})

    useEffect(() => {
        dispatch(getAllImages())
    },[])

    useEffect(()=>{
        date ? setPost({feedId,title,body,type,date,reply}) : setPost({feedId,title,body,type,reply});
        console.log(date)
    },[type,reply,body,title,date])

    useEffect(() => {
        if(type == "donate" || type == "none"){
            setAttendance(false);
        }
    },[type])

    const removeFromImages = (name) => {
        let newImages = {...images}  ;
        delete newImages[name];
        setImages(newImages);
    }
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log(feedId, title, body, type, likes, attendance,)

        let newErrors = {}
        if(!title || title?.length > 50 || title?.length < 1){
            newErrors.title = "title must be between 1 and 50 characters"
        }
        if(body?.length > 1000 || body?.length < 1){
            newErrors.body = "the body of your post must be between 1 and 1000 characters"
        }
        if((type == 'event' || type == 'event/donate') && !date){
            newErrors.date = "If the post type is an event, please set a date!"
        }
        setErrors(newErrors)
        if(feedId && title && body && type && (!Object.values(newErrors).length > 0)){
            let data;
            if(postData){
                data = await dispatch(updatePostThunk(post,thisPost.id))
                // .then(res => submitPostTags(res))
            }else{
                data = await dispatch(createPostThunk(post))
                // .then(res => submitPostTags(res))
            }
            let dataId = data?.id

            // postTags
            if(likes && data && !thisPostTags[postData]?.like?.length) dispatch(createPostTagThunk({postId: dataId,type:'like', description:'Like'}))
            else if(!likes && thisPostTags[postData]?.like?.length > 0) dispatch(deletePostTagThunk(thisPostTags[postData]?.like[0]))

            if(attendance && data && !thisPostTags[postData]?.attendance?.length) dispatch(createPostTagThunk({postId: dataId,type:'attendance', description:'Attendance'}))
            else if(!attendance && thisPostTags[postData]?.attendance?.length > 0) dispatch(deletePostTagThunk(thisPostTags[postData]?.attendance[0]))

            //images

            let imageData = Object.keys(images);

            if(imageData.length > 0){
                imageData.forEach(e => {
                    let currData = {
                        name: e,
                        postId: dataId,
                        image: images[e]
                    };
                    console.log(currData)
                    createImageThunk(currData)
                })
            }
            closeModal()
        }
    }

    return (
        <div className="postform_main">
            <h1>Post</h1>
            <form onSubmit={handleSubmit} className="post_form">
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
                        {errors.title && <div className="error"> {errors.title} </div>}
                    </div>
                    <div className="text_box">
                        <label>
                            Body
                            <textarea
                                value={body}
                                onChange={(e)=>setBody(e.target.value)}
                                required
                            />
                            {errors.body && <div className="error"> {errors.body} </div>}
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
                            <option title="for posts about events on specific days!" key={'Event'} value={'event'}>Event</option>
                            <option title="for posts promoting a cause to donate!" key={'Donate'} value={'donate'}>Donate</option>
                            <option title="for posts promoting a cause to donate for an event on a specific day!"key={'Event/Donate'} value={'event/donate'}>Event/Donate</option>
                            </select>
                        </label>
                    </div>
                    {(type == 'event' || type == 'event/donate') &&
                    <div>
                        <label>
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(e)=>setDate(e.target.value)}
                            />
                        </label>
                        {errors.date && <div className="error"> {errors.date} </div>}
                    </div>}
                    <div>
                        <label title="checking this box allows users to reply to this post!">
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
                    <div className="like_and_attendance_box">
                                <label title="checking this box makes it so users can like your post!">
                                    Likes
                                    <input
                                        type="checkbox"
                                        value={likes}
                                        onChange={(e) => setLikes(!likes)}
                                        checked={likes}
                                    />
                                </label>
                                {(type == 'event' || type == 'event/donate') &&
                                    <label title="checking this box makes it so users can claim attendance!">
                                        Attendance
                                        <input
                                            type="checkbox"
                                            value={attendance}
                                            onChange={(e) => setAttendance(!attendance)}
                                            checked={attendance}
                                        />
                                    </label>
                                }
                    </div>
                    <ImageForm setImages={setImages} images={images}/>
                    <div onClick={() => console.log(images)}>
                        check
                    </div>
                    <div>
                        {
                            Object.keys(images).map( e => {
                                return (
                                    <div onClick={() => removeFromImages(e)}>
                                        {e}:<img src={URL.createObjectURL(images[e])} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="post_form_button_box">
                        <div onClick={handleSubmit} type="submit">Submit</div>
                    </div>
            </form>
        </div>
    )
}
