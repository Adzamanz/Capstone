import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupBy } from '../Utility';
import PostDisplay from '../PostDisplay';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';

import { getAllPosts } from '../../store/posts';
import './MyPosts.css'
import { getAllPostTags } from '../../store/postTags';
import { getAllTags } from '../../store/tags';
import { getAllUsers } from '../../store/users';
import PostDetails from '../PostDetails';

export default function MyPosts() {
    const {id} = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    let user = useSelector(state => state.session.user)
    let userId = useSelector(state => state.session.user.id)
    let posts = useSelector(state => state.posts)
    let myPosts = groupBy(Object.values(posts), ['userId'])[userId]
    let thisPost = posts[id];
    let users = useSelector(state => state.users)
    let postTags = useSelector(state => state.postTags)
    let tags = useSelector(state => state.tags)
    let thisPostTags = groupBy(Object.values(postTags), ['postId','description'])[id]
    let thisTags = groupBy(Object.values(tags),['postid','description'])[id]

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllPostTags())
        dispatch(getAllTags())
        dispatch(getAllUsers())
    },[])

    return (
        <div className='my_posts_main'>
            <div className='my_posts_display'>
                {id ? <div><PostDisplay postId={id}/>
                    <div className='post_details'>
                        {/* <PostDetails/> */}
                    </div>
                </div> : <div className='post_placeholder'>Select a post from the right</div>}

            </div>
            <div className='post_sub_menu'>
                <div className='post_list'>
                    <div className='my_posts_list_title'>My Posts</div>
                    {myPosts?.map(ele => {
                        return (
                            <div className='post_tab' onClick={() => history.push(`/my_posts/${ele.id}`)}>{ele.title}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
