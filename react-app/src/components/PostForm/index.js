import React, { useState, useEffect, useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, updatePostThunk } from "../../store/posts";

import { useModal } from "../../context/Modal";

import { groupBy } from "../Utility";

import './PostForm.css'
import PostTagForm from "../PostTagForm";
import { createPostTagThunk, deletePostTagThunk, getAllPostTags } from "../../store/postTags";
import OpenModalButton from "../OpenModalButton";

export default function PostForm(props){

    const {feedId} = props
    const postData = props.post

    const dispatch = useDispatch()
    const { closeModal } = useModal();

    let thisPost = useSelector(state => state.posts[postData])
    const allPostTags = useSelector(state => state.postTags)
    const thisPostTags = groupBy(Object.values(allPostTags), ['postId', 'type'])
// post
    const [date, setDate] = useState(new Date(thisPost?.date).toJSON()?.split("T")[0])
    const [type, setType] = useState(thisPost?.type||"none")
    const [title, setTitle] = useState(thisPost?.title)
    const [body, setBody] = useState(thisPost?.body)
    const [reply, setReply] = useState(thisPost?.reply || false)
    const [errors, setErrors] = useState({});
// post
// post tags
    //this portion creates the visual list of the postTags in the custom-tag version of this form

    // const [postTags, setPostTags] = useState([])
    // const [postTagList, setPostTagList] = useState(postTags?.map(e => {
    //     <div className="post_tag">
    //         {e.description}
    //         {e.type}
    //         <div onClick={() => {
    //             if(e.id){
    //                 dispatch(deletePostTagThunk(e))
    //             }
    //         }}>delete post tag</div>
    //     </div>
    // }))
// post tags
    const [likes, setLikes] = useState(thisPostTags[postData]?.like?.length > 0 || false)
    const [attendance, setAttendance] = useState(thisPostTags[postData]?.attendance?.length > 0 || false)

    const [post, setPost] = useState({feedId,title,body,type,reply})

    // useEffect(() => {
    //     dispatch(getAllPostTags())

    //     setPostTags(groupBy(Object.values(allPostTags), ['postId'])[postData])
    // },[])
    useEffect(()=>{
        date ? setPost({feedId,title,body,type,date,reply}) : setPost({feedId,title,body,type,reply});
        console.log(date)
    },[type,reply,body,title,date])
    //i forsee issues with the below useEffect in regards to updating info mid post-edit
    // useEffect(() => {

        // const postTagVariable = groupBy(Object.values(allPostTags), ['postId'])[postData]
        // const existingPostTags = postTagVariable ? [...postTagVariable] : []
        // console.log(existingPostTags)
        // const set = new Set([...existingPostTags, ...postTags])
        // console.log(set)
        // setPostTags([...set])

        // setPostTags(groupBy(Object.values(allPostTags), ['postId'])[postData])
    // },[allPostTags])

    // useEffect(() => {
    //     console.log(postTags)
    //     setPostTagList(
    //         postTags?.map(e => {
    //             return (
    //                 <div className="post_tag">
    //                     |{e.description}|{e.type}|
    //                     <div onClick={() => {
    //                         if(e.id){
    //                             dispatch(deletePostTagThunk(e))
    //                         }
    //                         if(e){
    //                             let tempPostTags = postTags;
    //                             let target = tempPostTags.indexOf(e);
    //                             tempPostTags.splice(target, 1)
    //                             console.log(tempPostTags)
    //                             setPostTags(tempPostTags)
    //                         }
    //                     }}>delete post tag</div>
    //                 </div>
    //             )
    //         })
    //     )
    // },[JSON.stringify(postTags)])

    // const submitPostTags = (post) => {
    //     postTags?.forEach(e => {
    //         if(!e.id){
    //             let postId = post?.id
    //             console.log(postId)
    //             dispatch(createPostTagThunk({postId,...e}))
    //         }
    //     })
    // }

    // const submission = () => {
    //     if(postData){
    //         dispatch(updatePostThunk(post,thisPost.id))
    //         // .then(res => submitPostTags(res))
    //     }else{
    //         dispatch(createPostThunk(post))
    //         // .then(res => submitPostTags(res))
    //     }
    // }
    useEffect(() => {
        if(type == "donate" || type == "none"){
            setAttendance(false);
        }
    },[type])
    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log(feedId, title, body, type, likes, attendance,)

        let newErrors = {}
        if(title.length > 50 || title.length < 1){
            newErrors.title = "title must be between 1 and 50 characters"
        }
        if(body.length > 1000 || body.length < 1){
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
            if(likes && data && !thisPostTags[postData]?.like?.length) dispatch(createPostTagThunk({postId: dataId,type:'like', description:'Like'}))
            else if(!likes && thisPostTags[postData]?.like?.length > 0) dispatch(deletePostTagThunk(thisPostTags[postData]?.like[0]))

            if(attendance && data && !thisPostTags[postData]?.attendance?.length) dispatch(createPostTagThunk({postId: dataId,type:'attendance', description:'Attendance'}))
            else if(!attendance && thisPostTags[postData]?.attendance?.length > 0) dispatch(deletePostTagThunk(thisPostTags[postData]?.attendance[0]))
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
                    {/* <div className="post_tag_box">
                        <div className="post_tag_list">
                            {postTagList}
                        </div>
                        <div className="post_tag_form">
                            <PostTagForm
                                postType={type}
                                postTags={postTags}
                                setPostTags={setPostTags}
                            />
                        </div>
                    </div> */}
                    <div className="post_form_button_box">
                        <div onClick={handleSubmit} type="submit">Submit</div>
                    </div>
            </form>
        </div>
    )
}
