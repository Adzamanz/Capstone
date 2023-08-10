import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import ReplyDisplay  from '../ReplyDisplay'
import ReplyForm from '../ReplyForm';
import PostForm from '../PostForm';
import './PostDisplay.css'
import repliesReducer, { getAllReplies } from '../../store/replies';
import { DeleteItemModal } from '../DeleteItemModal';
import { deletePostThunk, getAllPosts } from '../../store/posts';
import TransactionForm from '../TransactionForm';
import { getAllPostTags } from '../../store/postTags';
import { createTagThunk, deleteTagThunk, getAllTags } from '../../store/tags'

export default function PostDisplay(props){
    const dispatch = useDispatch();
    let {postId} = props
    let posts = useSelector(state => state.posts);
    let postTags = useSelector(state => state.postTags);
    let tags = useSelector(state => state.tags)
    let user = useSelector(state => state.session.user)
    let thisReplies = useSelector(state => groupBy(Object.values(state.replies),['postId'])[postId])
    // let currentPost = posts[id];
    const [displayReplies, setDisplayReplies] = useState(false)
    const [currentPost, setCurrentPost] = useState(posts[postId]);
    const [thisPostTags, setThisPostTags] = useState(groupBy(Object.values(postTags),['postId'])[postId])
    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getAllPostTags())
        dispatch(getAllPosts())
        dispatch(getAllReplies())
    },[])
    useEffect(() => {
        setCurrentPost(posts[postId])
    },[postId, posts[postId]], thisReplies)
    useEffect(()=> {
        setThisPostTags(groupBy(Object.values(postTags),['postId'])[postId])
    },[postTags, currentPost, tags])
    return (
        <div className='post_main' key={postId}>
            <div className='post_content'>
                <div className='post_title'>
                    {currentPost?.title}
                </div>
                {(currentPost?.userId == user?.id)
                &&
                <div className='post_button_box'>
                    <OpenModalButton
                    buttonText={"edit post"}
                    modalComponent={<PostForm feedId={currentPost?.feedId} post={currentPost?.id}/>}
                    />
                    <OpenModalButton
                    buttonText={"delete post"}
                    modalComponent={<DeleteItemModal action={deletePostThunk} target={currentPost} landing={'/'}/>}
                />
                </div>}
                <div className='post_body'>
                    {currentPost?.body}
                </div>
                    {(currentPost?.type == 'donate' || currentPost?.type == 'event/donate') &&
                    <div className='donate_button'>
                        <OpenModalButton
                        buttonText={"Donate"}
                        modalComponent={<TransactionForm postId={postId}/>}
                        />
                    </div>
                    }
            </div>
            <div className='post_tag_list'>
                {thisPostTags?.map(e => {
                    let groupedTags = groupBy(Object.values(tags), ['tagId','userId'])
                    let taggedList = groupedTags[e.id];
                    let tagged = taggedList ? taggedList[user.id] : 0
                    return (
                        <div className={`post_tag_button clickable ${tagged ? "true_tag" : "false_tag"}`}

                            onClick={() => {
                                if(!tagged) dispatch(createTagThunk({postId, tagId: e.id, userId: user.id, description: e.description}))
                                else{
                                    dispatch(deleteTagThunk(tagged[0]))
                                }
                            }}
                        >
                            {e.description}
                        </div>
                    )
                })}
            </div>
                    {user && currentPost?.reply
                        &&
                        <div className='create_reply_box'>
                            <OpenModalButton
                            buttonText={"create reply"}
                            modalComponent={<ReplyForm postId={postId}/>}
                            />
                        </div>}
            {currentPost?.reply && thisReplies?.length > 0  && <div className='reply_feed' >
                <div className='reply_feed_title clickable' onClick={(e) => setDisplayReplies(!displayReplies)}>{displayReplies ? "HIDE" : "SHOW"} REPLIES</div>
                {displayReplies && <ReplyDisplay postId={postId}/>}
            </div>}

        </div>
    )
}
