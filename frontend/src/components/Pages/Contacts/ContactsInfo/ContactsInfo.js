import React from 'react';
import ShopTime from '../../../ShopTime/ShopTime';
import ShopAddress from "../../../ShopAddress/ShopAddress"
import ShopEmail from "../../../ShopEmail/ShopEmail"
import ShopPhone from "../../../ShopPhone/ShopPhone"
import classes from "./ContactsInfo.module.css"
const ContactsInfo = () => {

    return (
        <div className={classes.contactsContainer}>
            <div className={classes.info}>
                <p className={classes.title}>Adresas</p>
                <ShopAddress className={classes.infoComp}/>
            </div>
            <div className={classes.info}>
                <p className={classes.title}>Elektroninis paštas</p>
                <ShopEmail className={classes.infoComp}/>
            </div>
            <div className={classes.info}>
                <p className={classes.title}>Telefono numeris</p>
                <ShopPhone className={classes.infoComp}/>
            </div>
            <div className={classes.info}>
                <p className={classes.title}>Darbo laikas</p>
                <ShopTime className={classes.infoComp}/>
            </div>
        </div>
    );
};

export default ContactsInfo;