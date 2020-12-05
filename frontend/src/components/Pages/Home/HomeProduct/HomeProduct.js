import React from 'react';
import {Link} from "react-router-dom"
import classes from "./HomeProduct.module.css"

const HomeProduct = ({product}) => {
    return (
        <div className={classes.productContainer}>
            <Link className={classes.link}to={product.path}>
                <p className={classes.title}>{product.title}</p>
                    <img src={product.image} alt="food"/>
            </Link>
        </div>
    );
};

export default HomeProduct;