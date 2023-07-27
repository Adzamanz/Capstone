import React,{ useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';

export default function ReplyDisplay(props){
    let {postId} = props;
    let replies = useSelector(state => state.replies);
    let users = useSelector(state => state.users);
    let postReplies = groupBy(Object.values(replies), ['postId'])[postId];
    console.log(postId, postReplies)
    let replyList = postReplies?.map(reply => {
        let replyUID = reply.userId;
        return (
            <div className='reply_main' key={reply.id}>
                <div className='reply_user'>
                    {console.log(replyUID)}
                    {users[replyUID]?.username}:
                </div>
                <div className='reply_body'>
                    {reply.body}
                </div>
            </div>
        )
    })
    return (
        <div>
            {
                replyList
            }
        </div>
    )
}
