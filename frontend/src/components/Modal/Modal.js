import React from 'react';
import classes from "./Modal.module.css"
const Modal = ({children, style, close}) => {
    return (
        <div className={ close ?  classes.close : classes.modal }>
            <div className={`${classes.innerModal} ${style}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;