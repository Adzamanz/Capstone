import React,{ useEffect, useState } from 'react';
import './PictureView.css'
export default function PictureView() {
    let pic = {1:"./photo.jpg", 2:"./photo_2023-09-04_13-15-46.jpg"}
    let [current, setCurrent] = useState(pic[1]);

    return (
            <div className='preview_div'>
                <div className='preview_previous prev_arrow' onClick={() => setCurrent(current == "./photo.jpg" ? "./photo_2023-09-04_13-15-46.jpg" : "./photo.jpg")}>
                    <i class="ri-arrow-left-s-line"></i>
                </div>
                <div className='preview_image_display'>
                    {/* <i class="ri-arrow-left-s-line"/> */}
                    <img src={current} className='landing_image'/>
                    {/* <i class="ri-arrow-right-s-line"/> */}
                </div>
                <div className='preview_next prev_arrow' onClick={() => setCurrent(current == "./photo.jpg" ? "./photo_2023-09-04_13-15-46.jpg" : "./photo.jpg")}>
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
    )
}
