import React from 'react';
import FeedbackAnswerForm from '../FeedbackAnswerForm/FeedbackAnswerForm';
import {MdClose} from "react-icons/md"
import classes from "./FeedbackAnswerAdmin.module.css"
const FeedbackAnswerAdmin = ({feedback, handleChange, handleUpdate, submitHandler, handleShowResponse, answer, values}) => {
    return (
        <div className={classes.feedbackContainer}>
            <div className={classes.mdClose} onClick={handleShowResponse}>
                <MdClose/>
            </div>
            <p className={classes.answer}>{answer.answer}</p>
            <FeedbackAnswerForm
                values={values} 
                feedback={feedback}
                handleChange={handleChange}
                handleUpdate={handleUpdate}
                submitHandler={submitHandler}
            />
        </div>
    );
};

export default FeedbackAnswerAdmin;