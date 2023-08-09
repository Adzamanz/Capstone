import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReplyThunk, updateReplyThunk } from '../../store/replies';
import { useModal } from '../../context/Modal';
import './ReplyForm.css'
export default function ReplyForm (props) {
    const { closeModal } = useModal();
    const {postId} = props;
    const replyId = props.reply?.id;

    const dispatch = useDispatch();
    const thisReply = useSelector(state => state.replies[replyId])
    const [body, setBody] = useState(thisReply?.body)
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(body){
            let newReply = {...thisReply,body}
            replyId ? dispatch(updateReplyThunk(newReply, replyId)) : await dispatch(createReplyThunk({postId,body}));
            closeModal();
        }
        else{
            setErrors({body: "you must have a body for your reply!"})
        }

    }
    return (
        <div className='reply_form_main'>
            <h1>Reply Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Reply:
                    <input
                        type="text"
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}
                        required
                    />
                    {Object.values(errors) && <div>{Object.values(errors)[0]}</div>}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
