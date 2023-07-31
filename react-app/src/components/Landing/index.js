import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import FeedDisplay from '../FeedDisplay'
import { groupBy } from '../Utility';
import OpenModalButton from '../OpenModalButton';
import DonationList from '../DonationList';
import FeedForm from '../FeedForm'
import './Landing.css'

export default function Landing () {
    const [category, setCategory] = useState(0)
    const [selected, setSelected] = useState(1)
    const [display, setDisplay] = useState("message_board")
    let feeds = useSelector(state => state.feeds)
    let user = useSelector(state => state.session.user)
    let feedsOrg = groupBy(Object.values(feeds), ['userId'])
    let general = {...feedsOrg};
    delete general[1];
    const [officialFeeds, setOfficialFeeds] = useState(feedsOrg[1])
    const [generalFeeds, setGeneralFeeds] = useState(general)
    // let officialFeeds = feedsOrg[1];

    useEffect(()=> {
        let ofic = feedsOrg[1]
        let gen = feedsOrg;
        delete gen[1];
        setOfficialFeeds(ofic)
        setGeneralFeeds(gen)
    }, [feeds,category,selected])
    useEffect(() => {
        setCategory(0)
        setSelected(1)
    },[user])
    let generalFeedList = Object.values(generalFeeds)?.map(ele => {
        return ele.map(e => {
            return (
                <div className='feed_desc' onClick={() => setSelected(e.id)}>
                    {`${e.description}`}
                </div>
            )
        })
    })
    let officalFeedList = officialFeeds?.map(e => {
        return (
            <div className='feed_desc' onClick={() => setSelected(e.id)}>
                {`${e.description}`}
            </div>
        )
    })
    return (
        <div className='mains'>
            {user && <div className='menu'>
                <div onClick={() => setDisplay("message_board")}>Message Board</div>
                <div onClick={() => setDisplay("my_donations")}>My Donations</div>
            </div>}
            <div className='main_mid'>
                <div className='main_display'>
                    {display == "message_board" && <FeedDisplay id={selected} />}
                    {display == "my_donations" && <DonationList/>}
                </div>
            </div>

            <div className='feed_list'>
                {user && display == "message_board" &&
                <div>
                    <div className='official_tabs'>
                        <div className='tab' onClick={() => setCategory(0)}>
                            Announcements
                        </div>
                        <div className='tab' onClick={() => setCategory(1)}>
                            General
                        </div>
                        {category ? <OpenModalButton buttonText="create feed" modalComponent={<FeedForm/>}/> : <div/> }
                    </div>
                    {category ? generalFeedList : officalFeedList}
                </div>
                }
            </div>
        </div>

    )
}
