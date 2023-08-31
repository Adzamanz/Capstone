import React,{ useEffect, useState } from 'react';
import './PictureView.css'
export default function PictureView() {
    return (
        <div className='picture_view'>
            <h2 className='landing_h1'> Welcome to the Westwood Bet Knesset</h2>
            <div className='landing_info'>
                <div className='landing_image_box'>
                    <img src="photo.jpg" className='landing_image'/>
                </div>
                <div className='landing_welcome'>
                </div>
            </div>
        </div>
    )
}
