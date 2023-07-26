import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import FeedDisplay from '../FeedDisplay'
import { groupBy } from '../Utility';
import './Landing.css'

export default function Landing () {
    const [category, setCategory] = useState(0)
    const [selected, setSelected] = useState(1)
    let feeds = useSelector(state => state.feeds)
    let feedsOrg = groupBy(Object.values(feeds), ['userId'])
    let general = {...feedsOrg};
    delete general[1];
    console.log(feedsOrg[1])
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
    console.log(generalFeeds)
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
    console.log(generalFeeds)
    return (
        <div>
            <div className='main_mid'>
                <div className='official_tabs'>
                    <div className='tab' onClick={() => setCategory(0)}>
                        Announcements
                    </div>
                    <div className='tab' onClick={() => setCategory(1)}>
                        General
                    </div>
                </div>
                <div c>
                    <FeedDisplay id={selected} />
                </div>
            </div>
            <div className='feed_list'>
                {category ? generalFeedList : officalFeedList}
            </div>
        </div>

    )
}
