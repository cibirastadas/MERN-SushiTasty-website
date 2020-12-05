import React from 'react';
import {MdLocationOn} from "react-icons/md"
import classes from "./ShopAddress.module.css"
const ShopAddress = ({className}) => {
    return (
        <div className={`${className} ${classes.adress}`}>
            <p><MdLocationOn/>Savanorių pr.157A</p>
        </div>
    );
};

export default ShopAddress;