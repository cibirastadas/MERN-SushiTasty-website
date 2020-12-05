import React from 'react';
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom'
import classes from "./MeniuDisplay.module.css"

const MeniuDisplay = ({item}) => {

const location = useLocation();

    return (
        <div className={classes.meniu}>
            <Link className={classes.link} to={item.path}>
                <img src={item.imgProd} alt="food"/>
                <p className={item.path === location.pathname ? classes.titleBorder : undefined}>{item.title}</p>
            </Link>
        </div>
    );
};

export default MeniuDisplay;