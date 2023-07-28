import React from 'react';
import { useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import './FeedDisplay.css'
import PostDisplay from '../PostDisplay';
import OpenModalButton from '../OpenModalButton';
import PostForm from '../PostForm';

export default function FeedDisplay (props) {
    let {id} = props;
    let feed = useSelector(state => state.feeds[id])
    let posts = useSelector(state => state.posts)
    let replies = useSelector(state => state.replies)
    let user = useSelector(state => state.session.user)
    let postsOrg = groupBy(Object.values(posts), ['feedId'])
    let repliesOrg = groupBy(Object.values(replies), ['postId'])
    console.log(postsOrg)
    return (
        <div className='feed_box'>
            <div className='feed_title'>
                {feed?.description}
                {(feed?.userId == user?.id)}
            {(feed?.public || feed?.userId == user?.id)
             &&
             <div>
                <OpenModalButton
                 buttonText={"create post"}
                 modalComponent={<PostForm feedId={id}/>}
                 />
            </div>}
            </div>
            <div className='feed_body'>
                {postsOrg[id]?.map(ele => {
                    return (
                       <PostDisplay postId={ele.id}/>
                    )
                })}
            </div>
        </div>
    )
}
