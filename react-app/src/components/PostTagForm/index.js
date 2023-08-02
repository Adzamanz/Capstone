import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function PostTagForm (props) {
    const {postType, postTags, setPostTags} = props;

    const dispatch = useDispatch();
    const [description, setDescription] = useState("Like");
    const [type, setType] = useState('like');
    const handleSubmit = () => {
        let newPostTags = postTags ? [...postTags] : [];
        let newPostTag = {description, type};
        newPostTags.push(newPostTag);
        setPostTags(newPostTags)
        setDescription('Like')
        setType('like')
    }
    return (
        <div className='post_tag_main'>
            <div className='post_tag_form'>
                <div>
                    <label>
                        Tag
                        <input
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <select
                            name='type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option key={'Like'} value={'like'}>Like</option>
                            <option key={'Attendance'} value={'attendance'}>Attendance</option>
                            {/* <option key={'Vote'} value={'vote'}>Vote</option> */}
                        </select>
                    </label>
                </div>
                <div onClick={handleSubmit}>add tag</div>
            </div>
        </div>
    )
}
