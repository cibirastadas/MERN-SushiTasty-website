import React from 'react';
import {Link} from "react-router-dom";
import classes from "./NavBarLinks.module.css";
import {IoMdArrowDropdown} from "react-icons/io";
import DropDown from '../DropDown/DropDown';
import Button from '../../Button/Button';
import {FaUserAlt} from "react-icons/fa"
import { MenuItems } from '../../NavMenuLinks/NavMenuLinks';
import { UserLinks } from "../../UserLinksData/UserLinksData";
import LogReg from "../../../containers/Pages/LogReg/LogReg";

const NavBarLinks = ({click, closeMobileMenu, dropDown, onMouseEnter, onMouseLeave, login, handleLogin , handleRemoveCookie, userCookie, readCookie, userDrop}) => {

    return (
    <nav className={classes.linksContainer}>
        
        <ul className={click ? `${classes.navMenu} ${classes.active}` : classes.navMenu}>
            <li className={classes.navItem}>
                <Link to="/" className={classes.navLink} onClick={closeMobileMenu}>Pradinis</Link>
            </li>
            <li className={classes.navItem} 
                onMouseEnter={()=>onMouseEnter("meniu")} 
                onMouseLeave={onMouseLeave}>
                <Link to="/products" className={classes.navLink} onClick={ closeMobileMenu }>Meniu<IoMdArrowDropdown className={classes.arrow}/></Link>
                {dropDown && <DropDown links={MenuItems}/> }
            </li>
            <li className={classes.navItem}>
                <Link to="/about" className={classes.navLink} onClick={closeMobileMenu}>Apie mus</Link>
            </li>
            <li className={classes.navItem}>
                <Link to="/contacts" className={classes.navLink} onClick={closeMobileMenu}>Kontaktai</Link>
            </li>
            {userCookie && <li className={classes.navItem} 
                onMouseEnter={()=>onMouseEnter("user")} 
                onMouseLeave={onMouseLeave} >
                <Link to="/feedbacks" className={classes.navLink} onClick={ closeMobileMenu }><FaUserAlt/><IoMdArrowDropdown className={classes.arrow}/></Link>
                {userDrop && <DropDown links={UserLinks}/> }
            </li>}
            {userCookie ? 
            <li className={classes.navItem}><Button style={classes.navButton} styleLink={classes.navBtnLink} linkTo={"/"} action={handleRemoveCookie}>Atsijungti</Button></li>
            :
            <li className={classes.navItem}><Button style={classes.navButton} action={handleLogin}>Prisijungti</Button></li> }
        </ul>
        {login && <LogReg handleLogin={handleLogin} readCookie={readCookie}/>}
    </nav>
    );
};

export default NavBarLinks;