import React from 'react';
import FooterInfo from './FooterInfo/FooterInfo';
import FooterPrivacy from './FooterPrivacy/FooterPrivacy';
import classes from "./Footer.module.css"
const Footer = () => {

    return (
        <div className={classes.footer}>
            <div className={classes.innerFooter}>
                <FooterInfo/>
            </div>
            <FooterPrivacy/>
        </div>
    );
};

export default Footer;