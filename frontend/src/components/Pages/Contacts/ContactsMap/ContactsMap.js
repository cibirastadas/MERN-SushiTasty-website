import React from 'react';
import SectionTitle from "../../../SectionTitle/SectionTitle"
import classes from "./ContactsMap.module.css"
const ContactsMap = () => {
    return (
        <div className={classes.mapContainer}>
            <SectionTitle style={{styleTitle: "borderNone"}}>Mus galite Rasti</SectionTitle>
            <div className={classes.map}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2307.9621793293195!2d25.225832315888294!3d54.657490980274694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd937d87fc8d5f%3A0xc2062971de7a9117!2sSavanori%C5%B3%20pr.%20157a%2C%20Vilnius%2003150!5e0!3m2!1slt!2slt!4v1604421181719!5m2!1slt!2slt" title="myFrame" width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
        </div>
    );
};

export default ContactsMap;