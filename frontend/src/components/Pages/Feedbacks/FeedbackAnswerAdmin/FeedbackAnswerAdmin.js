import React from "react";
import FeedbackAnswerForm from "../FeedbackAnswerForm/FeedbackAnswerForm";
import { MdClose } from "react-icons/md";
import classes from "./FeedbackAnswerAdmin.module.css";
const FeedbackAnswerAdmin = ({
  feedback,
  handleChange,
  handleUpdate,
  submitHandler,
  handleShowResponse,
  values,
  errors,
}) => {
  return (
    <div className={classes.feedbackContainer}>
      <div className={classes.mdClose} onClick={handleShowResponse}>
        <MdClose />
      </div>
      <FeedbackAnswerForm
        values={values}
        errors={errors}
        feedback={feedback}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default FeedbackAnswerAdmin;
