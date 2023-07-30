import React,{ useEffect, useState } from 'react';

import { useDispatch, useSelector, } from 'react-redux';
import { getAllTransactions } from '../../store/transactions';

export default function DonationList () {
    const dispatch = useDispatch()
    let transactions = useSelector(state => state.transactions)
    useEffect(() => {
        dispatch(getAllTransactions())
    },[])
    return (
        <div>
            {Object.values(transactions)?.map(e => (<div>userId: {e.userId}, postId: {e.postId || "N/A"}, value: {e.value}, fee: {e.fee}, description: {e.description}, entry_date: {e.entry_date}, transaction_date: {e.transaction_date || "N/A"}, type: {e.type}</div>))}
        </div>
    )
}
