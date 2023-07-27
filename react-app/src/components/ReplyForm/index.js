import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createReplyThunk } from '../../store/replies';
import { useModal } from '../../context/Modal';
export default function ReplyForm (props) {
    const { closeModal } = useModal();
    const {postId} = props;
    const dispatch = useDispatch()
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(body){
            await dispatch(createReplyThunk({postId,body}));
            closeModal();
        }
        else{
            setErrors({body: "you must have a body for your reply!"})
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Body
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
