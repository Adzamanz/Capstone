import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import './FeedDisplay.css'
import PostDisplay from '../PostDisplay';
import OpenModalButton from '../OpenModalButton';
import PostForm from '../PostForm';
import { DeleteItemModal } from '../DeleteItemModal';
import { deleteFeedThunk } from '../../store/feeds';
import { getAllPosts } from '../../store/posts';
import { getAllReplies } from '../../store/replies';

export default function FeedDisplay (props) {
    let {id} = props;
    const dispatch = useDispatch();

    let feeds = useSelector(state => state.feeds)
    let feed = feeds[id]
    let posts = useSelector(state => state.posts)
    let user = useSelector(state => state.session.user)

    const [postsOrg,setPostsOrg] = useState(groupBy(Object.values(posts), ['feedId']))
    const [postFeed, setPostFeed] = useState()

    useEffect(() =>{
        dispatch(getAllPosts())
        dispatch(getAllReplies())
    },[feed])
    useEffect(()=>{
        setPostsOrg(groupBy(Object.values(posts), ['feedId']))
    },[posts])
    useEffect(()=>{
        setPostFeed(postsOrg[id]?.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }).map(ele => <PostDisplay postId={ele.id}/>))
    },[postsOrg])
    // console.log(postsOrg[id]?.map(ele => ele).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)))
    return (
        <div className='feed_box'>
            <div className='feed_title'>
                {feed?.description}
                {(feed?.public || feed?.userId == user?.id)
                &&
                <div className='post_buttons'>
                    <OpenModalButton
                    buttonText={"create post"}
                    modalComponent={<PostForm feedId={id}/>}
                    />
                    <OpenModalButton
                        buttonText={"delete feed"}
                        modalComponent={<DeleteItemModal action={deleteFeedThunk} target={feed} landing={'/'}/>}
                    />
                </div>}
            </div>
            <div className='feed_body'>
                {postFeed}
            </div>
        </div>
    )
}
