import React, { useEffect, useState } from 'react';
import './DropMenu.css'
export default function DropMenu(props) {
    let {Passed} = props.Passed

    const [menuDisplay, setMenuDisplay] = useState(false)
    const [toggle, setToggle] = useState("hides")

    useEffect(()=>{
        setToggle(menuDisplay ? "shows" : "hides")
    },[menuDisplay])

    return(
        <div className={`drop_menu ${toggle}`}>
            <Passed />
            <div className='menu_button_tag' onClick={() => setMenuDisplay(!menuDisplay)}>
                MENU
            </div>
        </div>
    );
}