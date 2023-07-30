import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import ReplyForm from '../ReplyForm';
import './ReplyDisplay.css'
import { deleteReplyThunk } from '../../store/replies';
import { DeleteItemModal } from '../DeleteItemModal';

export default function ReplyDisplay(props){
    let {postId} = props;
    let replies = useSelector(state => state.replies);
    let users = useSelector(state => state.users);
    const userId = useSelector(state => state.session.user.id);
    const [postReplies,setPostReplies] = useState(groupBy(Object.values(replies), ['postId'])[postId]);
    console.log(postId, postReplies)
    useEffect(() => {
        setPostReplies(groupBy(Object.values(replies), ['postId'])[postId])
    },[replies])
    let replyList = postReplies?.map(reply => {
        let replyUID = reply.userId;
        return (
           <OneReply reply={reply}/>
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
export function OneReply(props){
    let {reply} = props
    let users = useSelector(state => state.users);
    const userId = useSelector(state => state.session.user.id);
    let replyUID = reply.userId;
    return (
        <div className='reply_main' key={reply.id}>
                <div className='reply_user'>
                    {users[replyUID]?.username}:
                    {reply.userId == userId &&
                    <div>
                    <OpenModalButton
                        buttonText={"edit reply"}
                        modalComponent={<ReplyForm postId={reply.postId} reply={reply}/>}
                    />
                    <OpenModalButton
                        buttonText={"delete reply"}
                        modalComponent={<DeleteItemModal action={deleteReplyThunk} target={reply} landing={'/'}/>}
                    />
                    </div>}
                </div>
                <div className='reply_body'>
                    {reply.body}
                </div>
            </div>
    )
}
