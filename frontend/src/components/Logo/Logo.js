import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/Logo.png'
import classes from "./Logo.module.css"

export default function NavBarLogo({style}) {
    return (
            <div className={`${classes.logoContainer} ${classes[style.logo]}`}>
               <Link to='/'><img src={logo} alt='logo-img' /></Link>
            </div>
    )
}
