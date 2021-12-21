import React from "react";
import FeedbacksFrom from "../FeedbacksForm/FeedbacksForm";
import classes from "./FeedbackEdit.module.css";
const FeedbackEdit = ({
  values,
  showEdit,
  handleChange,
  submitHandler,
  handleUpdate,
  feedback,
  errors,
}) => {
  return (
    <div className={classes.content}>
      <FeedbacksFrom
        errors={errors}
        feedback={values}
        handleFeedbackChange={handleChange}
        submitHandler={submitHandler}
        handleUpdate={handleUpdate}
        showEdit={showEdit}
        feedbacks={feedback}
      />
    </div>
  );
};

export default FeedbackEdit;
