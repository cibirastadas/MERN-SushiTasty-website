import React from 'react';
import classes from "./FooterPrivacy.module.css"
import Logo from "../../Logo/Logo"
const FooterPrivacy = () => {
    return (
        <div className={classes.footerPrivacy}>
            <Logo style={{logo : "footerLogo"}}/>
            <p>Visos teises saugomos Sushifresh.lt &copy;{new Date().getFullYear()}</p>
        </div>
    );
};

export default FooterPrivacy;