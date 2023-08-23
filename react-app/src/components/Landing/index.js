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

export default function Landing () {
    const dispatch = useDispatch();
    let posts = useSelector(state => state.posts);
    const getUpcomingEvents = () => {
        let organizedPosts = groupBy(Object.values(posts),['type'])
        let eventAndDonate = organizedPosts["event/donate"]
        let allEvents = eventAndDonate ? eventAndDonate.concat(organizedPosts?.event) : organizedPosts?.event
        console.log(allEvents)
        let objectEvents = groupBy(allEvents, ['date'])
        let dateList = Object.values(allEvents).sort((a,b) => new Date(a.date) - new Date(b.date)) || []
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
    // let orderedEventPosts = allEvents.map(ele => ele).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    // let eventDates = orderedEventPosts.map(ele => ele.date)
    // let upcoming = using index of nearest date after today in event dates, find the upcoming event posts

    console.log(upcoming)
    return (
        <div className='landing_main'>
            <h2 className='landing_h1'> Welcome to the Westwood Bet Knesset</h2>
            <div className='landing_info'>
                <div className='landing_image_box'>
                    <img src="photo.jpg" className='landing_image'/>
                </div>
                <div className='landing_welcome'>
                    <div>
                        We are
                    </div>
                    <div>Location</div>
                    <div> contact info </div>
                </div>
            </div>

            <div className='landing_new'>
                <FeedDisplay justFeed={true} />
            </div>
            <div className='landing_upcoming_title'> Upcoming Events! </div>
            <div className='landing_upcoming'>

                {upcoming}
            </div>
        </div>
    )
}

// export default function Landing () {
//     const dispatch = useDispatch()
//     const [category, setCategory] = useState(0)
//     const [selected, setSelected] = useState(1)
//     const [display, setDisplay] = useState("message_board")
//     let feeds = useSelector(state => state.feeds)
//     let user = useSelector(state => state.session.user)
//     let feedsOrg = groupBy(Object.values(feeds), ['userId'])
//     let general = {...feedsOrg};
//     delete general[1];
//     const [officialFeeds, setOfficialFeeds] = useState(feedsOrg[1])
//     const [generalFeeds, setGeneralFeeds] = useState(general)

//     let posts = useSelector(state => state.posts)
//     let transactions = useSelector(state => state.transactions)
//     let myTransactions = groupBy(Object.values(transactions), ['postId','type'])
//     const [viewTransactions, setViewTransactions] = useState(Object.values(transactions))
//     // let officialFeeds = feedsOrg[1];
//     useEffect(()=> {
//         user?.id == 1 ? dispatch(getEveryTransaction()) : dispatch(getAllTransactions())
//     },[])
//     useEffect(()=>{
//         console.log(viewTransactions)

//         setViewTransactions(transactions)
//     },[transactions])
//     useEffect(()=> {
//         feedsOrg = groupBy(Object.values(feeds), ['userId'])
//         let ofic = feedsOrg[1]
//         let gen = feedsOrg
//         delete gen[1];
//         setOfficialFeeds(ofic)
//         setGeneralFeeds(gen)

//     }, [feeds,category,selected])
//     useEffect(()=>{
//         if(!feeds[selected]){
//             setCategory(0)
//             setSelected(1)
//         }
//     },[feeds])
//     useEffect(() => {
//         setCategory(0)
//         setSelected(1)
//     },[user])
//     let generalFeedList = Object.values(generalFeeds)?.map(ele => {
//         return ele.map(e => {
//             return (
//                 <div className='feed_desc clickable' onClick={() => setSelected(e.id)}>
//                     {`${e.description}`}
//                 </div>
//             )
//         })
//     })
//     let officalFeedList = officialFeeds?.map(e => {
//         return (
//             <div className='feed_desc clickable' onClick={() => setSelected(e.id)}>
//                 {`${e.description}`}
//             </div>
//         )
//     })
//     return (
//         <div className='mains'>
//             <div className='main_mid'>
//                 <div className='main_display'>
//                     {display == "message_board" && <FeedDisplay id={selected} />}
//                     {display == "my_donations" && viewTransactions && <DonationList view={viewTransactions}/>}
//                 </div>
//             </div>

//             {user && <div className='feed_list'>
//                 {display == "message_board" &&
//                 <div>
//                     <div className='official_tabs'>
//                         <div className='tab clickable' onClick={() => setCategory(0)}>
//                             Announcements
//                         </div>
//                         <div className='tab clickable' onClick={() => setCategory(1)}>
//                             General
//                         </div>
//                     </div>
//                     <div className='feed_list_display'>
//                         {category ? <OpenModalButton buttonText="create feed" modalComponent={<FeedForm/>}/> : <div/> }
//                         {category ? generalFeedList : officalFeedList}
//                     </div>
//                 </div>
//                 }
//                 {user && display == "my_donations" &&
//                 <div className='donation_list_categories'>
//                     <div className='index_title'> Donations </div>
//                     <div className='all_div clickable' onClick={() => setViewTransactions(transactions)}> All </div>
//                     <div className='pledge_list'>
//                         <div className='pledge_div clickable' onClick={() => setViewTransactions(groupBy(Object.values(transactions), ['type'])?.pledge)} >Pledges</div>
//                         {Object.keys(myTransactions).map(e => {
//                             if(myTransactions[e].pledge){
//                             return (
//                                 <div className="pledge_post_name clickable" onClick={() => setViewTransactions(myTransactions[e]?.pledge)}>
//                                     {posts[e]?.title || "N/A"}
//                                 </div>
//                             )}
//                         })
//                         }
//                     </div>
//                     <div className='fulfilled_list'>
//                         <div className='fulfilled_div clickable' onClick={() => setViewTransactions(groupBy(Object.values(transactions), ['type']).pay)} >Fulfilled</div>
//                         {Object.keys(myTransactions).map(e => {
//                             if(myTransactions[e].pay){
//                             return (
//                                 <div  className="fulfilled_post_name clickable" onClick={() => setViewTransactions(myTransactions[e]?.pay)}>
//                                     {posts[e]?.title || "N/A"}
//                                 </div>
//                             )}
//                         })
//                         }
//                     </div>
//                 </div>}
//             </div>}
//         </div>

//     )
// }
