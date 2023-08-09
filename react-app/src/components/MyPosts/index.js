import React, { useDebugValue, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { groupBy } from '../Utility';
import PostDisplay from '../PostDisplay';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
export default function MyPosts() {
    const {id} = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    let userId = useSelector(state => state.session.user.id)
    let myPosts = useSelector(state => groupBy(Object.values(state.posts), ['userId'])[userId])
    useEffect(() => {
        dispatch(getAllPosts());
    }, [])
    return (
        <div>
            <div className='my_posts_display'>

            </div>
            <div className='post_sub_menu'>
                <div className='post_list'>
                    <div className='post_list_display'>
                        {MyPosts.map(ele => {
                            return (
                                <div className='post_tab' onClick={() => history.push(`/my_posts/${ele.id}`)}>{ele.title}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
