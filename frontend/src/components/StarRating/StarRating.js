import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import classes from "./StarRating.module.css";
const StarRating = ({ handleFeedbackChange, feedback }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className={classes.starContainer}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label className={classes.inputs} key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue || feedback.rating}
              checked={feedback.rating}
              onChange={(e) => handleFeedbackChange(e)}
            />
            <FaStar
              className={classes.star}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              color={
                ratingValue <= (hover || feedback.rating)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
