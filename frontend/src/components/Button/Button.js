import React from 'react';
import { Link } from 'react-router-dom';
import classes from "./Button.module.css"
const Button = ({linkTo, style, children, action, btnType, id, styleLink, cName}) => {
    
    return (
        <>
    
            {linkTo ? 
            <Link 
                className={`${classes.link} ${styleLink}`} 
                to={linkTo}>
                <button 
                    className={`${classes.btn} ${style} ${cName && classes[cName.btnColor]}`} 
                    onClick={action}>{children}
                </button>
            </Link> :
             
            <button 
                type={btnType}
                className={`${classes.btn} ${style} ${ cName && classes[cName.btnColor]}`} 
                onClick={id ? ()=>action(id) : action}
                >{children}
            </button>}
        </>
    );
};

export default Button;