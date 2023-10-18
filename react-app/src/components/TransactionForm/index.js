import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { createTransactionThunk } from "../../store/transactions";

import "./TransactionForm.css"

export default function TransactionForm(props) {
    const { closeModal } = useModal();
    const {postId} = props
    const dispatch = useDispatch()
    const [value, setValue] = useState(0.00)
    const [fee, setFee] = useState(0.00)
    const [description, setDescription] = useState()
    const [type,setType] = useState('pledge')
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(value && description && type){
            let transaction = {postId,value,fee,description,type}
            let data = dispatch(createTransactionThunk(transaction))
            if(data){
                closeModal()
            }
        }
    }
    return (
        <div className="transaction_form_main">
            <h1>Donate</h1>
            <form onSubmit={handleSubmit}>
                <div className="transaction_form">
                    <div>
                       <div className="transaction_form_input_div trans_tpe_select">
                            <div>Ammount:</div>
                            <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="transaction_form_input_div trans_tpe_select">
                            <div>Fee:</div>
                            <input
                            type="number"
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                            required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="transaction_form_input_div trans_tpe_select">
                            <div>Description:</div>
                            <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div className="trans_type_select">
                        <div >
                            <select
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            >
                                <option key={"Pledge"} value={"pledge"} defaultValue={true}>Pledge</option>
                                <option key={"Pay"} value={"pay"}>Pay</option>
                                {/* <option key={"Paypal"} value={"paypal"}>Paypal</option>
                                <option key={"Venmo"} value={"venmo"}>Venmo</option>
                                <option key={"Zelle"} value={"zelle"}>Zelle</option>
                                <option key={"Bitcoin"} value={"bitcoin"}>Bitcoin</option>
                                <option key={"Card"} value={"card"}>Card</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="transaction_form_button_box">
                        <div onClick={handleSubmit} type="submit">Submit</div>
                    </div>
                </div>
            </form>
        </div>
    )
}
