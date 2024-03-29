import React,{ useEffect, useState, useRef } from 'react';

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

    const [menuDisplay, setMenuDisplay] = useState(false)
    const [toggle, setToggle] = useState("hide")
    const alRef = useRef();

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
    useEffect(()=>{
        setToggle(menuDisplay ? "shows" : "hides")
    },[menuDisplay])
    useEffect(() => {
        if (!menuDisplay) return;
    
        const closeMenu = (e) => {
          if (!alRef.current.contains(e.target)) {
            setMenuDisplay(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [menuDisplay]);
    return (
        <div className='transaction_main'>
            <div className={`donation_sub_menu sub_menu ${toggle}`}ref={alRef}>
                <div className='menu_button' onClick={() => setMenuDisplay(!menuDisplay)}><i className='ri-menu-line menu_icon'></i></div>
                <div className={`menu_box ${toggle}`}>
                    <div className='donation_list_categories'>
                        <div className='index_title'> Donations </div>
                        <div className='all_div clickable category' onClick={() => setViewTransactions(transactions)}> All </div>

                            <div className='pledge_div clickable category' onClick={() => setViewTransactions(groupBy(Object.values(transactions), ['type'])?.pledge)} >Pledges</div>
                            {Object.keys(myTransactions).map(e => {
                                if(myTransactions[e].pledge){
                                    return (
                                        <div className="post_name clickable" onClick={() => setViewTransactions(myTransactions[e]?.pledge)}>
                                        {posts[e]?.title || "N/A"}
                                    </div>
                                )}
                            })
                        }
                            <div className='fulfilled_div clickable category' onClick={() => setViewTransactions(groupBy(Object.values(transactions), ['type']).pay)} >Fulfilled</div>
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
            <div className='transaction_box'>
                <div className='title_bar'>Donation List</div>
                {Object.values(myTransactions).length ? Object.keys(viewTransactions || {})?.map(e => {
                    return (
                        <div className='transaction_display'>
                            <div className='tran_half a'>
                                <div>user: {users[view[e].userId]?.username}</div>
                                <div>ammount: {view[e].value}</div>
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
            
        </div>
    )
}
