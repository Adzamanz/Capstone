import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './Menu.css'
export default function Menu() {
    const history = useHistory();
    return (
        <div className='menu'>
            {/* <div className='menu_title'> Menu </div> */}
            <div className='menu_option clickable' onClick={() => history.push("/feeds")}>Message Board</div>
            <div className='menu_option clickable' onClick={() => history.push("/donations")}>My Donations</div>
            <div className='menu_option clickable' onClick={() => history.push("/my_posts")}>My Posts</div>
        </div>
    )
}
