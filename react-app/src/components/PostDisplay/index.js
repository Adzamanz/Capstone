import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import ReplyDisplay  from '../ReplyDisplay'
import ReplyForm from '../ReplyForm';
import PostForm from '../PostForm';
import './PostDisplay.css'
import repliesReducer from '../../store/replies';
import { DeleteItemModal } from '../DeleteItemModal';
import { deletePostThunk, getAllPosts } from '../../store/posts';
import TransactionForm from '../TransactionForm';
import { getAllPostTags } from '../../store/postTags';

export default function PostDisplay(props){
    const dispatch = useDispatch();
    let {postId} = props
    let posts = useSelector(state => state.posts);
    let postTags = useSelector(state => state.postTags)
    let user = useSelector(state => state.session.user)
    // let currentPost = posts[id];
    const [displayReplies, setDisplayReplies] = useState(false)
    const [currentPost, setCurrentPost] = useState(posts[postId]);
    const [thisPostTags, setThisPostTags] = useState(groupBy(Object.values(postTags),['postId'])[postId])
    useEffect(() => {
        dispatch(getAllPostTags)
        dispatch(getAllPosts)
    },[])
    useEffect(() => {
        setCurrentPost(posts[postId])
    },[postId])
    // useEffect(() => {
    //     setCurrentPost(posts[postId])
    // },[posts[postId]])
    useEffect(()=> {
        setThisPostTags(groupBy(Object.values(postTags),['postId'])[postId])
    },[postTags])
    return (
        <div className='post_main' key={postId}>
            <div className='post_content'>
                <div className='post_title'>
                    {currentPost?.title}
                    {(currentPost?.userId == user?.id)
                    &&
                    <div className='button_box'>
                        <OpenModalButton
                        buttonText={"edit post"}
                        modalComponent={<PostForm feedId={currentPost?.feedId} post={currentPost?.id}/>}
                        />
                        <OpenModalButton
                        buttonText={"delete post"}
                        modalComponent={<DeleteItemModal action={deletePostThunk} target={currentPost} landing={'/'}/>}
                    />
                    </div>}

                </div>
                <div className='post_body'>
                    {currentPost?.body}
                    {(currentPost?.type == 'donate' || currentPost?.type == 'event/donate') &&
                    <div>
                        <OpenModalButton
                        buttonText={"Donate"}
                        modalComponent={<TransactionForm postId={postId}/>}
                        />
                    </div>
                    }
                </div>
                {user && currentPost?.reply
                    &&
                    <div className='create_reply_box'>
                        <OpenModalButton
                        buttonText={"create reply"}
                        modalComponent={<ReplyForm postId={postId}/>}
                        />
                    </div>}
            </div>
            <div className='post_tag_list'>
                {thisPostTags?.map(e => {
                    return (
                        <div>
                            {e.description}
                            {e.type}
                        </div>
                    )
                })}
            </div>
            <div className='reply_feed' onClick={(e) => setDisplayReplies(!displayReplies)}>
                <div className='reply_feed_title'>=REPLIES=</div>
                {displayReplies && <ReplyDisplay postId={postId}/>}
            </div>

        </div>
    )
}
