import React from 'react';
import SocialMedia from '../../SocialMedia/SocialMedia';
import { MenuItems } from '../../NavMenuLinks/NavMenuLinks';
import {Link} from "react-router-dom"
import classes from "./FooterInfo.module.css"
import ShopInfo from '../../ShopInfo/ShopInfo';
const FooterInfo = () => {

const links = MenuItems.map((link,index)=>{
return <li key={index}><Link className={classes[link.cName]} to={link.path}>{link.title}</Link></li>
})

    return (
        <div className={classes.footerInfo}>
            <div className={classes.footerLayout}>
                <p className={classes.text}>Kontaktai</p>
                <ShopInfo style={{styleOne : "footerInfo"}}/>
            </div>
            <div className={classes.footerLayout}>
                <p className={classes.text}>Meniu</p>
                {links}
            </div>
            <div className={classes.socialMedia}>
                <p className={classes.text}>Prisijungti</p>
            <SocialMedia style={{styleOne : "footerInfo"}}/>
            </div>  
        </div>
    );
};

export default FooterInfo;