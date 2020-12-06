import React from 'react';
import classes from "./HomeCover.module.css"
import Fade from 'react-reveal/Fade';
import Button from '../../../Button/Button';
import {HashLink} from "react-router-hash-link"
import {IoIosArrowDown} from "react-icons/io"
const HomeCover = () => {
    return (
        <div className={classes.homeCover}>
               <Fade right>
                    <div className={classes.homeCoverText}>
                        <h1>Skaniausi Sušiai sssss</h1>
                        <p>Issirinkite ir mėgaukites</p>
                        <p>Pagaminta pagal geriausius sushi meistrų receptus</p>
                        <Button linkTo="/products" styleLink={classes.linkStyle} cName={{btnColor : "btnBlack"}}>Mūsų meniu</Button>
                    </div>
                </Fade>
                <HashLink smooth to='#meniu'>    
                    <div className={classes.arrowDown}>
                    <IoIosArrowDown/>
                    </div>
                </HashLink>
            
        </div>
    );
};

export default HomeCover;