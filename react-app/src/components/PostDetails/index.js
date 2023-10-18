import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { groupBy } from '../Utility';
import { getAllPosts } from '../../store/posts';
import { getAllPostTags } from '../../store/postTags';
import { getAllTags } from '../../store/tags';
import { getAllUsers } from '../../store/users';
import { getAllTransactions } from '../../store/transactions'

import "./PostDetails.css"

export default function(){
    const {id} = useParams()
    const dispatch = useDispatch()

    let user = useSelector(state => state.session.user)
    let userId = useSelector(state => state.session.user.id)
    let posts = useSelector(state => state.posts)
    let myPosts = groupBy(Object.values(posts), ['userId'])[userId]
    let thisPost = posts[id];
    let users = useSelector(state => state.users)
    let postTags = useSelector(state => state.postTags)
    let tags = useSelector(state => state.tags)
    let transactions = useSelector(state => state.transactions)
    let thisPostTags = groupBy(Object.values(postTags), ['postId','description'])[id]
    const [thisTags, setThisTags] = useState(groupBy(Object.values(tags),['postId','description'])[id])
    const [thisTransactions, setThisTransactions] = useState(groupBy(Object.values(transactions),['postId'])[id])
    const [thisTotal, setThisTotal] = useState(thisTransactions?.reduce((acc, curr) => {
        let ret = {pledge: 0, pay: 0}
        if(acc.pay || acc.pledge){
            if(curr.type == 'pledge'){
                ret.pledge = acc.pledge + curr.value
            }
            else{
                ret.pay = acc.pay + curr.value
            }
        }else{
            if(acc.type = 'pledge'){
                ret.pledge = acc.value
            }else{
                ret.pay = acc.value
            }
        }
        return ret;

    }))
    useEffect(() => {
        dispatch(getAllTransactions())
        dispatch(getAllPosts())
        dispatch(getAllPostTags())
        dispatch(getAllTags())
        dispatch(getAllUsers())
    },[])
    useEffect(() => {
        setThisTransactions(groupBy(Object.values(tags),['postId'])[id])
    }, [transactions])
    useEffect(() => {
        setThisTotal(thisTransactions?.reduce((acc, curr) => {
            let ret = {pledge: 0, pay: 0}
            if(acc.pay || acc.pledge){
                if(curr.type == 'pledge'){
                    ret.pledge = acc.pledge + curr.value
                }
                else{
                    ret.pay = acc.pay + curr.value
                }
            }else{
                if(acc.type = 'pledge'){
                    ret.pledge = acc.value
                }else{
                    ret.pay = acc.value
                }
            }
            return ret;
        }))

    },[thisTransactions])
    useEffect(() => {
        setThisTags(groupBy(Object.values(tags),['postid','description'])[id])
    }, [tags, id])
    return (
        <div className='post_details_main'>
            {(thisPost?.type == "event" || thisPost?.type == "event/donate") && (thisTags?.Attendance?.length > 0) && <div>
                <div className='attendance_count'>
                    Attending: {thisTags?.Attendance?.length}
                </div>
                {thisTags?.Attendance.map(ele => {
                    return (
                        <div className='tagged_username'>
                            {users[ele.userId].username}
                        </div>
                    )
                })}
            </div>}
            {(thisPost?.type == "donate" || thisPost?.type == "event/donate") && <div>
                {((thisTotal?.pay || 0 + thisTotal?.pledge || 0) > 0) &&
                <div>
                    <div className='post_details_total'>
                        Total Donations:{thisTotal?.pay + thisTotal?.pledge}
                    </div>
                    <div className='post_details_pledge'>
                        Pledged Donations:{thisTotal?.pledge}
                    </div>
                    <div className='post_details_pay'>
                        Payed Donations:{thisTotal?.pay}
                    </div>
                </div>}

            </div>}
        </div>
    )
}
