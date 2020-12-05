import React from 'react';
import classes from "./SectionTitle.module.css"

const SectionTitle = ({children, style}) => {
    return (
        <div className={ style ? `${classes.titleContainer} ${classes[style.styleTitle]}` : classes.titleContainer }>
            <h2 className={classes.title}>{children}</h2>
        </div>
    );
};

export default SectionTitle;