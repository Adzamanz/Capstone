import React, { useEffect, useState } from 'react';
import './DropMenu.css'
export default function DropMenu(props) {
    let {Passed} = props.Passed
    return(
        <div className='drop_menu'>
            <Passed />
            <div className='menu_button_tag'>
                MENU
            </div>
        </div>
    );
}