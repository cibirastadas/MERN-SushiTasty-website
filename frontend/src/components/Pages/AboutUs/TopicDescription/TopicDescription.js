import React from 'react';
import classes from "./TopicDescription.module.css"
const TopicDescription = ({topic}) => {
    return (
        <div className={classes.descriptionContainer}>
            <p>{topic.description}</p>
            <div className={classes.image}>
                <img src={topic.img} alt=""/>
            </div>
            
        </div>
    );
};

export default TopicDescription;