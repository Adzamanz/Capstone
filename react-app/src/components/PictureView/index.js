import React,{ useEffect, useState } from 'react';
import './PictureView.css'
export default function PictureView() {
    return (
        <div className='picture_view'>
            <div className='preview_div'>
                <div className='preview_previous prev_arrow'>
                    <i class="ri-arrow-left-s-line"></i>
                </div>
                <div className='preview_image_display'>
                    {/* <i class="ri-arrow-left-s-line"/> */}
                    <img src="./photo.jpg" className='landing_image'/>
                    {/* <i class="ri-arrow-right-s-line"/> */}
                </div>
                <div className='preview_next prev_arrow'>
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
        </div>
    )
}
