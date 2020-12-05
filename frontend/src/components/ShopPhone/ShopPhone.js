import React from 'react';
import {AiFillPhone} from "react-icons/ai"
import classes from "./ShopPhone.module.css"

const ShopPhone = ({className}) => {
    return (
        <div className={`${className} ${classes.phone}`}>
            <p><AiFillPhone/>+37065748662</p>
        </div>
    );
};

export default ShopPhone;