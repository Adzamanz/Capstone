import React, { useEffect, useState , useRef} from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { groupBy } from '../Utility';
import './FeedDisplay.css'
import PostDisplay from '../PostDisplay';
import OpenModalButton from '../OpenModalButton';
import PostForm from '../PostForm';
import { DeleteItemModal } from '../DeleteItemModal';
import { deleteFeedThunk } from '../../store/feeds';
import { getAllPosts } from '../../store/posts';
import { getAllReplies } from '../../store/replies';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import FeedForm from '../FeedForm';

export default function FeedDisplay (props) {
    const {justFeed} = props;
    let {id} = useParams();
    if(!id) id = 1;
    // const {id} = props;
    // let {id} = props.id ? props : useParams();
    const alRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory()

    let feeds = useSelector(state => state.feeds)
    let feed = feeds[id]
    let posts = useSelector(state => state.posts)
    let user = useSelector(state => state.session.user)


    let feedsOrg = groupBy(Object.values(feeds), ['userId'])
    let general = {...feedsOrg};
    delete general[1];

    const [menuDisplay, setMenuDisplay] = useState(false)
    const [toggle, setToggle] = useState("hides")

    const [officialFeeds, setOfficialFeeds] = useState(feedsOrg[1])
    const [generalFeeds, setGeneralFeeds] = useState(general)

    const [postsOrg,setPostsOrg] = useState(groupBy(Object.values(posts), ['feedId']))
    const [postFeed, setPostFeed] = useState(postsOrg[id]?.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    }).map(ele => <PostDisplay postId={ele.id}/>))

    let generalFeedList = Object.values(generalFeeds)?.map(ele => {
        return ele.map(e => {
            return (
                <div className='feed_desc clickable' onClick={() => history.push(`/feeds/${e.id}`)}>
                    {e.description}
                </div>
            )
        })
    })
    let officalFeedListMaker = () => officialFeeds?.map(e => {
        return (
            <div className='feed_desc clickable' onClick={() => history.push(`/feeds/${e.id}`)}>
                {`${e.description}`}
            </div>
        )
    })
    useEffect(()=> {
        feedsOrg = groupBy(Object.values(feeds), ['userId'])
        let ofic = feedsOrg[1]
        let gen = feedsOrg
        delete gen[1];
        setOfficialFeeds(ofic)
        setGeneralFeeds(gen)

    }, [feeds])
    useEffect(() =>{
        dispatch(getAllPosts())
        dispatch(getAllReplies())
    },[feed])
    useEffect(()=>{
        setPostsOrg(groupBy(Object.values(posts), ['feedId']))
    },[posts])
    useEffect(()=>{
        setPostFeed(postsOrg[id]?.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }).map(ele => <PostDisplay postId={ele.id}/>))
    },[postsOrg])

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

    let Menu = () =>{
        return(
            <div className={`feed_sub_menu sub_menu`} ref={alRef}>
                 <div className='menu_button' onClick={() => setMenuDisplay(!menuDisplay)}>
                    <i className='ri-menu-line menu_icon'></i>
                </div>
                {menuDisplay && <div className={`menu_box ${toggle}`}>
                    
                    <div className='feed_list_title'>Feed List</div>
                    <div className='feed_list_display'>
                        {officalFeedListMaker()}
                        {generalFeedList}
                    </div> 
                </div>}
               
            </div>
        )
    }
   


    useEffect(()=>{
        setToggle(menuDisplay ? "shows" : "hides")
    },[menuDisplay])
    return (
        <div className='feed_main'>
            {user && !justFeed && Menu()}
            <div className='feed_button_box_main'> 
                <div className='feed_button_box'>
                    <OpenModalButton buttonText={<i class="ri-add-box-line new_feed_button">new feed</i>} modalComponent={<FeedForm/>}/>
                </div>
                {(feed?.public || feed?.userId == user?.id)
                &&
                <div className='feed_button_box'>
                    <OpenModalButton
                    buttonText={<i class="ri-chat-new-line"></i>}
                    modalComponent={<PostForm feedId={id}/>}
                    />
                    <OpenModalButton
                        buttonText={<i class="ri-chat-delete-line"></i>}
                        modalComponent={<DeleteItemModal action={deleteFeedThunk} target={feed} landing={'/'}/>}
                    />
            </div>}
            </div>
           
            
            <div className='feed_box'>
                <div className='feed_title'>
                    {feed?.description} 
                </div>
                

                <div className='feed_body'>
                    {postFeed || <div className='empty_div'> Nothing here </div>}
                </div>
            </div>

            
        </div>
    )
}
