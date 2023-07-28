import React, {useEffect, useState} from 'react';
import { useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import ReplyDisplay  from '../ReplyDisplay'
import ReplyForm from '../ReplyForm';
import PostForm from '../PostForm';
export default function PostDisplay(props){
    let {postId} = props
    let posts = useSelector(state => state.posts);
    let user = useSelector(state => state.session.user)
    // let currentPost = posts[id];
    const [currentPost, setCurrentPost] = useState(posts[postId]);
    useEffect(() => {
        setCurrentPost(posts[postId])
    },[posts])
    return (
        <div className='post_main' key={postId}>
            <div className='post_title'>
                {currentPost?.title}
                {(currentPost.userId == user.id)
                &&
                <div>
                    <OpenModalButton
                    buttonText={"edit post"}
                    modalComponent={<PostForm feedId={currentPost.feedId} post={currentPost.id}/>}
                    />
                </div>}
                {(currentPost.reply || currentPost.userId == user.id)
                 &&
                 <div>
                    <OpenModalButton
                     buttonText={"create reply"}
                     modalComponent={<ReplyForm postId={postId}/>}
                    />
                </div>}
            </div>
            <div className='post_body'>
                {currentPost?.body}
            </div>
            <div className='reply_feed'>
                <ReplyDisplay postId={postId}/>
            </div>
        </div>
    )
}
