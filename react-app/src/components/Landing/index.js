import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import FeedDisplay from '../FeedDisplay'
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import DonationList from '../DonationList';
import FeedForm from '../FeedForm'
import './Landing.css'
import { getAllTransactions, getEveryTransaction } from '../../store/transactions';
import PostDisplay from '../PostDisplay';
import { getAllPosts } from '../../store/posts';
import PictureView from '../PictureView';

export default function Landing () {
    const dispatch = useDispatch();
    let posts = useSelector(state => state.posts);
    const getUpcomingEvents = () => {
        let organizedPosts = groupBy(Object.values(posts),['type'])
        let eventAndDonate = organizedPosts["event/donate"]
        let allEvents = eventAndDonate ? eventAndDonate.concat(organizedPosts?.event) : organizedPosts?.event
        console.log(allEvents)
        let objectEvents = groupBy(allEvents, ['date'])
        let dateList = Object.values(allEvents  || {}).sort((a,b) => new Date(a.date) - new Date(b.date)) || []
        console.log(dateList)
        let upcomings = dateList?.filter(ele => {
            let now = Date.now()//.getTime()
            let then = new Date(ele.date)
            console.log(then,now)

            return (then > now)
        })
        console.log(upcomings)
        return upcomings

    }
    useEffect(() => {
        dispatch(getAllPosts)
    },[])
    const [upcoming, setUpcoming] = useState(getUpcomingEvents()?.map( ele => {
        console.log(ele)
        return(
            <PostDisplay postId={ele.id}/>
        )
    }));

    useEffect(() => {
        setUpcoming(getUpcomingEvents()?.map( ele => {
            return (
                <PostDisplay postId={ele.id}/>
            )
        }))
    },[posts])
    console.log(upcoming)
    return (
        <div className='landing_main'>
            <img className="home_image" src="./photo.jpg" />
            <div className='landing_upcoming_title'> Upcoming Events! </div>
            <div className='landing_upcoming'>
                {upcoming}
            </div>
        </div>
    )
}
