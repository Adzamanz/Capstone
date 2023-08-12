import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import ReplyForm from '../ReplyForm';
import './ReplyDisplay.css'
import { deleteReplyThunk } from '../../store/replies';
import { DeleteItemModal } from '../DeleteItemModal';
import { getAllUsers } from '../../store/users';

export default function ReplyDisplay(props){
    let {postId} = props;
    const dispatch = useDispatch()
    let replies = useSelector(state => state.replies);
    const [postReplies,setPostReplies] = useState(groupBy(Object.values(replies), ['postId'])[postId]);
    let users = useSelector(state => state.users);
    const userId = useSelector(state => state.session.user?.id);
    console.log(postId, postReplies)
    useEffect(() => {
        setPostReplies(groupBy(Object.values(replies), ['postId'])[postId])
    },[replies])
    useEffect(() => {
        dispatch(getAllUsers())
    },[])
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
    const userId = useSelector(state => state.session.user?.id);
    let replyUID = reply.userId;
    return (
        <div className='reply_main' key={reply.id}>
                <div>

                    {reply.userId == userId &&
                    <div className='button_box'>
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
                {<div className='reply_user'> {users[replyUID]?.username}: </div>}{<div className='reply_message'>{reply.body}</div>}
                </div>
            </div>
    )
}
