import React from "react";
import FeedbackUserForm from "../FeedbackUserForm/FeedbackUserForm";
import classes from "./FeedbacksAdmin.module.css";

const FeedbacksAdmin = ({
  handleChange,
  handleDelete,
  handleUpdate,
  setUpdateValues,
  values,
  resetValues,
  feedbacks,
  userCookie,
  submitHandler,
  errors
}) => {
  const userFeedbacks = feedbacks.map((feedback, index) => {
    return (
      <FeedbackUserForm
        key={index}
        feedback={feedback}
        userCookie={userCookie}
        handleDelete={handleDelete}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        setUpdateValues={setUpdateValues}
        values={values}
        resetValues={resetValues}
        submitHandler={submitHandler}
        errors={errors}
      />
    );
  });
  return <div className={classes.feedbackContainer}>{userFeedbacks}</div>;
};

export default FeedbacksAdmin;
