import React from 'react';
import FeedbackUserForm from '../FeedbackUserForm/FeedbackUserForm';
import classes from "./FeedbacksUser.module.css"

const FeedbacksUser = ({feedbacks, handleChange, values, handleDelete, handleUpdate, submitHandler, answer, resetValues,userCookie}) => {
    const userFeedbacks = feedbacks.map((feedback,index)=>{
        return (<FeedbackUserForm 
                    key={index}
                    feedback={feedback}
                    submitHandler={submitHandler}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                    handleUpdate={handleUpdate}
                    values={values}
                    answer={answer}
                    resetValues={resetValues}
                    userCookie={userCookie}
                />)})
    return (
        <div className={classes.feedbacksContainer}>
            {userFeedbacks}
        </div>
    );
};

export default FeedbacksUser;