import React from 'react';
import classes from "./FormSuccess.module.css"
const FormSuccess = ({response}) => {
    return (
        <div className={classes.successCover}>
            <h1 className={classes.title}>{response}</h1>
        </div>
    );
};

export default FormSuccess;