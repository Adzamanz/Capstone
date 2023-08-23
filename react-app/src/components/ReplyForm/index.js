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

        let newErrors = {}
        if(body?.length > 300){
            newErrors.body = "the body of your reply must be less than 300 characters"
        }
        setErrors(newErrors)

        if(body && !newErrors.body){
            let newReply = {...thisReply,body}
            replyId ? dispatch(updateReplyThunk(newReply, replyId)) : await dispatch(createReplyThunk({postId,body}));
            closeModal();
        }
        console.log(errors)

    }
    return (
        <div className='reply_form_main'>
            <h1>Reply Form</h1>
            <form onSubmit={handleSubmit} className='reply_form'>
                <label>
                    Reply:
                    <input
                        type="text"
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}
                        required
                    />
                </label>
                {errors.body && <div className='error'>{errors.body}</div>}
                <div className='reply_form_button_box'>
                    <div onClick={handleSubmit} type="submit">Submit</div>
                </div>
            </form>
        </div>
    )
}
