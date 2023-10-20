import React from "react";
import Linkedin from "./Linkedin.png"
import github from "./github.png"
import "./About.css"
export default function About(){
    return(
        <div className="about_main">
            <div>
                The Author's
            </div>
            <div className="logo_box">
                <div className="link_box">
                <a href="https://github.com/Adzamanz">
                    <img src={github} className="link_logo"/>
                </a>
                </div>
                <div className="link_box">
                    <a href="https://www.linkedin.com/in/aaron-zamanzadeh-a10a3275/">
                        <img src={Linkedin} className="link_logo"/>
                    </a>
                </div>
            </div>


        </div>
    )
}
