import React from 'react';
import classes from "./LegendForm.module.css"
const LegendForm = ({children}) => {
    return (
        <fieldset className={classes.legendForm}>
            {children}
        </fieldset>
    );
};

export default LegendForm;