import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { createTransactionThunk } from "../../store/transactions";

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
        console.log(postId,value,fee,description,type)
        if(value && description && type){
            let transaction = {postId,value,fee,description,type}
            let data = dispatch(createTransactionThunk(transaction))
            if(data){
                console.log(data)
                closeModal()
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Value
                        <input
                        type="float"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        />
                    </label>
                    <label>
                        Fee
                        <input
                        type="float"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        required
                        />
                    </label>
                    <label>
                        Description
                        <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </label>
                    <label>
                        <select
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        >
                            <option key={"Pledge"} value={"pledge"} defaultValue={true}>Pledge</option>
                            <option key={"Paypal"} value={"paypal"}>Paypal</option>
                            <option key={"Venmo"} value={"venmo"}>Venmo</option>
                            <option key={"Zelle"} value={"zelle"}>Zelle</option>
                            <option key={"Bitcoin"} value={"bitcoin"}>Bitcoin</option>
                            <option key={"Card"} value={"card"}>Card</option>
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
