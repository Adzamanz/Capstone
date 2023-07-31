import React,{ useEffect, useState } from 'react';

import { useDispatch, useSelector, } from 'react-redux';
import { getAllTransactions, getEveryTransaction } from '../../store/transactions';
import './DonationList.css'
export default function DonationList () {
    const dispatch = useDispatch()
    let userId = useSelector(state => state.session.user?.id)
    let transactions = useSelector(state => state.transactions)
    useEffect(() => {
       userId == 1 ? dispatch(getEveryTransaction()) : dispatch(getAllTransactions())
    },[])
    return (
        <div>
            {Object.values(transactions)?.map(e => {
                return (
                    <div className='transaction_display'>
                        <div>userId: {e.userId}</div>
                        <div>postId: {e.postId || "N/A"}</div>
                        <div>value: {e.value}</div>
                        <div>fee: {e.fee}</div>
                        <div>description: {e.description}</div>
                        <div>entry_date: {e.entry_date}</div>
                        <div>transaction_date: {e.transaction_date || "N/A"}</div>
                        <div>type: {e.type}</div>
                    </div>
                )
                })}
        </div>
    )
}
