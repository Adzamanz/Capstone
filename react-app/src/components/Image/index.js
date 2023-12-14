import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './Image.css'


export default function Image(){
    let {id} = useParams();
    return(
        <div>
            <img src={`/api/images/img/${id}`} className="big_image"/>
        </div>
    )
}