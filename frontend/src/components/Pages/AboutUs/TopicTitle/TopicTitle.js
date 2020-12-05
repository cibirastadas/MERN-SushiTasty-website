import React from 'react';
import classes from "./TopicTitle.module.css"
const TopicTitle = ({topic,action,title}) => {
    return (
        <h2 
            className={title===topic.title 
                ? `${classes.title} ${classes.borderBottom}` 
                : classes.title} 
            onClick={()=>action(topic.title)}
            >
            {topic.title}
        </h2>
    );
};

export default TopicTitle;