import React,{ useEffect, useState } from 'react';
import './PictureView.css'
export default function PictureView(props) {
    let {images} = props;
    let pic = ["./photo.jpg","./photo_2023-09-04_13-15-46.jpg"]

    let [current, setCurrent] = useState(0);
    const increment = () => {
        if(images ? current < images?.length - 1 : current < 1) setCurrent(current + 1)
        else setCurrent(0)
        console.log(current)
    }
    const decrement = () => {
        if(current > 0) setCurrent(current - 1)
        else setCurrent(images ? images?.length - 1 : 1)
        console.log(current)
    }

    return (
            <div className='preview_div'>
                <div className='preview_previous prev_arrow' onClick={decrement}>
                    <i class="ri-arrow-left-s-line"></i>
                </div>
                <div className='preview_image_display'>
                    {/* <i class="ri-arrow-left-s-line"/> */}
                    {images ? <img src={`/api/images/img/${images[current].id}`}/> : <img src={pic[current]}/>}
                    {/* <i class="ri-arrow-right-s-line"/> */}
                </div>
                <div className='preview_next prev_arrow' onClick={increment}>
                    <i class="ri-arrow-right-s-line"></i>
                </div>
            </div>
    )
}
