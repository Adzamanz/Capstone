import React,{ useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';

export default function FeedDisplay (props) {
    let {id} = props;
    let feeds = useSelector(state => state.feeds)
    let posts = useSelector(state => state.posts)
    let replies = useSelector(state => state.replies)
    let postsOrg = groupBy(Object.values(posts), ['feedId'])
    let repliesOrg = groupBy(Object.values(replies), ['postId'])
    console.log(id)
    let displayFeed = feeds[id]
    console.log(postsOrg)
    return (
        <div>
            <div className='feed_title'>
                {displayFeed?.description}
            </div>
            <div>
                {postsOrg[id]?.map(ele => {
                    return (
                        <div>
                            <div>
                                {ele.title}
                            </div>
                            <div>
                                {ele.body}
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
