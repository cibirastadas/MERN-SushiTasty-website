import React, {useState}from 'react';
import {Link} from "react-router-dom"
import classes from "./DropDown.module.css"

const DropDown = ({links}) => {

    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    const menuItems = links.map((item, index)=>{
    return <li key={index}><Link className={classes[item.cName]} to={item.path} onClick={()=> setClick(false)}>{item.title}</Link></li>
    })
    return (
            <>
            <ul onClick={handleClick} className={click ? `${classes.dropDownMenu} ${classes.clicked}` : classes.dropDownMenu}>
                {menuItems}    
            </ul>   
            </>
    );
};

export default DropDown;