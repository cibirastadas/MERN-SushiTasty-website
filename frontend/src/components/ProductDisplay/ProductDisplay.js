import React, {useState} from 'react';
import classes from "./ProductDisplay.module.css"
import Button from "../Button/Button"
const ProductDisplay = ({data}) => {

    const [show, showSet] = useState(false)

    const checkValues = ()=>{
        if(data.units){
            return(<p>Vienetai: {data.units}</p>)
        }else if(data.amount){
           
            return(<p>Turis: {data.amount}l</p>)
        }
    }

    const onMouseEnter = () =>showSet(true)
    
    const onMouseLeave = () =>showSet(false)
    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classes.productContainer}>
            {data.popular && <p className={classes.mostPopular}>Perkamiausia</p>}
            <div className={classes.imgContainer}>
                <img src={data.image} alt="Food"/>
            </div>
            <p className={classes.title}>{data.title}</p>
                <div className={classes.productText}>
                    {checkValues()}
                    <p className={classes.price}>Kaina: {data.price}€</p>
                    <Button>Į KREPŠELĮ</Button>
                </div>
                <div className={show ? `${classes.descriptionBlock} ${classes.descriptionHeight}`  : classes.descriptionBlock}>
                    <p className={classes.descriptionTitle}>Aprašymas</p>
                    <p className={classes.descriptionText}>{data.description}</p>
                </div>
        </div>
    );
};

export default ProductDisplay;