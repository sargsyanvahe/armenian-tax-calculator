import React from "react";
import linkedinImg from '../assets/icons/linkedin.png'
import githubImg from '../assets/icons/github.png'

import '../App.css'

function Author() {
    return (
        <div className='author-container'>
            <div>
                <a href='http://linkedin.com/in/vahe-sargsyan-6a66ba132' target='_blank'>
                    <img src={linkedinImg} alt="lnkdn"/>
                    <span>LinkedIn</span>
                </a>
            </div>
        </div>
    )
}

export default Author