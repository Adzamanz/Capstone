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
// post
    const [date, setDate] = useState(thisPost?.date)
    const [type, setType] = useState(thisPost?.type||"none")
    const [title, setTitle] = useState(thisPost?.title)
    const [body, setBody] = useState(thisPost?.body)
    const [reply, setReply] = useState(thisPost?.reply || false)
// post
// post tags
    const [postTags, setPostTags] = useState([])
    const [postTagList, setPostTagList] = useState(postTags?.map(e => {
        <div className="post_tag">
            {e.description}
            {e.type}
            <div onClick={() => {
                if(e.id){
                    dispatch(deletePostTagThunk(e))
                }
            }}>delete post tag</div>
        </div>
    }))
// post tags

    const [post, setPost] = useState({feedId,title,body,type,reply})

    useEffect(() => {
        dispatch(getAllPostTags())

        setPostTags(groupBy(Object.values(allPostTags), ['postId'])[postData])
    },[])
    useEffect(()=>{
        date ? setPost({feedId,title,body,type,date,reply}) : setPost({feedId,title,body,type,reply});
    },[type,reply,body,title,date])
    //i forsee issues with the below useEffect in regards to updating info mid post-edit
    useEffect(() => {

        // const postTagVariable = groupBy(Object.values(allPostTags), ['postId'])[postData]
        // const existingPostTags = postTagVariable ? [...postTagVariable] : []
        // console.log(existingPostTags)
        // const set = new Set([...existingPostTags, ...postTags])
        // console.log(set)
        // setPostTags([...set])

        setPostTags(groupBy(Object.values(allPostTags), ['postId'])[postData])
    },[allPostTags])

    useEffect(() => {
        console.log(postTags)
        setPostTagList(
            postTags?.map(e => {
                return (
                    <div className="post_tag">
                        |{e.description}|{e.type}|
                        <div onClick={() => {
                            if(e.id){
                                dispatch(deletePostTagThunk(e))
                            }
                            if(e){
                                let tempPostTags = postTags;
                                let target = tempPostTags.indexOf(e);
                                tempPostTags.splice(target, 1)
                                console.log(tempPostTags)
                                setPostTags(tempPostTags)
                            }
                        }}>delete post tag</div>
                    </div>
                )
            })
        )
    },[JSON.stringify(postTags)])

    const submitPostTags = (post) => {
        postTags?.forEach(e => {
            if(!e.id){
                let postId = post?.id
                console.log(postId)
                dispatch(createPostTagThunk({postId,...e}))
            }
        })
    }

    const submission = () => {
        if(postData){
            dispatch(updatePostThunk(post,thisPost.id)).then(res => submitPostTags(res))
        }else{
            dispatch(createPostThunk(post)).then(res => submitPostTags(res))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(feedId, title, body, type)
        if(feedId && title && body && type){
            submission()
            closeModal()
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
                    <div className="post_tag_box">
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
                    </div>
                    <button type="submit">Submit</button>
            </form>
        </div>
    )
}
