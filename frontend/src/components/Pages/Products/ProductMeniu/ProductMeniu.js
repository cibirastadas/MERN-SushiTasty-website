import React from 'react';
import classes from "./ProductMeniu.module.css";
import {MenuItems} from "../../../NavMenuLinks/NavMenuLinks";
import MeniuDisplay from '../MeniuDisplay/MeniuDisplay';

const ProductMeniu = () => {

    const products = MenuItems.map((item,index)=>{
        return <MeniuDisplay key={index} item={item}/>
    })

    return (
        <div className={classes.productContainer}>
            {products}
        </div>
    );
};

export default ProductMeniu;