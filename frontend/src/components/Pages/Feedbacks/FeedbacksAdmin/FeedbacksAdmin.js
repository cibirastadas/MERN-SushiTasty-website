import React from 'react';
import FeedbackUserForm from "../FeedbackUserForm/FeedbackUserForm"
import classes from "./FeedbacksAdmin.module.css"

const FeedbacksAdmin = ({handleChange, handleDelete, handleUpdate, values, answer, resetValues, feedbacks, userCookie, submitHandler}) => {
    const userFeedbacks = feedbacks.map((feedback, index) =>{
        return (<FeedbackUserForm
            key={index}
            feedback={feedback}
            userCookie={userCookie}
            handleDelete={handleDelete}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            values={values}
            answer={answer}
            resetValues={resetValues}
            submitHandler={submitHandler}
        />)
    })
    return (
        <div className={classes.feedbackContainer}>
            {userFeedbacks}
        </div>
    );
};

export default FeedbacksAdmin;