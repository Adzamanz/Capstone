import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './DeleteItemModal.css'
export const DeleteItemModal = (props) => {
    const {action, target, landing} = props
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleSubmit = async () => {
        dispatch(action(target));
        closeModal();
    }
    return(
        <div className="delete_main">
            <h3>Are you sure you want to delete?</h3>
            <div>
                <button id='yesbutton' onClick={() => handleSubmit()}>
                    YES
                </button>
                <button id='nobutton' onClick={() => closeModal()}>
                    NO
                </button>
            </div>

        </div>
    )
}
