import React from "react";
import StarRating from "../../../StarRating/StarRating";
import Button from "../../../Buttons/ToggleButton/ToggleButton";
import SectionTitleSecond from "../../../SectionTitleSecond/SectionTitleSecond";
import classes from "./FeedbacksForm.module.css";
import LegendForm from "../../../LegendForm/LegendForm";

const FeedbacksForm = ({
  feedback,
  feedbacks,
  showEdit,
  handleSubmit,
  handleFeedbackChange,
  submitHandler,
  handleUpdate,
  errors,
}) => {
  return (
    <>
      <SectionTitleSecond>Palikite atsiliepimą apie mus</SectionTitleSecond>
      <form className={classes.feedbacksContainer} onSubmit={submitHandler}>
        <LegendForm>
          <legend>Palikite atsiliepimą</legend>
          <div className={classes.formInputs}>
            <p>Kaip vertinate mūsų paslaugas?</p>
            <StarRating
              feedback={feedback}
              handleFeedbackChange={handleFeedbackChange}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>
          <div className={classes.formInputs}>
            <textarea
              name="userText"
              value={feedback.userText}
              placeholder="Čia peiteikite savo atsiliepimą..."
              onChange={handleFeedbackChange}
            ></textarea>
            {errors.userText && <p className="error">{errors.userText}</p>}
          </div>
          {showEdit ? (
            <Button
              id={feedbacks._id}
              action={handleUpdate}
              style={classes.button}
            >
              Išsaugoti
            </Button>
          ) : (
            <Button action={handleSubmit} style={classes.button}>
              Siųsti
            </Button>
          )}
        </LegendForm>
      </form>
    </>
  );
};

export default FeedbacksForm;
