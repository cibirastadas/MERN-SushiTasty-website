import React from 'react';
import {BiTime} from "react-icons/bi"
import classes from "./ShopTime.module.css"
const ShopTime = ({className}) => {
    return (
        <div className={`${classes.timeContainer} ${className}`}>
            <BiTime size={30}/>
            <div >
                <p>Darbo laikas:</p>
                <p>I – V 10:00 – 18:00</p> 
                <p>VI – VII 11:00 – 15:00</p>
            </div>
        </div>
    );
};

export default ShopTime;