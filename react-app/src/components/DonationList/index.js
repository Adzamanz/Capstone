import React,{ useEffect, useState } from 'react';

import { useDispatch, useSelector, } from 'react-redux';
import { getAllTransactions, getEveryTransaction } from '../../store/transactions';
import { getAllUsers } from '../../store/users';
import { groupBy } from '../Utility';

import './DonationList.css'

export default function DonationList (props) {

    let transactions = useSelector(state => state.transactions)
    let posts = useSelector(state => state.posts)
    let myTransactions = groupBy(Object.values(transactions), ['postId','type'])
    const [viewTransactions, setViewTransactions] = useState(transactions)
    let view = viewTransactions;
    useEffect(()=>{
        setViewTransactions(transactions)
    },[transactions])
    const dispatch = useDispatch()
    let userId = useSelector(state => state.session.user?.id)
    let users = useSelector(state => state.users)
    useEffect(() => {
       userId == 1 ? dispatch(getEveryTransaction()) : dispatch(getAllTransactions())
       dispatch(getAllUsers())
    },[])
    return (
        <div className='transaction_main'>
            <div className='transaction_box'>
                <div className='title_bar'>Donation List</div>
                {Object.values(myTransactions).length ? Object.keys(viewTransactions || {})?.map(e => {
                    return (
                        <div className='transaction_display'>
                            <div className='tran_half a'>
                                <div>user: {users[view[e].userId]?.username}</div>
                                <div>value: {view[e].value}</div>
                                <div>fee: {view[e].fee}</div>
                                <div>postId: {view[e].postId || "N/A"}</div>
                            </div>
                            <div className='tran_half b'>
                                <div>type: {view[e].type}</div>
                                <div>description: {view[e].description}</div>
                                <div>entry_date: {view[e].entry_date}</div>
                                <div>transaction_date: {view[e].transaction_date || "N/A"}</div>
                            </div>
                        </div>
                    )
                }): <div className='empty_donation_list'>Nothing here.</div>}
            </div>
            <div className='donation_sub_menu'>
                <div className='donation_list_categories'>
                    <div className='index_title'> Donations </div>
                    <div className='pledge_div clickable' onClick={() => setViewTransactions(transactions)}> All </div>

                        <div className='pledge_div clickable' onClick={() => setViewTransactions(groupBy(Object.values(transactions), ['type'])?.pledge)} >Pledges</div>
                        {Object.keys(myTransactions).map(e => {
                            if(myTransactions[e].pledge){
                                return (
                                    <div className="post_name clickable" onClick={() => setViewTransactions(myTransactions[e]?.pledge)}>
                                    {posts[e]?.title || "N/A"}
                                </div>
                            )}
                        })
                    }
                        <div className='fulfilled_div clickable' onClick={() => setViewTransactions(groupBy(Object.values(transactions), ['type']).pay)} >Fulfilled</div>
                        {Object.keys(myTransactions).map(e => {
                            if(myTransactions[e].pay){
                                return (
                                    <div  className="post_name clickable" onClick={() => setViewTransactions(myTransactions[e]?.pay)}>
                                        {posts[e]?.title || "N/A"}
                                    </div>
                            )}
                        })}
                    </div>
            </div>
        </div>
    )
}
