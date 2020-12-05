import React from 'react';
import classes from "./SectionTitleSecond.module.css"
const SectionTitleSecond = ({children}) => {
    return (
        <div className={classes.title}>
            {children}
        </div>
    );
};

export default SectionTitleSecond;