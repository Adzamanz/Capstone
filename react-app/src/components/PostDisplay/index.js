import React, {useEffect, useState} from 'react';
import { useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import ReplyDisplay  from '../ReplyDisplay'
import ReplyForm from '../ReplyForm';
import PostForm from '../PostForm';
import './PostDisplay.css'
import repliesReducer from '../../store/replies';
import { DeleteItemModal } from '../DeleteItemModal';
import { deletePostThunk } from '../../store/posts';
import TransactionForm from '../TransactionForm';
export default function PostDisplay(props){
    let {postId} = props
    let posts = useSelector(state => state.posts);
    let user = useSelector(state => state.session.user)
    // let currentPost = posts[id];
    const [displayReplies, setDisplayReplies] = useState(false)
    const [currentPost, setCurrentPost] = useState(posts[postId]);
    useEffect(() => {
        setCurrentPost(posts[postId])
    },[postId])
    useEffect(() => {
        setCurrentPost(posts[postId])
    },[posts[postId]])
    return (
        <div className='post_main' key={postId}>
            <div className='post_content'>
                <div className='post_title'>
                    {currentPost?.title}
                    {(currentPost.userId == user?.id)
                    &&
                    <div className='button_box'>
                        <OpenModalButton
                        buttonText={"edit post"}
                        modalComponent={<PostForm feedId={currentPost.feedId} post={currentPost.id}/>}
                        />
                        <OpenModalButton
                        buttonText={"delete post"}
                        modalComponent={<DeleteItemModal action={deletePostThunk} target={currentPost} landing={'/'}/>}
                    />
                    </div>}

                </div>
                <div className='post_body'>
                    {currentPost?.body}
                    {(currentPost.type == 'donate' || currentPost.type == 'event/donate') &&
                    <div>
                        <OpenModalButton
                        buttonText={"Donate"}
                        modalComponent={<TransactionForm postId={postId}/>}
                        />
                    </div>
                    }
                </div>
                {user && currentPost.reply
                    &&
                    <div className='create_reply_box'>
                        <OpenModalButton
                        buttonText={"create reply"}
                        modalComponent={<ReplyForm postId={postId}/>}
                        />
                    </div>}
            </div>
            <div className='reply_feed' onClick={(e) => setDisplayReplies(!displayReplies)}>
                <div className='reply_feed_title'>=REPLIES=</div>
                {displayReplies && <ReplyDisplay postId={postId}/>}
            </div>

        </div>
    )
}
