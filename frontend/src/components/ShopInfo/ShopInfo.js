import React from 'react';
import classes from "./ShopInfo.module.css"
import ShopPhone from "../ShopPhone/ShopPhone"
import ShopAddress from '../ShopAddress/ShopAddress';
import ShopEmail from '../ShopEmail/ShopEmail';
const ShopInfo = ({style}) => {
    return (
        <div className={classes[style.styleOne]}>
            <ShopEmail/>
            <ShopPhone/>
            <ShopAddress/>
        </div>
    );
};

export default ShopInfo;