import React from 'react';
import user from "../../../../images/user.png"
import StarRating from '../../../StarRating/StarRating';
import {TimePast} from "../../../TimePast/TimePast"
import classes from "./FeedbackDisplay.module.css"
const FeedbackDisplay = ({feedback, cName}) => {
    return (
        <div className={`${classes.feedbackContainer} ${cName && classes[cName.cName]}`}>
            <div className={classes.userLogo}>
                <div className={classes.image}>
                    <img src={user} alt="Naudotojas"/>
                </div>
                <div className={classes.userInfo}>
                <p className={classes.userName}>{feedback.userName}</p>
                <p className={classes.time}>prieš {TimePast(feedback.date)}</p>
                </div>
            </div>
            <div className={classes.rating}>
                <StarRating feedback={feedback}/>
                <div className={classes.userTextBlock}>
                    <p>{feedback.userText}</p>
                </div>
            </div>
            {feedback.response &&
            <div className={classes.response}>
                <div className={classes.adminLogo}>
                    <div className={classes.image}>
                        <img src={user} alt="Naudotojas"/>
                    </div>
                    <div className={classes.userInfo}>
                        <p className={classes.userName}>SushiFresh.lt (savininkas)</p>
                        <p className={classes.time}>prieš {TimePast(feedback.adminDate)}</p>
                    </div>
                </div>
                <p className={classes.adminText}>{feedback.adminText}</p>
            </div>
            }
        </div>
    );
};

export default FeedbackDisplay;