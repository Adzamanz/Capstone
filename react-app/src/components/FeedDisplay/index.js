import React from 'react';
import { useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import './FeedDisplay.css'
import PostDisplay from '../PostDisplay';
import OpenModalButton from '../OpenModalButton';
import PostForm from '../PostForm';

export default function FeedDisplay (props) {
    let {id} = props;
    let feeds = useSelector(state => state.feeds)
    let posts = useSelector(state => state.posts)
    let replies = useSelector(state => state.replies)
    let user = useSelector(state => state.session.user)
    let postsOrg = groupBy(Object.values(posts), ['feedId'])
    let repliesOrg = groupBy(Object.values(replies), ['postId'])
    console.log(id)
    let displayFeed = feeds[id]
    console.log(postsOrg)
    return (
        <div className='feed_box'>
            <div className='feed_title'>
                {displayFeed?.description}
            <div><OpenModalButton buttonText={"create post"} modalComponent={<PostForm feedId={id}/>} pass={id}/></div>
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
