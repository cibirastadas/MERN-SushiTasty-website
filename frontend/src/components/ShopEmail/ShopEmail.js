import React from 'react';
import {AiFillMail} from "react-icons/ai"
import classes from "./ShopEmail.module.css"
const ShopEmail = ({className}) => {
    return (
        <div className={`${className} ${classes.email}`}>
            <a href="mailto:info@sushifresh.lt"><AiFillMail/>info@sushifresh.lt</a>
        </div>
    );
};

export default ShopEmail;