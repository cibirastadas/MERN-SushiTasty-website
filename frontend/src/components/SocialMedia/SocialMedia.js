import React from 'react';
import {AiFillInstagram} from "react-icons/ai"
import {AiFillFacebook} from "react-icons/ai"
import {FaTwitter} from "react-icons/fa"
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillYoutube} from "react-icons/ai"
import classes from "./SocialMedia.module.css"
const SocialMedia = ({style}) => {
    return (
        <div className={classes[style.styleOne]}>
            <a href="https://www.facebook.com/"  target="_blank" rel="noopener noreferrer"><AiFillFacebook/></a>
            <a href="https://www.twitter.com/"  target="_blank" rel="noopener noreferrer"><FaTwitter/></a>      
            <a href="https://www.linkedin.com/"  target="_blank" rel="noopener noreferrer"><AiFillLinkedin/></a>
            <a href="https://www.instagram.com/"  target="_blank" rel="noopener noreferrer"><AiFillInstagram/></a>
            <a href="https://www.youtube.com/"  target="_blank" rel="noopener noreferrer"><AiFillYoutube/></a>
        </div>
    );
};

export default SocialMedia;