import React from "react";
import FeedbackUserForm from "../FeedbackUserForm/FeedbackUserForm";
import classes from "./FeedbacksUser.module.css";

const FeedbacksUser = ({
  feedbacks,
  handleChange,
  values,
  handleDelete,
  handleUpdate,
  submitHandler,
  resetValues,
  userCookie,
  setUpdateValues,
  errors,
  isResponseModal,
}) => {
  return (
    <div className={classes.feedbacksContainer}>
      {feedbacks.map((feedback, index) => {
        return (
          <FeedbackUserForm
            key={index}
            errors={errors}
            feedback={feedback}
            submitHandler={submitHandler}
            handleDelete={handleDelete}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            values={values}
            resetValues={resetValues}
            userCookie={userCookie}
            setUpdateValues={setUpdateValues}
            isResponseModal={isResponseModal}
          />
        );
      })}
    </div>
  );
};

export default FeedbacksUser;
